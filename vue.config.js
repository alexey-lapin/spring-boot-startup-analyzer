/* eslint-disable @typescript-eslint/no-var-requires */
const package = require("./package.json");

process.env.VUE_APP_VERSION = package.version;

if (process.env.VUE_APP_ANALYTICS === undefined) {
  process.env.VUE_APP_ANALYTICS = "";
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.devtool = "";
    }
  },
};
