<!-- Collaborated with Liz for this project. -->
<template>
  <div>
    <div v-if="user">
      <!-- This allows the use of a banner image.
        If a banner url isn't provided a default banner image will be provided for the user.
       -->
      <img id="banner" v-if="user.bannerUrl" :src="user.bannerUrl">
      <img id="banner" v-else src="../assets/defaultBanner.jpg" alt="A cow eating grass">
    </div>
    <div v-if="user" class="twitterProfile" >
      <div class="threeColGrid">
         <!-- This allows the use of an image for the users profile.
          If an image url isn't provided a default profile image will be provided for the user.
         -->
        <img  class="profileImg" v-if="user.imageUrl" :src="user.imageUrl">
        <img  class="profileImg" v-else src="../assets/cow.jpg" alt="Cows at the beach laying on the sand and in the water.">
        <div>
          <!-- This takes in a parameter of the current users id, which is displayed in the url.
            The current logged in users information is displayed (username and bio).
           -->
          <router-link :to="{name: 'Profile', params: { id: user.userId }}"><h2>{{ user.username }}</h2></router-link>
            <p>{{ user.bio }}</p>
            <p>{{ errorMessage }}</p>
        </div>
        <div v-if="loggedInUser.userId == user.userId"></div>
        <!-- This gives the user the ability to follow a user -->
        <button v-else-if="!user.isFollowed" @click="follow" class="followColor">Follow</button>
        <!-- This gives the user the ability to unfollow a user -->
        <button v-else @click="unfollow" class="unfollowColor">Unfollow</button>
      </div>
    </div>
  </div>  
</template>

<script>
import axios from "axios";

export default {
  name: "profile-card",
  props: {
    userId: {
      type: Number,
    },
    user: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      errorMessage: '',
    }
  },
  computed: {
    // This returns the logged in user.
    loggedInUser() {
      return this.$store.state.userInfo; 
    }
  },
  // When mounted this grabs the users information.
  mounted () {
    if (this.user) {
      return;
    }
    // Configuring the request to get the users data.
    axios.request({
      url: "https://tweeterest.ml/api/users",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
      },
      params: {
        userId: this.userId,
      },
    }).then((res) => {
      let user = res.data[0];
      // Configuring the request to verify if we are following a user.
      axios.request({
        url: "https://tweeterest.ml/api/follows",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        params: {
          userId: this.$store.state.userInfo.userId,
        },
      }).then((res) => {
        // The property, isFollowed is used to verify if we have followed the user.
        user.isFollowed = false;
        console.log(res.data);
        for (const followedUser of res.data) {
          if (followedUser.userId == user.userId) {
            user.isFollowed = true;
          }
        }
        this.user = user;
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    }).catch((err) => {
      console.log(err);
      this.errorMessage = err;
    });
  },
  methods: {
     // Configuring the request to enable the user to follow a user.
    follow() {
      axios.request({
        url: "https://tweeterest.ml/api/follows",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          loginToken: this.$store.state.userInfo.loginToken,
          followId: this.user.userId,
        },
      }).then((res) => {
        console.log(res);
        // On success isFollowed is set to true
        this.user.isFollowed = true;
      }).catch((err) => {
        this.errorMessage = err;
      });
    },
     // Configuring the request to enable the user to unfollow a user.
    unfollow() {
      axios.request({
        url: "https://tweeterest.ml/api/follows",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          loginToken: this.$store.state.userInfo.loginToken,
          followId: this.user.userId,
        },
      }).then((res) => {
        console.log(res);
        // On success this sets isFollowed to false.
        this.user.isFollowed = false;
      }).catch((err) => {
        this.errorMessage = err;
      });
    }
  },
};
</script>

<style scoped>
#banner {
  width: 100%;
  height: 30vh;
}
.threeColGrid {
  display: grid;
  place-items: center;
  row-gap: 7px;
  margin-top: 11px;
  margin-bottom: 11px;
  
}
.profileImg {
    height: 97px;
    width: 97px;
    border-radius: 50%;
    position: relative;
    bottom: 55px;
    
}
h2 {
  font-size: 1.3em;
  color: #0e6b0e;
  margin-bottom: 5px;
}
.followColor {
  background-color: #f6afaf;
  color: white;
  border-radius: 20px 20px;
}
.unfollowColor {
  background-color: white;
  color: black;
  border: 2px solid #f6afaf;
  border-radius: 20px 20px;
}
a {
  text-decoration: none;
}
button {
  padding: 7px 37px;
}
@media screen and (min-width: 900px) {
  .threeColGrid {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr; 
  place-items: center;
  padding: 17px;
  column-gap: 10px;
  }
  .profileImg {
    height: 97px;
    width: 97px;
    border-radius: 50%;
    position: relative;
    bottom: 100px;
  }
}
</style>
