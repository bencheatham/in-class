
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const compiler = webpack(webpackConfig);

module.exports = function initialize (app) {
  app.use(webpackMiddleware(compiler, {
    quiet: true,
    noInfo: true,
    stats: {
      colors: true,
      reasons: true
    },
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHot(compiler));    
};


