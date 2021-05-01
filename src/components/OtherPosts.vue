<template>
  <div class="postsContainer">
    <article v-for="post of posts" :key="post.tweetId">
      <div class="twoCol">
        <p>{{ post.username }}</p>
        <!-- <select name="postOptions" id="postOptions">
          <option value=""></option>
          <option value="delete">Delete</option>
          <option value="edit">Edit</option>
        </select> -->
      </div>

      <p>{{ post.content }}</p>
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
  name: "other-posts",
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
    for (const userId of this.userIds) {    
      axios.request({
        url: "https://tweeterest.ml/api/tweets",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          userId: userId,
        },
      }).then((res) => {
        console.log(res.data);

        this.posts = this.posts.concat(res.data);
        this.posts = this.posts.sort((first, second) => {
          return first.createdAt > second.createdAt;
        });
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    }
  },
}
</script>

<style scoped>
.postsContainer {
  display: grid;
  grid-auto-columns: 1fr;
  margin-top: 17px;
  row-gap: 17px;
  border-top: 1px  solid grey;
  border-bottom: 1px solid grey;
  padding: 7px;
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
  grid-template-columns: 1fr 1fr;
}

select {
  max-width: 50%;
}
</style>