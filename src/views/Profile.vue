<template>
  <div>
    <mobile-ham/>
    <side-panel/>
    <div class="center" >  
      <main>
      
        <div> 
          <profile-card :userId="userId"/>
          <router-link v-if="userId == loginId" to="/profileedit"><button>Edit Profile</button></router-link>  
        </div> 
          <posts :userIds="[userId]" />
      </main>
    </div>  
  </div>
</template>

<script>

// import axios from "axios";
import MobileHam from '../components/MobileHam.vue';
import Posts from '../components/Posts.vue';
import ProfileCard from '../components/ProfileCard.vue';
import SidePanel from '../components/SidePanel.vue';

export default {
  name: "Profile",
  components: {
    MobileHam,
    ProfileCard,
    Posts,
    SidePanel,
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
button {
  padding: 11px 27px;
  font-size: 1.2em;
  font-weight: bold;
  color: white;
  background-color: #f6afaf;
  border-radius: 10px 10px;
  border: 3px solid black;
}

@media screen and (min-width: 600px) {
  main {
    max-width: 700px;
    display: grid;
  }

  .center {
    display: grid;
    place-items: center;
   }
} 
</style>