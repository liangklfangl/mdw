import mergeCustomConfig from 'webpackcc/lib/mergeWebpackConfig';
//Second parameter of mergeCustomConfig function is an filePath which will export a function whose
//first paramter will receive webpackConfig! 
// import getWebpackCommonConfig from 'webpackcc/lib/getWebpackDefaultConfig';
//getWebpackCommonConfig function will get default webpack configuration
import build from 'webpackcc/lib/build';
import webpackWatch from "webpackcc/lib/webpackWatch";
import webpack from "webpack";
import { join, resolve } from 'path';
import chalk from 'chalk';
import chokidar from 'chokidar';
import NpmInstallPlugin from 'npm-install-webpack-plugin-cn';
import isEqual from 'lodash.isequal';
import { readFileSync, existsSync } from 'fs';
const util = require('util');
let webpackConfig;
export default {
  name: 'dora-plugin-webpack',

  'middleware.before'() {
    const { applyPlugins, query } = this;
    //Get querys you configured in using it!
    let { cwd } = this;
    if (query.cwd) {
      cwd = query.cwd;
    }
    const htmlTemplate = query.htmlTemplate;
    // console.log("hellp--",htmlTemplate);
    const customConfigPath = resolve(cwd, query.config || 'webpack.config.js');
    //webpack.config.js in cwd can either export a function or object
    // if (existsSync(customConfigPath)) {
    //   const customConfig = require(customConfigPath);
    //   // Support native webpack
    //   // If you provide a native webpack configuration, then we will not update config
    //   // unnative configuration is surrounded by function
    //   if (typeof customConfig === 'object') {
    //     webpackConfig = customConfig;
    //     return;
    //   }
    // }
    // webpackConfig = getWebpackCommonConfig({ ...this, cwd },true);
    const buildParams = {
      config : customConfigPath,
      onlyCf : true,
      cwd : cwd,
      dev : false
      //启动压缩
      // 不能传入htmlTemplate，而必须通过mdw本身来设置，因为htmlTemplate是为了我们的webpack-dev-server而设置的~~~
    };
    webpackConfig = build(buildParams);
    //If a function exported, we will use getWebpackCommonConfig and mergeCustomConfig to update
    //webpack config
    webpackConfig.devtool = '#cheap-module-source-map';
    if (!query.disableNpmInstall) {
      webpackConfig.plugins.push(new NpmInstallPlugin({
        save: true,
      }));
    }
    webpackConfig = applyPlugins('webpack.updateConfig', webpackConfig);
    // webpackConfig = mergeCustomConfig(webpackConfig, customConfigPath);
    webpackConfig = applyPlugins('webpack.updateConfig.finally', webpackConfig);

    if (query.publicPath) {
      webpackConfig.output.publicPath = query.publicPath;
    }
    if (!query.publicPath && webpackConfig.output.publicPath) {
      query.publicPath = webpackConfig.output.publicPath;
    }
  
  },

// ERROR in index.js from UglifyJs
// SyntaxError: Unexpected token punc «,», expected punc «:» [./~/winpath/index.js:17,0][index.js:154787,15]

  'middleware'() {
    const { verbose, physcisFileSystem } = this.query;
    // const compiler = webpack(webpackConfig);
    const compiler = webpackWatch(webpackConfig,{watch:true});
    this.set('compiler', compiler);
    // console.log("打包前webpack配置为:",util.inspect(compiler,{depth:5,showHidden:true}));
    compiler.plugin('done', function doneHandler(stats) {

      if (verbose || stats.hasErrors()) {
          // console.log("打包webpack的stats:",util.inspect(stats,{depth:5,showHidden:true}));

        console.log(stats.toString({colors: true}));
      }
    });
    if (physcisFileSystem) {
      const outputFileSystem = compiler.outputFileSystem;
      setTimeout(() => {
        compiler.outputFileSystem = outputFileSystem;
      }, 0);
    }
    //还是在内存中的这些资源
    return require('koa-webpack-dev-middleware')(compiler, {
      publicPath: '/',
      quiet: true,
      ...this.query,
    });
  },

  'server.after'() {
    const { query } = this;
    let { cwd } = this;
    if (query.cwd) {
      cwd = query.cwd;
    }
    const pkgPath = join(cwd, 'package.json');

    function getEntry() {
      try {
        return JSON.parse(readFileSync(pkgPath, 'utf-8')).entry;
      } catch (e) {
        return null;
      }
    }

    const entry = getEntry();
    chokidar.watch(pkgPath).on('change', () => {
      if (!isEqual(getEntry(), entry)) {
        this.restart();
      }
    });

    const webpackConfigPath = resolve(cwd, query.config || 'webpack.config.js');
    chokidar.watch(webpackConfigPath).on('change', () => {
      this.restart();
    });
  },
};