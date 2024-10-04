const path = require('path');
const webpack = require('webpack');

module.exports = {
  // Входная точка вашего приложения
  entry: './src/index.js',

  // Выходной файл после сборки
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  // Добавляем настройки для плагинов
  plugins: [
    new webpack.ProvidePlugin({
      WebSocket: ['global', 'WebSocket'],  // Автоматическое предоставление WebSocket
    }),
    // Другие плагины...
  ],

  // Другие настройки Webpack (загрузчики, devServer, и т.д.)
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
