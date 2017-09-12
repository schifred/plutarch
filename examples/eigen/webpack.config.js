const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 分离css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');// 压缩css

const env = process.env.NODE_ENV;
const cwd = process.cwd();

const config = {
  entry: cwd,
  output: {
    path: cwd,
    filename: "index.js"
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-1'],
            plugins: ['transform-runtime']
          }
        }
      },{
        test: /\.less$/,
        use: env === 'production' ? ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "less-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
      }) : [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },{
        test: /\.jpg|\.png$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: /node_modules/,
        use: ['file-loader']
      },
    ]
  },
  resolve:{
    //enforceModuleExtension: true,
    extensions: [".js",".less",".png",".jpg"],
    alias: {
      css: `${__dirname}/src/css`,
      image: `${__dirname}/src/image`,
      components: `${__dirname}/src/script/components`,
      i18n: `${__dirname}/src/script/i18n`,
      models: `${__dirname}/src/script/models`,
      routes: `${__dirname}/src/script/routes`,
      router: `${__dirname}/src/script/router`
    }
  },
  //devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    //colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
  } 
}

if (env === 'production') {
  config.plugins = [
    new ExtractTextPlugin("index.css"),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ]
}

module.exports = config;
