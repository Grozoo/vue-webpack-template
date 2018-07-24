<template>
  <div id="topic">
    <loading v-if="isLoading"></loading>
    <article class="topic markdown-body">
      <h2 class="topic-title" v-text="topic.title"></h2>
      <ul class="topic-meta">
        <!--  <router-link :to="{name:'user',params:{id:topic.author_id}}">
        {{topic.author.loginname}}
      </router-link> -->
        <li v-text="topic.create_at" />
        <li>浏览量：{{topic.visit_count}}</li>
        <li>分类：{{topic.tab}}</li>
        <li class="tag">
          <span v-show="topic.good">good</span>
          <span v-show="topic.top">top</span>
        </li>
      </ul>
      <section v-html="topic.content" class="topic-content" />

    </article>
    <h2 class="repliy-title">已有{{topic.reply_count}}条评论</h2>
    <section v-for="reply in topic.replies" :key="reply.id">
      <list :data="reply" listType='reply'></list>
    </section>
    <div id="comment">
      <h2 class="repliy-title">回复主题</h2>
      <textarea v-model="newReply" />
      <br/>
      <button type="button" @click="reply">回复</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "github-markdown-css";
import List from "../components/List";
import Loading from "../components/Loading";

export default {
  name: "topic",
  data() {
    return {
      isLoading: true,
      topicId: "",
      topic: {},
      newReply: ""
    };
  },
  mounted() {
    this.isLoading = true;
    window.scrollTo(0, 0);
    this.topicId = this.$route.params.id;
    axios
      .get(`https://cnodejs.org/api/v1/topic/${this.topicId}`)
      .then(res => {
        this.topic = res.data.data;
        console.log(this.topic);
        this.isLoading = false;
      })
      .catch(error => this.$message("出错了"));
  },
  methods: {
    reply() {
      if (this.newReply === "") {
        this.$message("写点什么吧");
        return false;
      }
      axios
        .post(`https://cnodejs.org/api/v1/topic/${this.topicId}/replies`, {
          accesstoken: localStorage.token,
          content: this.newReply
        })
        .then(res => {
          if (res.data.success) {
            this.$message("回复成功");
            window.location.reload();
          }
        })
        .catch(() => {
          this.$message("出错了");
        });
    }
  },
  components: {
    Loading,
    List
  }
};
</script>
<style scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
.topic-meta {
  text-align: right;
}
.topic-meta > li {
  display: inline-block;
  font-size: smaller;
  color: #8796a3;
  margin: 0 0.5em;
}
.repliy-title {
  padding-bottom: 0.3em;
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
}
#comment {
  padding-top: 2em;
  text-align: center;
  margin-bottom: 1em;
}
#comment > textarea {
  overflow: auto;
  height: 10em;
  width: 80%;
  resize: none;
  margin-top: 1em;
}
</style>
