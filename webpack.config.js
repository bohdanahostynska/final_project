const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer:{
        static:{
            directory: path.join(__dirname, "dist"),       
        },
        compress: true,
        port: 9000,     
        watchFiles: ["./src/**/*"],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
      },
  }