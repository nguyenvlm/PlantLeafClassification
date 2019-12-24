<template>
  <div
    id="upload"
    @drop.prevent="drop($event)"
    @dragover.prevent
    @dragenter.prevent="dragenter()"
    @dragleave="dragleave"
    dropzone
  >
    <font-awesome-icon
      id="logo"
      :icon="['fas', 'sign-in-alt']"
      size="10x"
      rotation="90"
      v-if="dragover"
    />
    <font-awesome-icon
      id="logo"
      :icon="['fab', 'pagelines']"
      size="10x"
      :style="{ color: '#39b77e' }"
      v-else
    />
    <h1>Plant Leaf Classification Application</h1>
    <p>Drop your leaf here and we will tell you the plant 🏝</p>
    <form style="padding: 5px;">
      <input type="file" accept="image/*" @change="selector_change($event)" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      dragover: false
    };
  },
  methods: {
    drop(event) {
      console.log("File dropped");

      let file = event.dataTransfer.files[0];
      this.handle_file(file);
    },
    dragenter() {
      console.log("File entered drop zone");

      this.dragover = true;
      document.getElementById("upload").classList.add("thính");
    },
    dragleave() {
      console.log("File leaved drop zone");

      this.dragover = false;
      document.getElementById("upload").classList.remove("thính");
    },
    selector_change(event) {
      let file = event.target.files[0];

      this.handle_file(file);
    },
    handle_file(file) {
      this.$emit("imageuploaded", file);
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#upload {
  height: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  transition: 0.3s opacity;

  &.thính {
    opacity: 0.5;
  }

  *:not(input) {
    pointer-events: none;
    user-select: none;
  }

  #logo {
    width: 300px;
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
  }
}

a {
  color: #42b983;
}
</style>
