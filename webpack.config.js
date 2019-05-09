var path = require('path');
var webpack = require('webpack');

var WebpackMd5Hash = require('webpack-md5-hash');
var webpackMd5HashPlugin = new WebpackMd5Hash();

var HtmlWebpackPlugin = require('html-webpack-plugin');
var indexHtmlWebpackPlugin = new HtmlWebpackPlugin({
  filename: './index.html',
  template: '!!html-loader!./src/template.html',
  hash: false,
  inject: 'body',
  chunks: ["index"]
});

var buildFolder = "dist";
var PRODUCTION = process.env.NODE_ENV === 'production';
var es6Promise = "./node_modules/es6-promise/dist/es6-promise.auto.min.js";

module.exports = {
  mode: 'development',
  entry: {
    index: [es6Promise, "./src/index.ts"]
  },
  output: {
    path: path.resolve(__dirname, buildFolder),
    filename: PRODUCTION ? 'webglobe.min.js' : 'webglobe.js',
    library: 'WebGlobe',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },
  devtool: PRODUCTION ? false : 'source-map',
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx", ".scss", ".png"],
    alias: {
      core: path.resolve(__dirname, "./src"),
      world: path.resolve(__dirname, "./src/world")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
            loader: "ts-loader"
        }
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: {
            loader: "file-loader"
        }
      },
      {
        test: /\.(otf|ttf|eot|woff|woff2).*/,
        use: {
            loader: "file-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
            loader: "html-loader",
            options: {
                attrs: ['img:src']
            }
        }
      }
    ]
  },
  plugins: [
    webpackMd5HashPlugin,
    indexHtmlWebpackPlugin
  ]
};

if (PRODUCTION) {
  module.exports.plugins.push(
    //add DefinePlugin for production to save 88KB for React build
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    })
  );
} else {
  module.exports.devServer = {
    contentBase: './dist',
    publicPath: '',
    hot: true,
    overlay: true,
    open: false
  };
}