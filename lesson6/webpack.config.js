// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    //
    publicPath: "/",
  },
  devServer: {
    open: true,
    host: "localhost",
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        resolve: {
          extensions: [".js", ".jsx"],
        },
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
