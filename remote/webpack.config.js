const path = require("path");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  devtool: false,

  entry: "./src/index.js",

  output: {
    // 指定产物发布的路径，通常用于处理静态资源的引用路径
    publicPath: "http://localhost:3000/",

    // 指定了打包文件的输出路径，必须是一个绝对路径
    path: path.resolve("dist"),

    // 指定异步模块加载的技术方案
    chunkLoading: "jsonp",
  },

  devServer: {
    port: 3000,

    static: path.resolve("./public"),
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
      // 远程的文件名
      filename: "remoteEntry.js",

      // 远程的名称
      name: "remote",

      exposes: {
        //要向外暴露哪些组件
        "./NewsList": "./src/NewsList",
      },

      //指定远程的名称和访问路径
      remotes: {
        host: "host@http://localhost:8800/hostEntry.js",
      },
    }),
  ],
};
