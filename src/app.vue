<template>
  <div id="app">
    <h1>Hello</h1>
    <strong>{{Msg}}</strong>
  </div>
</template>
<script>
console.log("fuck vue");
export default {
  name: "app",
  data() {
    return { Msg: "hello world" };
  }
};
</script>
<style lang="css">
#app {
  color: red;
  transition: color 0.3s;
}
#app:hover {
  color: seagreen;
}
</style>
