const path = require('path');
// const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 


module.exports = (env) => {
  
  const isProduction = env === 'production'; 
  const homeCSSExtract = new MiniCssExtractPlugin('css/[home].css');
  const loginCSSExtract = new MiniCssExtractPlugin('css/[login].css');

  return {
    entry: {
      home: path.join(__dirname, '/Resources/js/scripts.js'),
      login: path.join(__dirname, '/Resources/js/login.js')
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
      }, {
        test: /\.(png|gif|svg|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader', 
            options: {
              name: 'img/[name].[ext]', 
            } 
          },
          {
            loader: 'image-webpack-loader', 
            options: {
              gifsicle: { 
                interlanced: false
              },
              optipng: { 
                optimizationLevel: 7
              },
              pngquant: { 
                quality: '65-90',
                speed: 4
              },
              mozjpeg: { 
                progressive: true,
                quality: 65
              }
            }
          }
        ]
      }
      ]
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
      homeCSSExtract,
      loginCSSExtract, 
      new HtmlWebpackPlugin({ 
        filename: 'index.html', 
        minify: { 
          collapseWhitespace: true, 
          removeComments: true
        },
        inject: false,
        template: path.join(__dirname, '/Web/index.html'), 
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
        filename: 'login.html',
        minify: { 
          collapseWhitespace: true, 
          removeComments: true
        },
        inject: false,
        template: path.join(__dirname, '/Web/login.html'), 
      }),
    ]
  };
};
