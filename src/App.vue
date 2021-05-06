<template>
  <div id="app">
    <router-view/>
    <side-panel/>
  </div>
</template>

<script>
import cookies from "vue-cookies";

import SidePanel from './components/SidePanel.vue';


export default {
  components: {
    SidePanel,
  },
  created () {
    let userInfo = cookies.get('userInfo');
    if (userInfo) {
      this.$store.commit('loginUser', userInfo);
    }
    
  },

};
</script>

<style>

* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
} */

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
