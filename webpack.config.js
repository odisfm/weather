const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',  
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: false,
    liveReload: true,
    open:
    {
      app:
      {
        name: 'Google Chrome'
      }
    },
    watchFiles: ['src/**/*.html'],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Development',
        filename: 'index.html',
        inject: 'body'
    })
  ],
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(csv|tsv)$/i,
            use: ['csv-loader'],   
        },
        {
            test: /\.xml$/i,
            use: ['xml-loader'],
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
      }
    ],
  },
};