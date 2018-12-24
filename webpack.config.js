const path = require('path');
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 


module.exports = (env) => {
  
  const isProduction = env === 'production'; 
  const chatCSSExtract = new MiniCssExtractPlugin('css/[chat].css');
  const loginCSSExtract = new MiniCssExtractPlugin('css/[login].css');
  const errorCSSEXtract = new MiniCssExtractPlugin('css/[error].css');

  return {
    entry: {
      chat: path.join(__dirname, '/Resources/js/chat.js'),
      login: path.join(__dirname, '/Resources/js/login.js'),
      error: path.join(__dirname, '/Resources/js/error.js')
    }, 
    output: {
      path: path.join(__dirname, '/Resources/dist'), 
      filename: '[name].bundle.js'
    },
    mode: isProduction ? 'production' : 'development', 
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/, 
        exclude: /node_modules/, 
        query: { 
          presets: ['env', 'react'] 
        }
      }, {
        test: /\.s?css$/,
        use: [ 
          MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader', 
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map', 
    devServer: { 
      port: 3000, 
      contentBase: path.join(__dirname, '/Resources/dist'), 
      historyApiFallback: {
        index: 'error.html', 
      },
      open: true, 
    },
    plugins: [
      chatCSSExtract,
      loginCSSExtract, 
      errorCSSEXtract,
      new webpack.ProvidePlugin({ 
        $: 'jquery',
        jQuery: 'jquery'
      }), 
      new HtmlWebpackPlugin({ 
        filename: 'chat.html', 
        minify: { 
          collapseWhitespace: true, 
          removeComments: true
        },
        inject: false,
        template: path.join(__dirname, '/Web/chat.html'), 
      }),
      new HtmlWebpackPlugin({ 
        filename: 'error.html',
        minify: { 
          collapseWhitespace: true, 
          removeComments: true
        },
        inject: false,
        template: path.join(__dirname, '/Web/error.html'), 
      }),
      new HtmlWebpackPlugin({ 
        filename: 'index.html',
        minify: { 
          collapseWhitespace: true, 
          removeComments: true
        },
        inject: false,
        template: path.join(__dirname, '/Web/index.html'), 
      }),
    ]
  };
};
