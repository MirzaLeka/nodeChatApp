const path = require('path');
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 


module.exports = (env) => {
  
  const isProduction = env === 'production'; 
  const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });

  return {
    entry: path.join(__dirname, '/Resources/js/scripts.js'), 
    output: {
      path: path.join(__dirname, '/Resources/dist'), 
      filename: 'bundle.js'
    },
    mode: isProduction ? 'production' : 'development', 
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/, 
        exclude: /node_modules/, 
        query: { 
          presets: ['es2015', 'es2016', 'es2017', 'react', 'env'] 
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
      CSSExtract, 
      new webpack.ProvidePlugin({ 
        $: 'jquery',
        jQuery: 'jquery'
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
      new HtmlWebpackPlugin({ 
        filename: 'error.html',
        minify: { 
          collapseWhitespace: true, 
          removeComments: true
        },
        inject: false,
        template: path.join(__dirname, '/Web/error.html'), 
      }),
    ]
  };
};
