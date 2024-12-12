const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'index.[contenthash].js' : 'index.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'index.css', to: 'index.css' },
        ],
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body',
      }),
    ],
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      hot: true,
      open: true,
      port: 8000,
    },
    mode: isProduction ? 'production' : 'development',
  }

};
