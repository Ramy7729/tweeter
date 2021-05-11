<!-- Collaborated with Liz for this project. -->
<template>
  <div>
    <mobile-ham/>
    <side-panel/>
    <div class="center" >  
      <main>
        <div> 
          <profile-card :userId="userId"/>
          <!-- This if statement allows the user to edit their profile. 
             If the user id is that of the current logged in user, an edit profile button will be visible.
          -->
          <router-link v-if="userId == loginId" to="/profileedit"><button>Edit Profile</button></router-link>  
        </div> 
          <!-- This displays posts that were made by the current logged in user. -->
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
    // This returns the user id from the url.
    // The parseInt method is used to convert the id's data type (string) into an integer.
    userId() {
      return parseInt(this.$route.params.id); 
    },
    // This returns the logged in user's id, which is retrieved from the store.
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