<template>
  <div id="app">
    <div class="container" v-if="tf_ready && cv_ready">
      <Upload v-if="!file" @imageuploaded="set_image" />
      <Result v-else :file="file" @removeimage="remove_image" />
    </div>
    <div class="container" v-else>
      <Loader
        :msg="
          `Loading ${tf_ready ? ' ' : 'TensorflowJS '}${
            !tf_ready && !cv_ready ? '& ' : ' '
          }${cv_ready ? '' : 'OpenCV.js'}`
        "
      />
    </div>
    <div id="footer">
      Designed by
      <a id="author" href="mail://congtam.luong0406@gmail.com">Tam Luong</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      file: null,
      tf_ready: false,
      cv_ready: false,
      app_ready: false
    };
  },
  components: {
    Upload: () => {
      return import(/* webpackChunkName: "upload" */ "@components/Upload.vue");
    },
    Result: () => {
      return import(/* webpackChunkName: "result" */ "@components/Result.vue");
    },
    Loader: () => {
      return import(/* webpackChunkName: "loader" */ "@components/Loader.vue");
    }
  },
  methods: {
    set_image(file) {
      this.$set(this, "file", file);
      console.log("Loading Image");
    },
    remove_image() {
      this.$set(this, "file", null);
      console.log("Removing Image");
    }
  },
  beforeCreate() {
    this.$root.$once("tf-loaded", () => {
      console.log("TF_LOADED");
      this.tf_ready = true;
    });
    this.$root.$once("cv-loaded", () => {
      console.log("CV_LOADED");
      this.cv_ready = true;
    });
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0fff9;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .container {
    text-align: center;
    flex-grow: 1;
    overflow-y: scroll;
  }

  #footer {
    background-color: #39b77e;
    padding: 7px;
    text-align: center;
    font-size: 13px;
    color: #ffffff;

    #author {
      font-weight: bolder;
      color: #006537;
    }
  }
}
</style>
