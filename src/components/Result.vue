<template>
  <div id="result">
    <div v-show="predicted">
      <canvas id="canvas" height="384" width="512"></canvas>
      <div>
        <h2>{{ name }}</h2>
        <h2>{{ proba }}</h2>
        <button @click="remove_image">
          <font-awesome-icon :icon="['fas', 'angle-double-left']" size="2x" />
        </button>
      </div>
    </div>
    <Loader :msg="msg" v-if="!predicted" />
  </div>
</template>

<script>
import { label } from "@assets/label.json";
import { readFileSync } from "fs";
import { extname } from "path";

export default {
  name: "Result",
  data() {
    return {
      predicted: false,
      name: "Something is wrong",
      proba: 0,
      msg: "Starting operation"
    };
  },
  props: ["file"],
  methods: {
    remove_image() {
      this.$emit("removeimage");
    },
    async load_image(filepath) {
      let vm = this;
      return new Promise((resolve, reject) => {
        let ext = extname(filepath);
        let data = Buffer.from(readFileSync(filepath)).toString("base64"); //convert image file to base64-encoded string
        let image = new Image(512, 384);
        image.src = `data:image/${ext.split(".").pop()};base64,${data}`;

        image.onload = () => {
          resolve(
            vm.$tf.tidy(() => {
              return vm.$tf.browser.fromPixels(image);
            })
          );
        };
        image.onerror = error => {
          reject(error);
        };
      });
    },
    show_image(tensor) {
      let canvas = document.getElementById("canvas");

      this.$tf.browser.toPixels(tensor, canvas);
    },
    predict(tensor) {
      let vm = this;

      vm.$tf.tidy(() => {
        tensor = tensor.toFloat().div(vm.$tf.scalar(255));

        let unstacked = vm.$tf.unstack(tensor, 2);
        let stacked = vm.$tf.stack(
          [unstacked[2], unstacked[1], unstacked[0]],
          2
        );
        let batched = stacked.expandDims();

        window.pred = vm.$model.predict(batched).arraySync()[0];

        let MAX = vm.$tf.max(pred).arraySync();
        let inx = vm.$tf.argMax(pred).arraySync();

        console.log(MAX, inx);

        vm.name = label[inx];
        vm.proba = `${Math.round(MAX * 100)}%`;
        vm.predicted = true;
      });
    }
  },
  async mounted() {
    this.msg = "Loading Image";
    let tensor = await this.load_image(this.file.path);

    this.msg = "Predicting";
    this.predict(tensor);

    this.msg = "Drawing Image";
    this.show_image(tensor);
  },
  components: {
    Loader: () => {
      return import(/* webpackChunkName: "loader" */ "@components/Loader.vue");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#result {
  height: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  *:not(button) {
    pointer-events: none;
    user-select: none;
  }

  button {
    pointer-events: all;

    display: inline-block;
    width: 240px;
    margin: 10px 5px;
    padding: 8px 40px;
    border: none;
    background-color: #39b77e;

    color: #006537;
    font-size: 25px;
    font-weight: bolder;

    transition: 0.2s all;

    &:hover {
      background-color: #62ce9d;
      color: #ffffff;
    }

    &:active {
      background-color: #006537;
      color: #005037;
    }
  }
}

a {
  color: #42b983;
}
</style>
