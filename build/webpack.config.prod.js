const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const baseConf = require('./webpack.config.base');

module.exports = merge(baseConf, {
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    noEmitOnErrors: true,
    namedChunks: true,
    splitChunks: {
      // name(module) {
      //   return uuid('vendor-chunk');
      // },
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'vendors'
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false
          },
          safari10: true,
        },
        extractComments: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  performance: {
    hints: 'warning'
  }
});
