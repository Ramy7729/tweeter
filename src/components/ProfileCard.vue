<template>
  <div  > 
    <div class="banner" ></div> 
    <div class="twitterProfile" >
      <div class="threeColGrid">
        <img :src="user.imageUrl" alt="">
        <div>
        <router-link :to="{name: 'Profile', params: { id: user.userId }}"><h2>{{ user.username }}</h2></router-link>
          <p>{{ user.bio }}</p>
          <p>{{ errorMessage }}</p>
        </div>
        <button @click="follow" >Follow</button>
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
      this.user = res.data[0];
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
