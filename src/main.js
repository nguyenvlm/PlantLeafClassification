import Vue from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";

const isDevelopment = process.env.NODE_ENV !== "production";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  created() {
    console.log("APP CREATED");
    import(/* webpackChunkName: "tfjs" */ "@tensorflow/tfjs").then(tf => {
      if (isDevelopment) window.tf = tf;
      Object.defineProperty(Vue.prototype, "$tf", { value: window.tf });

      this.$emit("tf-loaded");
    });

    import(/* webpackChunkName: "opencv" */ "@lib/opencv").then(cv => {
      if (isDevelopment) window.cv = cv.default();
      Object.defineProperty(Vue.prototype, "$cv", { value: window.cv });

      this.$emit("cv-loaded");
    });
    import(/* webpackChunkName: "axios" */ "axios").then(axios => {
      Object.defineProperty(Vue.prototype, "$axios", { value: axios });
    });
  }
}).$mount("#app");
