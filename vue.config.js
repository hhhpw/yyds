const path = require("path");
const devServer = require("./src/scripts/devServer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: true,
  devServer: {
    ...devServer(),
  },
  chainWebpack: (config) => {
    // alias
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("@utils", resolve("src/utils"))
      .set("@components", resolve("src/components"))
      .set("@StarUI", resolve("src/StarUI"))
      .set("@api", resolve("src/api"))
      .set("@utils", resolve("src/utils"))
      .set("@views", resolve("src/views"))
      .set("@store", resolve("src/store"))
      .set("@styles", resolve("src/styles"))
      .set("@mixins", resolve("src/mixins"))
      .set("@constants", resolve("src/constants"));

    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    // image
    config.module
      .rule("images")
      .exclude.add(resolve("src/icons"))
      .end()
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: true },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 },
      });
    // webpack-bundle-analyzer
    if (isProduction) {
      // config
      //   .plugin("webpack-bundle-analyzer")
      //   .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
      // lodash
      config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
    }
  },
  configureWebpack: (config) => {
    config.output.filename = `js/[name].[hash].js`;
    config.output.chunkFilename = `js/[name].[hash].js`;
    if (isProduction) {
      return {
        // externals: {
        //   vue: "vue",
        //   "vue-router": "VueRouter",
        //   axios: "axios",
        //   vuex: "vuex",
        // },
        plugins: [
          new CompressionWebpackPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240, // 只有大小大于该值的资源会被处理 10240
            minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          }),
          new UglifyJsPlugin({
            uglifyOptions: {
              //生产环境自动删除console
              compress: {
                drop_debugger: true,
                drop_console: true,
                pure_funcs: ["console.log"], //移除console
              },
            },
            sourceMap: false,
            parallel: true,
          }),
        ],
      };
    }
  },
};
