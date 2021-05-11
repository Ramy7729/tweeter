// Collaborated with Liz for this project.
import Vue from 'vue';
import Vuex from 'vuex';
import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
  
  },
  mutations: {
    // This logs in the user which gets saved to the store and sets a cookie.
    loginUser: function (state, newUserInfo) {
      state.userInfo = newUserInfo;
      cookies.set("userInfo", newUserInfo);
    },
    // This logs out a user and removes their cookie.
    logoutUser: function (state) {
      state.userInfo = null;
      cookies.remove("userInfo");
    }
  },
  actions: {
  },
  modules: {
  }
});
