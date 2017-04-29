const defaultConfig =  require("./config/defaultConfig.js");
//get default configuration
const deltConfig =  require("./config/mergeCustomConfig.js");
const _ = require('lodash');
import dora from 'dora';
import path from "path";
import fs from "fs";
import mkdirp from 'mkdirp';
import getConfig from "./utils/getConfig";
import nunjucks from 'nunjucks';
/**
 * [getRoutesPath](Our routes.js have to know where our components lay, so it must receive themePath)
 * @param  {[type]} themePath [Where to put theme file , just as react component]
 * @return {[type]}           [description]
 */
function getRoutesPath(themePath) {
  const routesPath = path.join(__dirname, '..', 'tmp', 'routes.js');
  fs.writeFileSync(
    routesPath,
    nunjucks.renderString(fs.readFileSync(path.join(__dirname, 'routes.nunjucks.js')).toString(), { themePath })
  );
  return routesPath;
}
/**
 * [generateEntryFile Entry file has to know where our routes.js lays. In one word ,entry konw routes and routes know theme]
 * @param  {[type]} configTheme     [theme: './site/theme',]
 * @param  {[type]} configEntryName [description]
 * @param  {[type]} root            [description]
 * @return {[type]}                 [description]
 */
function generateEntryFile(configTheme, configEntryName, root) {
  const entryPath = path.join(__dirname, '..', 'tmp', 'entry.' + configEntryName + '.js');
  const routesPath = getRoutesPath(path.join(process.cwd(), configTheme).split(path.sep).join("/")).split(path.sep).join("/");
  fs.writeFileSync(
    entryPath,
    nunjucks.renderString(fs.readFileSync(path.join(__dirname, 'entry.nunjucks.js')).toString(), { routesPath, root })
  );
}

export default function build(program){ 
 //Step 1:Generate main html file by mdw config file
 const combinedMdwConfig  = getConfig(path.join(process.cwd(),program.configFile));
 mkdirp(combinedMdwConfig.output);
 const template = fs.readFileSync(combinedMdwConfig.htmlTemplate).toString();
 const templatePath = path.join(process.cwd(), combinedMdwConfig.output, 'index.html');
  fs.writeFileSync(templatePath, nunjucks.renderString(template, { root: '/' }));
 //Now, this part are replaced by html-webpack-plugin!

//Step 2: Generate entry js file by mdw config file
  generateEntryFile(combinedMdwConfig.theme, combinedMdwConfig.entryName, '/');
  const cwd = program.cwd;
  const mdwConfigFile =  program.configFile;
 /* (1)receive custom webpack config, in order to manipulate our webpack config you must learn
   * how to write dora plugin to fullfill it! 
   * (2)if you want to define a user config, this config file must export an function because 
   *    dora-plugin-webpack will use it!
 */
 const webpackFile = program.webpackFile;
 const htmlTemplate = program.htmlTemplate;
 //得到自己的webpack配置文件内容
 const doraConfig = Object.assign({}, {
    cwd: path.join(process.cwd(), combinedMdwConfig.output),
    //dora server's cwd is from output folder
    port:combinedMdwConfig.port,
  }, combinedMdwConfig.doraConfig);
 //add some plugins to dora server
  doraConfig.plugins = [
      /*
        *'middleware.before'
        *(1)get webpack.config.js from cwd or you can use config to override it! You own config file
        *   need to export as a function , our webpack config will input 
        *(2)second object will be used as parameter to this plugin as query
        *(3)use 'webpack.updateConfig' or 'webpack.updateConfig.finally' hook function to manipulate webpack configuration
        *   our default update config function will invoke between them , and default update function is from wcf
       
        *'middleware'
        *(1)use webpack function to bundle our files 
        *(2)inject 'koa-webpack-dev-middleware, that is because our middleware stage must return a middleware
        *
        * 'server-after':
        *(1)watch package.json and entry file for changing
        * 
       */
     [require.resolve('./plugins/dora-plugin-webpack'), {
      disableNpmInstall: true,
      config : webpackFile,
      htmlTemplate :htmlTemplate,
      cwd : cwd //must be correctly set
      //config:configFile, using this config to update default webpack config!
      // which can either export a function or object
    }],
    [path.join(__dirname, './plugins/dora-plugin-markdown'), {
	      config: `${mdwConfigFile}`
	      // We must provide a configFile while dora-plugin-webpack is from wcf tool!
	      // This file is user defined mdw config file. But you can use hook to 
	      // update webpack config at the same time
	   }],
    require('../lib/plugins/dora-plugin-browser-history')
    //This plugin is based on connect-history-api-fallback and dora server hook which used to 
    //Serve index.html while a invalid url is typed directly, we redirect it to index.html
  ];
  //const usersDoraPlugin = combinedMdwConfig.doraConfig.plugins || [];
  //user defined plugin in config file
  //doraConfig.plugins = doraConfig.plugins.concat(usersDoraPlugin);
  //all plugins
  //doraConfig.plugins.push(require.resolve('dora-plugin-livereload'));
  dora(doraConfig);
}

