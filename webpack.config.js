const path = require('path');

module.exports = {
  entry: path.resolve('app', 'index.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'app'),
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        include: path.resolve('app'),
        loaders: ['style-loader', 'css-loader?modules']
      }
    ]
  }
};
