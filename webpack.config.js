const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(jpg|png|svg|ico)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.[hash].js',
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new webpack.EnvironmentPlugin([]),
  ],
};
