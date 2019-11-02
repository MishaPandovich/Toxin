const webpack = require('webpack')
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [ 
      new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  module: {
    rules: [
/*      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },*/
      { 
        test: /\.js$/i, exclude: /node_modules/, loader: "babel-loader" 
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          {
            loader: 'postcss-loader',
            options: { config: { path: './src/js/postcss.config.js' } }
          }, 
          'sass-loader'
        ]
      },
      {
        test: /\.pug$/i,
        loaders: [
          {
            loader: "html-loader"
          },
          {
            loader: "pug-html-loader",
            options: {
              "pretty":true
            }
          }
        ]
      }, 
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      /*{
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            }
          }
        ]
      },*/
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader?name=/fonts/[name].[ext]'
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      filename: "index.html",
      template: './src/page/index.pug'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
}