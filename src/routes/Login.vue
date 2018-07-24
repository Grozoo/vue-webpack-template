<template>
  <div id="login-page">
    <input type="text" placeholder="在此填入你的Access Token" v-model="token" maxlength="36" required />
    <button @click="login" type="button">登陆</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      token: ""
    };
  },
  mounted() {
    this.$message("请登录！");
  },
  methods: {
    login() {
      if (this.token === "" || this.token.length < 36) {
        this.$message("请检查你的token");
        return false;
      }
      axios
        .post("https://cnodejs.org/api/v1/accesstoken", {
          accesstoken: this.token
        })
        .then(res => {
          if (res.data.success) {
            localStorage.token = this.token;
            localStorage.loginname = res.data.loginname;
            this.$store.commit("setLoginname", res.data.loginname);
            this.$message("登陆成功~");
            let redirect = this.$route.query.redirect || "/";
            this.$router.push({
              path: redirect
            });
          }
        })
        .catch(() => {
          this.$message("请检查你的token是否正确");
        });
    }
  }
};
</script>
<style scoped>
#login-page {
  width: 50%;
  height: 50%;
  overflow: auto;
  margin: auto;
}
#login-page input,
button {
  display: block;
  margin: 2em auto;
}
#login-page input[type="text"] {
  width: 80%;
  text-align: center;
}
</style>
