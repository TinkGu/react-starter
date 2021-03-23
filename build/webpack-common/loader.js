const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const { NODE_ENV = 'development' } = process.env;
const __isDEV = NODE_ENV === 'development';

module.exports = {
  js: {
    test: /\.(tsx|ts|js)$/,
    exclude: [/^node_modules/],
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        plugins: [
          __isDEV && require.resolve('react-refresh/babel')
        ].filter(Boolean)
      }
    },
    include: [
      path.resolve('src'),
    ]
  },
  css: {
    test: /\.(css|scss|sass)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV === 'development',
          // if hmr does not work, this is a forceful method.
          reloadAll: true
        }
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 1,
          modules: {
            getLocalIdent: (context, _, localName) => {
              if (
                context.resourcePath.includes('node_modules') ||
                context.resourcePath.includes('global.less') ||
                context.resourcePath.includes('antd-theme.less') ||
                context.resourcePath.includes('global.scss')
              ) {
                return localName;
              }
            },
            localIdentName: '[local]_[hash:base64:4]'
          }
        }
      },
      'postcss-loader',
      'sass-loader'
    ]
  },
  image: {
    test: /\.(eot|svg|ttf|woff|woff2|svga|png|jpg|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 5120,
          name: 'images/[name]-[hash:base64:5].[ext]?[hash:base64:4]'
        }
      }
    ]
  }
};
