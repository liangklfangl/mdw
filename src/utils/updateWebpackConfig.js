import fs from "fs";
import path from "path";
const loaders = path.join(process.cwd(),"./lib/loaders");
import getConfig from "./getConfig";
import resolvePlugins from "./resolvePlugins";
import webpack from "webpack";
/**
 * [exports Function for update webpack configuration, our configFile must provide an entry]
 * @param  {[type]}  webpackConfig [Default webpack config getting by wcf tool]
 * @para
 * m  {[type]}  configFile    [User defined mdw config file which update webpack config using 'webpack.updateConfig' hook]
 * @param  {Boolean} isBuild       [description]
 * @return {[type]}                [description]
 */
module.exports = function updateWebpackConfig(webpackConfig, configFile) {
  webpackConfig.entry={};
  //In our mdw config file , we can not configure entry which must be relevant with react router!
  configFile = path.resolve(process.cwd(),configFile);
  if(!fs.existsSync(configFile)){
    throw new Error('User defined file not exist!');
  }
  //Firstly: inject a loader to deal with md files which make use of 'webpack.updateConfig' hook
  webpackConfig.module.rules.push({
    test: /\.md$/, 
    loaders: ['babel-loader',path.join(loaders,'markdown-data-loader?config='+configFile)]
  });
  //inject a loader for special file
  webpackConfig.module.rules.push({
    test(filename) {
      return filename === path.join(__dirname,"..", 'utils', 'data.js') ||
        filename === path.join(__dirname,"..", 'utils', 'ssr-data.js');
    },
    loader: `${path.join(__dirname,"..", "loaders",'dora-data-loader')}` +
      `?config=${configFile}`,
  });
 //Secondly:Using plugins `config` module to further update webpack config
const config = getConfig(configFile);
const pluginsConfig = resolvePlugins(config.plugins, 'config');
 //We get absolute path of plugin by path.join(process.cwd(), plugin)
 pluginsConfig.forEach((pluginConfig) => {
    require(pluginConfig[0])(pluginConfig[1]).webpackConfig(webpackConfig, webpack);
  });
 //Thirdly: Invoking webpackConfig funtion in mdw config file to further update webpack config
 let finalUpdatedWebpackConfig = config.webpackConfig(webpackConfig,webpack);
 //Fourthly: Setting entry part of webpack config file
const entryPath = path.join(path.join(__dirname,".."), '..', 'tmp', 'entry.' + config.entryName + '.js');
//entryName is also setted in our mdw config file
  if (finalUpdatedWebpackConfig.entry[config.entryName]) {
    throw new Error('Should not set `webpackConfig.entry.' + config.entryName + '`!');
  }
  finalUpdatedWebpackConfig.entry[config.entryName] = entryPath;
   return finalUpdatedWebpackConfig;
};
