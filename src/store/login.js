import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const login = new Vuex.Store({
  state: {
    loginname: ""
  },
  getters: {
    getLoginname(state) {
      return state.loginname;
    }
  },
  mutations: {
    setLoginname(state, loginname) {
      state.loginname = loginname;
    }
  }
});
export default login;
