const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConf = require('./webpack.config.base.js');

module.exports = merge(baseConf, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  output: {
    filename: '[name].js',
    pathinfo: true,
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  performance: {
    hints: false
  },
  devServer: {
    stats: {
      all: false,
      assets: true,
      cachedAssets: true,
      errors: true,
      errorDetails: true,
      hash: true,
      performance: true,
      publicPath: true,
      timings: true,
    },
    contentBase: path.join(__dirname, '../dist'),
    publicPath: `/`,
    port: 8000,
    index: 'index.html',
    historyApiFallback: {
      index: `/index.html`
    },
    host: 'localhost',
    hot: true,
    open: true,
    proxy: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      },
    }
  }
});
