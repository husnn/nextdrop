const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'main.ts'),
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, '../../../dist'),
    filename: 'electron.js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'babel-loader'
      }
    ]
  }
}