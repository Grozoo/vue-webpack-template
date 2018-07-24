import Vue from "vue";

export default {
  install() {
    let timer = null;
    Vue.prototype.$message = msg => {
      let old = document.getElementById("message-info");
      if (old) {
        old.parentElement.removeChild(old);
      }
      let div = document.createElement("div");
      div.id = "message-info";
      div.textContent = msg;
      document.body.appendChild(div);
      clearTimeout(timer);
      timer = setTimeout(() => {
        div.parentElement.removeChild(div);
      }, 2000);
    };
  }
};
