<template>
  <div>
    <page-header/>
    <main>
      <posts  class="border" :userIds="followingUserIds" />
    </main>
  </div>  
</template>

<script>
import PageHeader from '../components/PageHeader.vue';
import Posts from '../components/Posts.vue';
// import axios from "axios";

export default {
  name: "Comments",
  components: {
      PageHeader,
      Posts
  },
  data() {
    PageHeader
    return {
      errorMessage: "",
    };
  },
};
</script>

<style scoped>

@media screen and (min-width: 900px) {
  main {
    background-image: url("../assets/cowEdit.jpg");
    height: 94vh;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
