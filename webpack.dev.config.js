const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');

// Load Module with Angular's Development configuration aka intercept urls and
// point to Express port
config.entry = {
  app: [
    path.join(__dirname, 'client/app/config.dev.js')
  ]
};
config.output = {
  filename: '[name].bundle.js',
  publicPath: '/',
  path: path.resolve(__dirname, 'client')
};

config.plugins = config.plugins.concat([

  // Adds webpack HMR support. It act's like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
