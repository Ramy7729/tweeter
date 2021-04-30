<template>
  <div>
   <header>
    <h1>Tweeter</h1>
   </header>
    <main>
      <profile-card/>
      <div>
        <textarea name="postContent" id="postContent" cols="30" rows="4" placeholder="Make a post" ></textarea>
      </div>
      <div class="tweetButton">
        <button @click="submitPost">Tweet</button>
      </div>
      <posts/>
    </main>
  </div>
</template>

<script>
import axios from "axios";

import ProfileCard from '../components/ProfileCard.vue'
import Posts from "../components/Posts.vue"
export default {
  name: 'tweeter-main',
  components: {
    Posts,
    ProfileCard,
  },
  data() {
    return {
      errorMessage: "",
    };
  },
  methods: {
    submitPost() {
      if (!document.getElementById("postContent").value) {
        this.errorMessage = "Please enter your message";
        return;
      }
      axios.request({
        url: "https://tweeterest.ml/api/tweets",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          "loginToken": this.$store.state.userInfo.loginToken,
          "content": document.getElementById("postContent").value,
        },
      }).then((res) => {
        console.log(res);

      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    }
  },
 
}
</script>
<style scoped>
.twitterProfile {
  display: grid;
  justify-items: left;
  margin-left: 20px;
  row-gap: 7px;
  
}

.tweetButton {
  display: grid;
  grid-auto-flow: column;
  /* justify-items: left; */
  margin-left: 20px;
  margin-top: 17px;
  place-items: center;
}

.twoColGrid {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  /* place-items: center; */
  column-gap: 30px;
}

textarea {
  border: 1px solid #888;
  /* padding: 5px; */
  width: 100vw;
  margin-top: 11px;
  font-family: 'Times New Roman', Times, serif;
  
}

article {
  display: grid;
  row-gap: 7px;
}

header {
  background-color: #7ECFD4;
}

h2 {
  font-size: 1.3em
}

header {
  padding: 17px
}
</style>
