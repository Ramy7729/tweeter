<template>
  <main>
    <page-header/>
    <div>
      <profile-card v-for="user of users" :key="user.userId" :user="user"/>
    </div>
  </main>
</template>

<script>
import axios from "axios";

import PageHeader from '../components/PageHeader.vue';
import ProfileCard from '../components/ProfileCard.vue';

export default {
  name: "Users",
  data() {
    return {
      users: []
    }
  },
  components: {
    PageHeader,
    ProfileCard
  },
  mounted () {
    axios.request({
      url: "https://tweeterest.ml/api/users",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
      },
    }).then((res) => {
      for (const user of res.data) {
        this.users.push(user);
      }
    }).catch((err) => {
      console.log(err);
      this.errorMessage = err;
    });
  },


};
</script>

<style scoped>


</style>