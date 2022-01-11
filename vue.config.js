const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://89.108.123.60/",
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
  chainWebpack: (config) => {
    config.entry("bs").add("./src/bs.scss").end();
    config.entry("main").add("./src/main.scss").end();
  },
  css: {
    extract: {
      filename: "[name].css",
    },
    modules: false,
    sourceMap: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
};
