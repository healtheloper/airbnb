/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

dotenv.config();

const mode = process.env.NODE_ENV || 'development';
const { KAKAO_MAP_KEY } = process.env;

const PORT = 3000;

module.exports = {
  mode,
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@mocks': path.resolve(__dirname, 'src/mocks'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
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
      env: process.env,
    }),
    new webpack.EnvironmentPlugin({
      KAKAO_MAP_KEY,
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
