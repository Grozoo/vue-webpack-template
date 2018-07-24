<template>
  <div id="post">
    <li v-for="topic in topics" :key="topic.id">
      <list :data="topic" listType="post"></list>
    </li>
    <loading v-if="isLoading"></loading>
  </div>
</template>
<script>
import axios from "axios";
import List from "../components/List";
import Loading from "../components/Loading";
export default {
  name: "post",
  data() {
    return {
      isLoading: true,
      topics: [],
      topicsParams: {
        tab: "all",
        page: 1,
        limit: 15,
        mdrender: true
      }
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    document.addEventListener("scroll", this.onScrollHandle);
    this.$route.query.tab && (this.topicsParams.tab = this.$route.query.tab);
    this.getTopics();
  },
  beforeDestroyed() {
    document.removeEventListener("scroll", this.onScrollHandle);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener("scroll", this.onScrollHandle);
    next();
  },

  methods: {
    getTopics() {
      this.$message("加载中");
      this.isLoading = true;
      axios
        .get("https://cnodejs.org/api/v1/topics", {
          params: this.topicsParams
        })
        .then(_ => {
          this.topics = this.topics.concat(_.data.data);
          this.isLoading = false;
        });
    },
    onScrollHandle(event) {
      if (document.body.scrollTop) {
        // safari
        const clientHeight = event.target.body.clientHeight;
        const scrollHeight = event.target.body.scrollHeight;
        const scrollTop = event.target.body.scrollTop;
        if (scrollTop + clientHeight === scrollHeight) {
          this.topicsParams.page += 1;
          this.getTopics();
        }
      } else {
        //true
        const clientHeight = event.target.documentElement.clientHeight;
        const scrollHeight = event.target.documentElement.scrollHeight;
        const scrollTop = event.target.documentElement.scrollTop;
        if (scrollTop + clientHeight === scrollHeight) {
          this.topicsParams.page += 1;
          this.getTopics();
        }
      }
    }
  },
  watch: {
    $route(to) {
      window.scrollTo(0, 0);
      if (to.query.tab) {
        this.topicsParams = {
          ...this.topicsParams,
          tab: to.query.tab,
          page: 1
        };
        this.topics = [];
        this.getTopics();
      }
      if (to.fullPath === "/") {
        this.topicsParams = {
          ...this.topicsParams,
          tab: "all",
          page: 1
        };
        this.topics = [];
        this.getTopics();
      }
    }
  },
  components: {
    List,
    Loading
  }
};
</script>
<style scoped>
</style>
