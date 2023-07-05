const path = require("path");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  devtool: false,

  entry: "./src/index.js",

  devServer: {
    port: 8800,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new ModuleFederationPlugin({
      //远程的文件名
      filename: "hostEntry.js",

      //远程的名称
      name: "host",

      exposes: {
        // 要向外暴露哪些组件
        "./Sliders": "./src/Sliders",
      },

      remotes: {
        remote: "remote@http://localhost:3000/remoteEntry.js",
      },
    }),
  ],
};
