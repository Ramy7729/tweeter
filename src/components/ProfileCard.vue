<template>
  <div  > 
    <div class="banner" ></div> 
    <div class="twitterProfile" >
      <div class="threeColGrid">
        <img v-if="user.imageUrl" :src="user.imageUrl" alt="">
        <img v-else src="../assets/cow.jpg" alt="">
        <div>
        <router-link :to="{name: 'Profile', params: { id: user.userId }}"><h2>{{ user.username }}</h2></router-link>
          <p>{{ user.bio }}</p>
          <p>{{ errorMessage }}</p>
        </div>
        <div v-if="loggedInUser.userId == user.userId"></div>
        <button v-else-if="!user.isFollowed" @click="follow">Follow</button>
        <button v-else @click="unfollow">Unfollow</button>
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
      errorMessage: ''
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.state.userInfo; 
    }
  },
  mounted () {
    if (this.user) {
      return;
    }

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
        this.user.isFollowed = true;
      }).catch((err) => {
        this.errorMessage = err;
      });
    },
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
        this.user.isFollowed = false;
      }).catch((err) => {
        this.errorMessage = err;
      });
    }
  },
};
</script>

<style scoped>
/* .banner {
  background-image: url("../assets/cow111.jpg");
  background-size: cover;
  background-repeat: none;
  height: 20vh;
} */

.twitterProfile {
  display: grid;
  justify-items: left;
  row-gap: 7px;
  place-items: center;
 
}
.threeColGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; 
  /* place-items: center; */
  column-gap: 30px;
  padding: 17px;
}
img {
    width: 97px;
    border-radius: 50%;
}
</style>
