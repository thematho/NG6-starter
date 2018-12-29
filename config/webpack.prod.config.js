var webpack = require('webpack');
var path = require('path');
var config = require('../webpack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
