var webpack = require('webpack');
var path = require('path');
var config = require('../webpack.config');

config.mode = 'development';
// Load Module with Angular's Production configuration aka no debug info
const angularDevModule = path.join(__dirname, '../client/app/config.dev.js');
config.entry = {
  app: config.entry.app.concat([angularDevModule])
};
config.output = {
  filename: '[name].bundle.js',
  path: path.resolve(__dirname, '..', 'client')
};

config.devServer = {
  port: 3000,
  contentBase: [
    '../client',
    path.join('../client/translate', '/translate')
  ],
  hot: true,
  stats: { colors: true },
  inline: true,
  historyApiFallback: true
};

config.plugins = config.plugins.concat([

  // Adds webpack HMR support. It act's like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
