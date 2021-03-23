/* eslint-disable import/no-dynamic-require */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const alias = require('./webpack-common/alias');
const loaders = require('./webpack-common/loader');

const BUILD_PUBLIC_PATH = '/';
const { BUILD_OUTPUT_DIR = path.resolve('dist'), NODE_ENV = 'development', BUILD_TYPE } = process.env;
const __isDEV = NODE_ENV === 'development';
const dllMap = require(`${BUILD_OUTPUT_DIR}/lib/dll-manifest.json`);

module.exports = {
  target: 'web',
  entry: {
    app: './src/app.tsx'
  },
  output: {
    filename: '[name].[contenthash].js',
    hashDigestLength: 8,
    path: BUILD_OUTPUT_DIR,
    publicPath: BUILD_PUBLIC_PATH,
    library: 'reactApp',
    libraryTarget: 'window'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.less', '.css'], // 可以省略的后缀名
    modules: [path.resolve('src'), path.resolve('common'), path.resolve('node_modules')],
    alias
  },
  module: {
    rules: [loaders.js, loaders.css, loaders.image]
  },
  plugins: [
    __isDEV && new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.BUILD_TYPE': JSON.stringify(BUILD_TYPE),
    }),
    new webpack.DllReferencePlugin({
      name: 'lib_dll',
      manifest: dllMap
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`!${BUILD_OUTPUT_DIR}/lib`]
    }),
    // css 处理
    new MiniCssExtractPlugin({
      filename: __isDEV ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: __isDEV ? '[id].css' : '[id].[contenthash].css',
      ignoreOrder: true, // 我们已经使用 css_modules 了，不会引起 css 命名覆盖的问题
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      templateParameters: {
        dll: `${BUILD_PUBLIC_PATH}lib/${dllMap.name}.js`
      }
    })
  ].filter(Boolean)
};
