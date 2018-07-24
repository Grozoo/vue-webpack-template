import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      //redirect: "/?tab=all",
      name: "post",
      component: resolve => require(["./routes/Post"], resolve)
    },
    {
      path: "/topic/:id",
      name: "topic",
      component: resolve => require(["./routes/Topic"], resolve)
    },
    {
      path: "/login",
      name: "login",
      component: resolve => require(["./routes/Login"], resolve)
    },
    {
      path: "/message",
      name: "message",
      component: resolve => require(["./routes/Message"], resolve),
      meta: { requireAuth: true }
    },
    {
      path: "/user/:id",
      name: "user",
      component: resolve => require(["./routes/User"], resolve),
      meta: { requireAuth: true }
    },
    {
      path: "/newtopic",
      name: "newtopic",
      component: resolve => require(["./routes/Newtopic"], resolve),
      meta: { requireAuth: true }
    },
    {
      path: "*",
      component: resolve => require(["./routes/Null"], resolve)
    }
  ]
});
