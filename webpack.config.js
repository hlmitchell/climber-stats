const path = require('path');

module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build/'),
    publicPath: 'build'
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   loaders: ['style-loader', 'css-loader', 'sass-loader']
      // }
    ]
  },
  node: {
    fs: "empty",
    net: 'empty'
  },

  // Configure the webpack-dev-server
  devServer: {
    // proxy is required in order to make api calls to express server while using hot-reload webpack server
    // routes api fetch requests from localhost:8080/* to localhost:3000/*
    proxy: {
      '/**': {
        target: 'http://localhost:3000/',
        secure: false,
      }
    },
  },
};