const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@components": path.resolve(__dirname, "src/components"),
        "@lib": path.resolve(__dirname, "src/lib")
      }
    }
  },

  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: "./icon.ico"
        },
        linux: {
          icon: "./icon.ico"
        }
      }
    }
  },

  publicPath: ""
};
