module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.devtool = "";
    }
  },
};
