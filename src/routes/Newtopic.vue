<template>
  <div id="newtopic">
    <input type="text" v-model="title" placeholder="标题 十字以上" />
    <div id="select-auto">
      <div id="select" @click="toggleshow">{{select||'请选择分类'}}</div>
      <div id="selectList" v-if="tabshow">
        <ul v-for="(tab,index) in tabs" :key="tab.tab">
          <li @click="setValue(tab.tab,index)">{{tab.name}}</li>
        </ul>
      </div>
    </div>
    <textarea v-model="content" placeholder="*支持 Markdown 语法" />
    <button type="button" @click="poi">提 交</button>
  </div>
</template>

<script>
import axios from "axios";
import marked from "marked";
export default {
  name: "newtopic",
  data() {
    return {
      title: "",
      select: "",
      content: "",
      tabs: [
        { tab: "all", name: "全部" },
        { tab: "good", name: "精华" },
        { tab: "share", name: "分享" },
        { tab: "ask", name: "问答" },
        { tab: "job", name: "招聘" },
        { tab: "dev", name: "测试" }
      ],
      tabshow: false
    };
  },
  methods: {
    toggleshow() {
      this.tabshow = !this.tabshow;
    },
    setValue(tab, index) {
      this.select = this.tabs[index].tab;
      this.tabshow = !this.tabshow;
    },
    poi() {
      if (this.title.length < 10 || !this.content) {
        this.$message("内容不当");
        return false;
      }
      axios
        .post("https://cnodejs.org/api/v1/topics/", {
          accesstoken: localStorage.token,
          title: this.title,
          tab: this.select,
          content: marked(this.content)
        })
        .then(_ => {
          if (_.success) {
            this.$route.push({
              name: "topic",
              params: { id: _.topic_id }
            });
          }
        });
    }
  }
};
</script>
<style scoped>
#newtopic {
  padding-top: 100px;
  margin: 0 100px;
}
#select-auto {
  position: relative;
  padding: 10px 0;
}
#select {
  cursor: pointer;
  border: 2px solid #42b983;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  color: #555;
  width: 270px;
}
textarea {
  width: 100%;
  height: 300px;
}
#selectList {
  position: absolute;
  width: 100%;
  z-index: 999;
  background: white;
}
#selectList,
textarea {
  border: 2px solid #42b983;
}
#selectList li:hover {
  background-color: #42b983;
}
input[type="text"] {
  width: 270px;
}
</style>
