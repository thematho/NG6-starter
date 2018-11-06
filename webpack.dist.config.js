const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');

// Load Module with Angular's Production configuration aka no debug info
config.entry = {
  app: [
    path.join(__dirname, 'client/app/app.production.js')
  ]
};

config.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: path.resolve(__dirname, 'dist')
};

config.plugins = config.plugins.concat([
  // Prevents the inclusion of duplicate code into the bundle
  new webpack.optimize.DedupePlugin(),
  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    mangle: {

      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  })
]);

module.exports = config;
