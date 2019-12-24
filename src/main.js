import Vue from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSignInAlt,
  faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSignInAlt, faAngleDoubleLeft, faPagelines);

Vue.component("font-awesome-icon", FontAwesomeIcon);

const isDevelopment = process.env.NODE_ENV !== "production";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  created() {
    console.log("APP CREATED");
    import_dependencies(this);
  }
}).$mount("#app");

function import_dependencies(vm) {
  import(/* webpackChunkName: "tfjs" */ "@tensorflow/tfjs").then(tf => {
    if (isDevelopment) window.tf = tf;

    load_model("web_model/model.json", model => {
      if (isDevelopment) window.model = model;

      Object.defineProperty(Vue.prototype, "$model", { value: model });
      vm.$emit("tf-loaded");
    });

    Object.defineProperty(Vue.prototype, "$tf", { value: tf });

    async function load_model(url, callback) {
      let model = await tf.loadLayersModel(url);
      callback(model);
    }
  });

  import(/* webpackChunkName: "opencv" */ "@lib/opencv").then(cv => {
    cv = cv.default();
    if (isDevelopment) window.cv = cv;
    Object.defineProperty(Vue.prototype, "$cv", { value: cv });

    vm.$emit("cv-loaded");
  });
}
