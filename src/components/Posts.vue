<template>
  <div class="postsContainer" :key="rerender">
    <article v-for="post of posts" :key="post.tweetId">
      <router-link :to="{name: 'Moos', params:{userId: post.userId, mooId: post.tweetId} }">
        <div class="twoCol">
          <img v-if="post.userImageUrl" :src="post.userImageUrl" alt="">
          <img  v-else src="../assets/cow.jpg" alt="">
          <div>
            <p class="boldName" >{{ post.username }}</p>
            <p>{{ post.content }}</p>
          </div>   
        </div>
        
      </router-link>
      <div class="editButton">
        <i class="far fa-comment-dots"></i>
        <span class="likes">
          <span v-if="!post.isLiked"><i @click="like(post)" class="far fa-heart"></i>: {{ post.likes }}</span>
          <span v-else><span class="liked"><i @click="unlike(post)" class="far fa-heart"></i></span>: {{ post.likes }}</span>
        </span>
        <i v-if="currentUser.userId == post.userId" class="fas fa-pencil-alt"></i>
        <i @click="deleteMoo(post)" v-if="currentUser.userId == post.userId" class="far fa-trash-alt"></i>
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
      rerender: 0,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.userInfo; 
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
          let posts = res.data.concat(this.posts);
          posts = posts.sort((first, second) => {
            return first.createdAt > second.createdAt;
          });

          for (const post of posts) {
            axios.request({
              url: "https://tweeterest.ml/api/tweet-likes",
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
              },
              params: {
                tweetId: post.tweetId,
              },
            }).then((res) => {
              post.likes = res.data.length;
              post.isLiked = false;
              for (const like of res.data) {
                if (this.$store.state.userInfo.userId == like.userId) {
                  post.isLiked = true;
                }
              }
              this.rerender += 1;
            }).catch((err) => {
              console.log(err);
              this.errorMessage = err;
            });
          }
          this.posts = posts;
        }).catch((err) => {
          console.log(err);
          this.errorMessage = err;
        });
      }
    },
    like(post) {
      axios.request({
        url: "https://tweeterest.ml/api/tweet-likes",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          tweetId: post.tweetId,
          loginToken: this.$store.state.userInfo.loginToken
        },
      }).then((res) => {
        post.likes += 1;
        post.isLiked = true;
        this.rerender += 1;
        console.log(res);
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    },
    unlike(post) {
      axios.request({
        url: "https://tweeterest.ml/api/tweet-likes",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          tweetId: post.tweetId,
          loginToken: this.$store.state.userInfo.loginToken
        },
      }).then((res) => {
        post.likes -= 1;
        post.isLiked = false;
        this.rerender += 1;
        console.log(res);
        
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    },
    deleteMoo(post) {
      let verify = confirm("Are you sure you want to delete your MOO?");
      if (verify) {
        axios.request({
          url: "https://tweeterest.ml/api/tweets",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            tweetId: post.tweetId,
            loginToken: this.$store.state.userInfo.loginToken
          },
        }).then((res) => {
          this.posts = this.posts.filter(function(item) {
            if (item.tweetId == post.tweetId) {
              return false;
            }
            return true;
          });
          this.rerender += 1;
          console.log(res);
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
.editButton {
  display: grid;
  grid-auto-flow: column;
  text-align: center;
  margin-top: 7px;
 }
.twoCol {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-right: 7px;
}
.boldName {
  font-weight: bold;
  margin-top: 7px;
  margin-bottom: 7px;
}
.liked {
  color: red;
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
a {
  text-decoration: none;
  color: black;
}
</style>
