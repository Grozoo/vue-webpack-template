<template>
  <section class="list">
    <router-link :to="{name:'user',params:{id:data.author.loginname}}">
      <img :src="data.author.avatar_url" :alt="data.author.loginname">
    </router-link>
    <div class="content">
      <router-link v-if="listType!=='reply'" :to="{name:'topic',params:{id:data.id}}">
        <h2>{{data.title}}</h2>
      </router-link>
      <div class="meta">
        <span>{{data.author.loginname}}</span>
        <span v-if="data.create_at">发表时间：{{`${new Date(data.create_at).getFullYear()}-${new Date(data.create_at).getMonth()+1}`}}</span>
        <span v-if="listType!=='reply'">最后回复：{{data.last_reply_at}}</span>
      </div>
      <div v-if="listType=='reply'" class="markdown-body" v-html="data.content">
      </div>
      <div class="tag" v-if="listType=='post'">
        <span v-if="data.good">good</span>
        <span v-if="data.top">top</span>
      </div>
      <div class="view" v-if="listType=='post'">
        <span>{{data.reply_count||0}} </span>
        <span>/{{data.visit_count||0}}</span>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "list",
  props: {
    listType: String,
    data: Object
  }
};
</script>
<style scoped>
.list {
  position: relative;
  border-bottom: 2px solid #42b98361;
  padding: 0.2em 0;
}
.list img {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 1em;
}

.list .content {
  display: inline-block;
  width: 80%;
  overflow: hidden;
}
h2 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  font-size: 100%;
}
.view,
.tag {
  position: absolute;
  right: 0;
}
.view {
  bottom: 0;
}
.view > span:nth-child(1) {
  color: #42b983;
}

.content > .meta {
  color: #8796a3;
  font-size: small;
}
.meta > span {
  margin: 0 1em 0 0;
}
.tag {
  top: 2px;
  /* background-color: #42b983; */
  border-radius: 50%;
  margin: 0 !important;
}
</style>

