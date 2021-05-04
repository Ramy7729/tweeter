<template>
  <div>
    <page-header/>
    <main>
      <profile-card :userId="userId"/>
      <router-link v-if="userId == loginId" to="/profileedit"><button>Edit Profile</button></router-link>  
      <posts :userIds="[userId]" />
    </main>
  </div>
</template>

<script>

// import axios from "axios";
import PageHeader from '../components/PageHeader.vue';
import Posts from '../components/Posts.vue';
import ProfileCard from '../components/ProfileCard.vue';

export default {
  name: "Profile",
  components: {
    PageHeader,
    ProfileCard,
    Posts,
  },
  computed: {
    userId() {
      return parseInt(this.$route.params.id); 
    },
    loginId() {
      return this.$store.state.userInfo.userId;
    }
  },
  
};
</script>

<style scoped>
.twitterProfile {
  display: grid;
  justify-items: left;
  margin-left: 20px;
  row-gap: 7px;
}
.twoColGrid {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  /* place-items: center; */
  column-gap: 30px;
  padding: 17px;
}
img {
    width: 90px;
}
input {
  padding: 12px 7px 7px;
}
</style>