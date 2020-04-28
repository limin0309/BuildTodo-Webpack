// bug 处理参考链接：https://stackoverflow.com/questions/41705888/passing-the-node-env-value-using-webpack-via-defineplugin/41706069

const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const DEVELOPMENT = process.env.NODE_ENV === "development";
const PRODUCTION = process.env.NODE_ENV === "production";
const ExtractPlugin = require("extract-text-webpack-plugin"); // 将非javascript打包成单独的静态资源文件

const config = {
  mode: "none",
  target: "web",
  entry: path.join(__dirname, "src/index.js"), //  形成绝对路径
  output: {
    filename: "bundle.[hash:8]js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
      },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      // },

      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name]-aaa.[ext]", // 输出的文件名字
            },
          },
        ],
      },
    ],
  },
  //   plugins: [
  //     // 请确保引入这个插件！

  //   ],

  // process.env.NODE_ENV=development
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env.PRODUCTION": JSON.stringify(PRODUCTION),
      "proccess.env.DEVELOPMENT": JSON.stringify(DEVELOPMENT),
    }),
    new HtmlWebpackPlugin(),
  ],
};

if (DEVELOPMENT) {
  webkitConvertPointFromPageToNode.module.rules.push({
    test: /\.styl/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
        },
      },
      "stylus-loader",
    ],
  });
  config.devtool = "#cheap-module-eval-source-map";
  config.devServer = {
    port: "8000",
    host: "0.0.0.0",
    overlay: {
      // 编译时候有任何错误都显示在网页中
      errors: true,
    },
    // open:true  // 每次都打开一个新的浏览器
    // historyFallback:{ // 把webpack dev server不理解的地址，没有映射的地址，都映射到入口index.html上

    // }
    hot: true, // 热更新。每次改变组件更新该组件的页面
  };

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // 启动webpack  HotModuleReplacementPlugin功能的plugin
    new webpack.NoEmitOnErrorsPlugin() // 能帮我们减少不必要的信息展示
  );
} else {
  config.entry={
    app:path.join(__dirname,'src/index.js'),
    vendor:['vue']
  }
  config.output.filename='[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl/,
    use: ExtractPlugin.extract({
      fallback: "style-loader",
      use: [
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
          },
        },
        "stylus-loader",
      ],
    }),
  });
}

config.plugins.push(
  new ExtractPlugin('styles.[contentHash:8].css'),
  new webpack.optimize.CommonsChunkPlugin({
    name:'vendor'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name:'runtime'
  }),
)
module.exports = config;
