const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

const isprod = process.env.NODE_ENV === "production";
const minify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
};
const extract = isprod;

const config = {
  context: path.resolve(__dirname, "../"),
  mode: isprod ? "production" : "development",
  devtool: isprod ? false : "cheap-module-source-map",

  entry: {
    app: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "js/[name].[chunkhash:8].js",
    chunkFilename: "js/[name].[chunkhash:8].chunk.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".vue"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
        /* options: {
          loaders: {
            css: [
              MiniCssExtractPlugin.loader,
              "vue-style-loader",
              "style-loader",
              "css-loader"
               "postcss-loader"
            ]
          }
        } */
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          isprod
            ? { loader: MiniCssExtractPlugin.loader }
            : { loader: "vue-style-loader" },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/img/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].[contenthash:8].css"
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      template: "index.html",
      minify: isprod ? minify : {}
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    })
  ]
};
if (!isprod) {
  config.devServer = {
    open: true,
    contentBase: path.resolve(__dirname, "dist"),
    host: "localhost",
    port: 1215,
    clientLogLevel: "warning",
    compress: true,
    quiet: true
  };

  /* config.proxyTable = {
		//https://github.com/chimurai/http-proxy-middleware
	}; */
} else {
  config.optimization = {
    //runtimeChunk: { name: "manifest" },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: isprod ? false : "cheap-module-source-map",
        uglifyOptions: {
          warnings: false
        }
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: isprod
          ? false
          : "cheap-module-source-map"
            ? { safe: true, map: { inline: false } }
            : { safe: true }
      })
    ],
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: "styles",
          test: /\.(scss|css)$/,
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  };
}
module.exports = config;
