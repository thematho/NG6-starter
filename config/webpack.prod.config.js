const webpack = require('webpack');
const path = require('path');
const config = require('../webpack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Load Module with Angular's Production configuration aka no debug info
const angularProdModule = path.join(__dirname, '../client/app/config.prod.js');
config.entry = {
  app: config.entry.app.concat([angularProdModule])
};

config.mode = 'production';
config.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: path.resolve(__dirname, '..', 'dist')
};

config.optimization = {
  minimizer: [new UglifyJsPlugin({
    cache: true,
    parallel: true,
    uglifyOptions: {
      compress: false,
      ecma: 6,
      mangle: true
    },
    sourceMap: true
  })]
};

module.exports = config;
