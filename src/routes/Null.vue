<template>
  <article id="about">
    <h1>关于本项目</h1>
    <p>
      使用
      <a href="https://cnodejs.org/api">CNode-API</a>，基于 Vue、Vue-Router、Vuex 编写的 WEBAPP，请求使用 Axios。
    </p>
    <a href="https://github.com/shiyiya/Vue-CNode/issues" target="_blank">
      <h3>Found Bug & Tell me</h3>
    </a>
    <h1>你来到了未知的国度 --- 404-NOT-FOund</h1>
  </article>
</template>

<script>
export default {
  name: "null"
};
</script>
    
<style>
#about {
  line-height: 4;
  text-align: center;
  padding-top: 4em;
}
#about h3 {
  color: red;
  border: 2px red inset;
  width: 50%;
  margin: 0 auto;
}
#about a {
  border-bottom: 2px solid black;
}
</style>
