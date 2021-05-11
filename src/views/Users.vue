<!-- Collaborated with Liz for this project. -->
<template>
  <div>
    <mobile-ham/>
    <side-panel/>
    <div class="center"> 
      <main> 
        <div>
          <div>
            <!-- This for loop displays the profile for the user that is logged in -->
            <profile-card v-for="user of users" :key="user.userId" :user="user" class="border" />
          </div>
        </div>   
      </main>
    </div>  
  </div> 
</template>

<script>
import axios from "axios";

import MobileHam from '../components/MobileHam.vue';
import ProfileCard from '../components/ProfileCard.vue';
import SidePanel from '../components/SidePanel.vue';

export default {
  name: "Users",
  data() {
    return {
      users: []
    }
  },
  components: {
    MobileHam,
    ProfileCard,
    SidePanel,
  },
  // A mounted hook is used to make our API requests.
  
  mounted () {
    // Configuring the request to get all user data.
    // This requires us to not send any data to the api.
    axios.request({
      url: "https://tweeterest.ml/api/users",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
      },
   // On success another request is made that gets data for all users we are following.
   }).then((res) => {
      let allUsers = res.data;
      axios.request({
        url: "https://tweeterest.ml/api/follows",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        // Sending data to the api (userId).
        params: {
          userId: this.$store.state.userInfo.userId,
        }
      }).then((res) => {
        let followedUsers = res.data;
        // Used a for of loop to determine if we are following any users.
        for (const user of allUsers) {
          //  The property isFollowed determines if we are following a user or not.
          user.isFollowed = false;
          for (const followedUser of followedUsers) {
            if (user.userId == followedUser.userId) {
              user.isFollowed = true;
            }
          }
          // Using the push method to add a user to the list of users.
          this.users.push(user);
        }
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    }).catch((err) => {
      console.log(err);
      this.errorMessage = err;
    });
  },
};
</script>

<style scoped>
.border {
    border: 1px solid grey;
  }
.center {
  margin-top: 30px;
  
}

@media screen and (min-width: 900px) {
  main {
    max-width: 700px;
    display: grid;
  }

  .center {
    display: grid;
    place-items: center;
    margin-top: 0;
  }
} 
  
</style>