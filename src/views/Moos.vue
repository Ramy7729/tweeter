<template>
  <div>
    <page-header/>
    <main>
      <div class="twoCol">
        <img v-if="post.userImageUrl" :src="post.userImageUrl" alt="">
        <img  v-else src="../assets/cow.jpg" alt="">
        <div>
          <p class="boldName" >{{ post.username }}</p>
          <p>{{ post.content }}</p>
        </div>   
      </div>
        <textarea name="comment" id="comment" cols="30" rows="4"></textarea>
        <!-- <select name="postOptions" id="postOptions">
          <option value=""></option>
          <option value="delete">Delete</option>
          <option value="edit">Edit</option>
        </select> -->

      <div class="tweetButtons" >
        <button @click="reply" >Reply</button>
        <p>Retweet</p>
        <p>Like</p>
      </div>

      <div class="commentsContainer">
        <div v-for="comment of comments" :key="comment.commentId">
          <p>{{ comment.username }}</p>
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </main>
  </div>  
</template>

<script>
import PageHeader from '../components/PageHeader.vue';

import axios from "axios";

export default {
  name: "Comments",
  components: {
      PageHeader,
     
  },
  data() {
    return {
      post: {},
      errorMessage: "",
      comments: [],
    };
  },
  methods: {
    reply() {
      axios.request({
        url: "https://tweeterest.ml/api/comments",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          loginToken: this.$store.state.userInfo.loginToken,
          tweetId: parseInt(this.$route.params.mooId),
          content: document.getElementById("comment").value
        },
      }).then((res) => {
        document.getElementById("comment").value = '';
        this.comments.push(res.data);
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    }
  },
  
  mounted () {
    axios.request({
      url: "https://tweeterest.ml/api/tweets",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
      },
      params: {
        userId: parseInt(this.$route.params.userId),
      },
    }).then((res) => {
      for (const moo of res.data) {
        if (moo.tweetId == this.$route.params.mooId) {
          this.post = moo;
          return;
        }
      }
    }).catch((err) => {
      console.log(err);
      this.errorMessage = err;
    });
  
    axios.request({
      url: "https://tweeterest.ml/api/comments",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
      },
      params: {
        tweetId: parseInt(this.$route.params.mooId),
      },
    }).then((res) => {
      console.log(res.data);
      this.comments = res.data;
    }).catch((err) => {
      console.log(err);
      this.errorMessage = err;
    });
  },
};
</script>

<style scoped>
img {
  height: 97px;
  border-radius: 50%;
}
.commentsContainer {
  display: grid;
  text-align: left;
  grid-template-columns: 1fr;
  margin-left: 20px;
  word-wrap: break-word;
  width: 100%;
}

.twoCol {
  display: grid;
  grid-template-columns: 1fr 2fr ;
}

@media screen and (min-width: 900px) {
  main {
    background-image: url("../assets/cowEdit.jpg");
    height: 94vh;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
