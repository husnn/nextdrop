const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'index.tsx'),
  target: 'electron-renderer',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      "@core": path.resolve(__dirname, '../../core/'),
      "@infrastructure": path.resolve(__dirname, '../../infrastructure/'),
      "@platforms": path.resolve(__dirname, '../../platforms/')
    }
  },
  output: {
    path: path.resolve(__dirname, '../../../dist'),
    filename: 'react.js'
  },
  devServer: { port: 3000, hot: true },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'NextDrop',
      template: path.resolve(__dirname, 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|s[ac]ss$)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        loader: 'file-loader'
      }
    ]
  }
}