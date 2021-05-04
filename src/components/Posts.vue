<template>
  <div class="postsContainer">
    <article v-for="post of posts" :key="post.tweetId">
      <div class="twoCol">
        <img src="../assets/doggo.jpg" alt="">
        <div>
          <p class="boldName" >{{ post.username }}</p>
          <p>{{ post.content }}</p>
        </div>   
        <!-- <select name="postOptions" id="postOptions">
          <option value=""></option>
          <option value="delete">Delete</option>
          <option value="edit">Edit</option>
        </select> -->
      </div>
      <div class="tweetButtons" >
        <p>Reply</p>
        <p>Retweet</p>
        <p>Like</p>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Posts",
  props: {
    userIds: {
      type: Array,
    },
  },
  data() {
    return {
      posts: [],
      errorMessage: "",
    }
  },
  mounted () {
    this.getPosts(this.userIds);
  },
  methods: {
    getPosts(userIds) {
      for (const userId of userIds) {    
        axios.request({
          url: "https://tweeterest.ml/api/tweets",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: userId,
          },
        }).then((res) => {
          this.posts = this.posts.concat(res.data);
          this.posts = this.posts.sort((first, second) => {
            return first.createdAt > second.createdAt;
          });
        }).catch((err) => {
          console.log(err);
          this.errorMessage = err;
        });
      }
    }
  },
  watch: {
    userIds(newUserIds) {
      this.getPosts(newUserIds);
    }
  },
}
</script>

<style scoped>
.postsContainer {
  display: grid;
  grid-auto-columns: 1fr;
  margin-top: 17px;
  text-align: left;
  border: 1px solid grey;
}
.tweetButtons {
  display: grid;
  grid-auto-flow: column;
  justify-items: left;
  margin-left: 20px;
  margin-top: 17px;
}

.twoCol {
  display: grid;
  grid-template-columns: 1fr 2fr ;
}
.boldName {
  font-weight: bold;
  margin-top: 7px;
  margin-bottom: 7px;
}
select {
  max-width: 50%;
}

article {
  border-top: 1px solid grey;
  margin-bottom: 7px;
}
img {
  width: 87px;
}


</style>