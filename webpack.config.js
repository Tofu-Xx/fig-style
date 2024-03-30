const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin"); //打包html
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //打包css 提取到单独的css文件中
// const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); //压缩css

module.exports = {
  /* 入口 */
  entry: path.resolve(__dirname, "src/fig.js"),
  /* 出口 */
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./fig.min.js",
    clean: true,
  },
};
