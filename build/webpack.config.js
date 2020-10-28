"use strict";

var path = require('path');

var autoprefixer = require('autoprefixer');

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var MODE = process.env.WEBPACK_ENV;
var ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js');
var OUTPUT_DIR = path.join(__dirname, 'static');
var config = {
  entry: ['@babel/polyfill', ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [{
      test: /\.(js)$/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.(scss)$/,
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader'
      }, {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [[autoprefixer, {
              overrideBrowser: 'cover 99.5%'
            }]]
          }
        }
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js'
  },
  plugins: [new MiniCssExtractPlugin({
    filename: '[name].css'
  })]
};
module.exports = config;