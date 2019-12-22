<template>
  <div id="loader">
    <div id="spinner"></div>
    <span id="msg">{{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: "App",
  props: ["msg"]
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#loader {
  height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0fff9;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  #spinner {
    border: 16px solid #cbd8ce; /* Light grey */
    border-top: 16px solid #39b77e; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin-bottom: 20px;
  }

  #msg {
    color: #39b77e;
    font-size: 30px;
    font-weight: bolder;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
