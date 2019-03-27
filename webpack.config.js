const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const Visualizer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env, { mode = "production" }) => {
  const isProd = mode === "production";
  const { local: isLocal = !isProd, visualize = false } = env || {};
  console.info(`[ webpack mode: ${mode} ]`);

  return {
    context: path.join(__dirname, "./"),
    entry: {
      app: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: isLocal ? "./" : "/",
      filename: "[name].bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(png|ico|jpe?g|gif)$/i,
          use: [
            "file-loader?name=assets/images/[name].[ext]",
            "image-webpack-loader",
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                outputStyle: isProd ? "compressed" : "expanded",
                sourceComments: !isProd,
                sourceMap: !isProd,
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/i,
          loader: "file-loader?name=assets/fonts/[name].[ext]",
        },
      ],
    },
    devtool: "source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      historyApiFallback: true,
      port: 9000,
      open: true,
    },
    plugins: [
      new CleanWebpackPlugin(["public"], { verbose: true }),
      new CompressionPlugin(),
      new HtmlWebpackPlugin({
        inject: "body",
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "assets/styles/[name].css",
        chunkFilename: "[id].css",
      }),
      visualize && new Visualizer(),
    ].filter(Boolean),
  };
};
