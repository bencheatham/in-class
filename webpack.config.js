
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: [
    'bootstrap-loader',
    'tether',
    path.resolve(ROOT_PATH, 'client/main.jsx'),
    'webpack-hot-middleware/client'
  ],
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loaders: ['eslint'],
      include: path.resolve(ROOT_PATH, 'client')
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    },
    {
      test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/,
      loader: 'imports?jQuery=jquery'
    },
    { 
      // test: /\.(jpe?g|png|gif|svg)$/i,
      // loaders: [
      //     'url-loader?limit=8192'
      // ]
      // test: /\.(jpe?g|png|gif|svg)$/i,
      // loaders: [
      //   'file?hash=sha512&digest=hex&name=[hash].[ext]',
      //   'image-webpack'
      // ]
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
          'url?limit=8192',
          'imgages'
      ]


       }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [autoprefixer],
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'window.Tether':'tether',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'/client/index.html')
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
};
