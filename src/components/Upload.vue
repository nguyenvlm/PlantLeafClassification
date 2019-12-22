<template>
  <div
    id="upload"
    @drop.prevent="drop($event)"
    @dragover.prevent
    @dragenter.prevent="dragenter()"
    @dragleave="dragleave"
    dropzone
  >
    <img id="logo" alt="Leaf" src="@assets/logo.png" />
    <h1>Plant Leaf Classification Application</h1>
    <p>Drop your leaf here and we will tell you the plant 🏝</p>
    <form>
      <input type="file" accept="image/*" @change="selector_change($event)" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Upload",
  methods: {
    drop(event) {
      console.log("File dropped");

      let file = event.dataTransfer.files[0];
      this.handle_file(file);
    },
    dragenter() {
      console.log("File entered drop zone");
    },
    dragleave() {
      console.log("File leaved drop zone");
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

  *:not(input) {
    pointer-events: none;
    user-select: none;
  }

  img {
    width: 300px;
  }

  p {
    font-size: 20px;
  }
}

a {
  color: #42b983;
}
</style>
