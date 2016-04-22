var app = require('./server/configuration.js');

var port = process.env.PORT || 8000;

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHot = require('webpack-hot-middleware');
var compiler = webpack(webpackConfig);

if(module.parent) {
  module.exports = app; // so we can require in tests
} else{
  app.listen(port);
  console.log('Server now listening on port ' + port);
}

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
