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
        appId: "com.planleafclassification.app",
        win: {
          icon: "./src/assets/icon.png"
        },
        linux: {
          icon: "./src/assets/icon.png"
        }
      },
      customFileProtocol: "./"
    }
  },

  pwa: {
    name: "Plant Leaf Classification",
    msTileColor: "#39b77e",
    manifestOptions: {
      display: "standalone",
      background_color: "#f0fff9"
    },
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      navigateFallback: "index.html"
    }
  },

  productionSourceMap: false
};
