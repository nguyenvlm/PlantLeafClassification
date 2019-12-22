<template>
  <div id="result">
    <canvas id="canvas"></canvas>
    <div>
      <button @click="remove_image">Back</button>
      <button>Infomation</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Result",
  props: ["image"],
  methods: {
    remove_image() {
      this.$emit("removeimage");
    },
    draw_image_url(url) {
      let vm = this;
      let img = document.createElement("img");

      img.onload = () => {
        vm.$cv.imshow("canvas", cv.imread(img));
      };
      img.src = url;
    },
    draw_image_mat(mat) {
      this.$cv.imshow("canvas", mat);
    },
    gray_scale(url) {
      let vm = this;
      let img = document.createElement("img");

      img.onload = () => {
        let raw = cv.imread(img);
        let dst = new vm.$cv.Mat();
        vm.$cv.cvtColor(raw, dst, vm.$cv.COLOR_RGB2GRAY);
        vm.$cv.imshow("canvas", dst);
      };
      img.src = url;
    }
  },
  created() {
    let vm = this;
    let reader = new FileReader();
    reader.onloadend = () => {
      // vm.draw_image(reader.result);
      vm.gray_scale(reader.result);
    };
    reader.readAsDataURL(vm.image);
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

  #canvas {
    max-width: calc(100vw - 15%);
    max-height: calc(100vw - 60%);
  }

  button {
    pointer-events: all;

    display: inline-block;
    width: 240px;
    margin: 10px 5px;
    padding: 15px 50px;
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
