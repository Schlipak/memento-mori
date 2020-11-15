/* eslint-disable no-undef */

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.min.js',
    chunkFilename: 'chunks/[id]-[chunkhash].chunk.js',
    publicPath: '/memento-mori',
  },

  devtool: 'source-map',

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'assets/fonts/'), to: 'assets/fonts/' },
        { from: path.resolve(__dirname, 'assets/img/'), to: 'assets/img/' },
        { from: path.resolve(__dirname, 'index.html') },
        { from: path.resolve(__dirname, 'README.md') },
        { from: path.resolve(__dirname, 'favicon.png') },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: [/core-js/],
      },
      {
        test: /\.(frag|vert|glsl)$/,
        use: [
          {
            loader: 'glsl-shader-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(png|jpg|mp3)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath: '/memento-mori',
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
};
