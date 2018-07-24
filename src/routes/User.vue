<template>
  <div id="user">
    <section class="user-info">
      <img :src="user.avatar_url" />
      <p v-text="user.loginname">loginname</p>
      <p class="user-meta">注册时间：{{user.create_at}} 积分：{{user.score}}</p>
    </section>
    <section id="user-trends">
      <ul class="user-tab">
        <li :class="{currentTab:currentTab==1}" @click="toogleTab(1)">最新回复</li>
        <li :class="{currentTab:currentTab==2}" @click="toogleTab(2)">最新发布</li>
      </ul>
      <div :class="{currentContent:currentTab==1}" class="trends">
        <article v-for="reply in user.recent_replies" :key="reply.id">
          <list :data="reply"></list>
        </article>
        <h2 v-if="user.recent_replies.length==0">暂无数据</h2>
      </div>
      <div :class="{currentContent:currentTab==2} " class="trends">
        <article v-for="reply in user.recent_topics" :key="reply.id">
          <list :data="reply"></list>
        </article>
        <h2 v-if="user.recent_topics.length==0">暂无数据</h2>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import List from "../components/List";
export default {
  name: "user",
  data() {
    return {
      user: {},
      currentTab: 1,
      currentContent: ""
    };
  },
  mounted() {
    document.documentElement.scrollTo(0, 0);
    this.getUserInfo();
  },
  methods: {
    toogleTab(_) {
      this.currentTab = _;
    },
    getUserInfo() {
      axios
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.id}`)
        .then(_ => {
          this.user = _.data.data;
        });
    }
  },
  watch: {
    $route() {
      this.getUserInfo();
    }
  },
  components: {
    List
  }
};
</script>
<style scoped>
.user-info,
.user-tab {
  text-align: center;
}
.user-info {
  background-color: #42b9838c;
  padding: 1em 0;
}
.user-info > img {
  width: 90px;
  height: 90px;
  border-radius: 45px;
}
.user-meta {
  font-size: smaller;
  color: #8796a3;
}
.user-tab li {
  display: inline-block;
  padding: 0.5em;
  width: 50%;
  border-bottom: 2px solid #42b983ab;
  transition: background-color 0.2s ease;
}
.user-tab li:nth-of-type(1) {
  border-right: 2px solid #42b983;
}
.user-tab li:hover {
  background-color: #42b983ab;
}
.trends {
  display: none;
}
.currentContent {
  display: block;
}
.currentTab {
  background-color: #42b983ab;
}
</style>
