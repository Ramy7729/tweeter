import Vue from 'vue';
import Vuex from 'vuex';
import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
  
  },
  mutations: {
    loginUser: function (state, newUserInfo) {
      state.userInfo = newUserInfo;
      cookies.set("userInfo", newUserInfo);
    }
  },
  actions: {
  },
  modules: {
  }
});
