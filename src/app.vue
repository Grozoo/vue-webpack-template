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
}
</style>
