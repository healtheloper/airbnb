const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const PORT = 3000;

module.exports = {
  mode,
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  stats: 'errors-only',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    host: 'localhost',
    port: PORT,
    open: true,
    client: {
      overlay: true,
    },
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
};
