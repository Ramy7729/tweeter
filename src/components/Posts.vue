<!-- Collaborated with Liz for this project. -->
<template>
  <!-- Rerendering the component to display likes and posts in real time. -->
  <div class="postsContainer" :key="rerender">
    <article v-for="post of posts" :key="post.tweetId">
        <div>
          <!-- Redirects user to the Moo page.
            Takes in params of userId and mooId to show posts made on a comment.
          -->
          <router-link class="twoCol" :to="{name: 'Moos', params:{userId: post.userId, mooId: post.tweetId} }">
            <img v-if="post.userImageUrl" :src="post.userImageUrl">
            <img  v-else src="../assets/cow.jpg" alt="Cows at the beach laying on the sand and in the water.">
            <div>
              <p class="boldName" >{{ post.username }}</p>
              <p>{{ post.content }}</p>
            </div>
          </router-link> 
            
          <div class="hidden editComment" :postId="post.tweetId">
            <textarea name="editComment" :postContentId="post.tweetId" cols="30" rows="04" v-model="post.content"></textarea>
            <!-- This gives the user the ability to edit their post -->
            <button @click="editPost(post)">Submit</button>
          </div>

        </div>
      <div class="editButton">
        <i class="far fa-comment-dots"></i>
        <span class="likes">
          <!-- This gives the user the ability to like a post -->
          <span v-if="!post.isLiked"><i @click="like(post)" class="far fa-heart"></i>: {{ post.likes }}</span>
          <!-- This gives the user the ability to unlike a post -->
          <span v-else><span class="liked"><i @click="unlike(post)" class="far fa-heart"></i></span>: {{ post.likes }}</span>
        </span>
        <!-- This gives the user the ability to show the post they are editing -->
        <i v-if="currentUser.userId == post.userId" @click="showEditPost(post)" class="fas fa-pencil-alt"></i>
        <!-- This gives the user the ability to delete their post -->
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
      // This is used to rerender the component.
      rerender: 0,
    }
  },
  computed: {
    // This returns the current user from the store.
    currentUser() {
      return this.$store.state.userInfo; 
    }
  },
  // This runs when the component is added to the page.
  // The users post is retrieved and gets added to the posts property of the component.
  mounted () {
    this.getPosts(this.userIds);
  },
  methods: {
     // Configuring the request to display posts of current user. 
    getPosts(userIds) {
      for (const userId of userIds) {    
        axios.request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/tweets`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: userId,
          },
        }).then((res) => {
          // On success our the array of posts gets populated
          let posts = res.data.concat(this.posts);
          // Configuring the request to get the likes for each post.
          for (const post of posts) {
            axios.request({
              url: `${process.env.VUE_APP_BASE_DOMAIN}/api/tweet-likes`,
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
              },
              params: {
                tweetId: post.tweetId,
              },
            }).then((res) => {
              // On success the post object is populated with the amount of likes.
              post.likes = res.data.length;
              // Is only populated which depends if the current user liked the post.
              post.isLiked = false;
              // Using a for of loop to see if the current user liked the post.
              for (const like of res.data) {
                if (this.$store.state.userInfo.userId == like.userId) {
                  post.isLiked = true;
                }
              }
              // Rerendering the component.
              this.rerender += 1;
            }).catch((err) => {
              console.log(err);
              this.errorMessage = err;
            });
          }
          // Using the sort method to sort posts by the createdAt property.
          // Posts are sorted by the most recent post made.
          posts = posts.sort((first, second) => {
            if (first.createdAt < second.createdAt) {
              return 1;
            } else if (first.createdAt > second.createdAt) {
              return -1;
            }
            return 0;
          });
          this.posts = posts;
        }).catch((err) => {
          console.log(err);
          this.errorMessage = err;
        });
      }
    },
    // Configuring the request to enable the user to like a post.
    like(post) {
      axios.request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/tweet-likes`,
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
        // The number of likes gets incremented by 1.
        post.likes += 1;
        // The current user is set to determine if they liked the post.
        post.isLiked = true;
        // Rerenders the component.
        this.rerender += 1;
        console.log(res);
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    },
    // Configuring the request to enable the user to unlike post.
    unlike(post) {
      axios.request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/tweet-likes`,
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
        // The number of likes gets decremented by 1.
        post.likes -= 1;
        // The current user is set to determine if they didn't liked the post.
        post.isLiked = false;
        // Rerenders the component.
        this.rerender += 1;
        console.log(res);
        
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    },
    // Configuring the request to enable the user to delete a post.
    deleteMoo(post) {
      // A confirmation box appears with a confirmation message to verify if the user wants to delete a post
      let verify = confirm("Are you sure you want to delete your MOO?");
      if (verify) {
        axios.request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/tweets`,
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
          // Uses the filter method to remove deleted post from posts.
          this.posts = this.posts.filter(function(item) {
            if (item.tweetId == post.tweetId) {
              return false;
            }
            return true;
          });
          // Rerenders the component.
          this.rerender += 1;
          console.log(res);
        }).catch((err) => {
          console.log(err);
          this.errorMessage = err;
        });
      }
    },
    // This method displays and hides the textarea for the user to edit their post.
    showEditPost(tweet) {
      let editPost = document.querySelectorAll(`[postId="${tweet.tweetId}"]`);
      editPost[0].classList.toggle("hidden");
    },
    // Configuring the request to enable the user to edit their post.
    editPost(tweet) {
      let editContentPost = document.querySelectorAll(`[postContentId="${tweet.tweetId}"]`);
      let content = editContentPost[0].value;
      axios.request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/tweets`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          loginToken: this.$store.state.userInfo.loginToken,
          tweetId: tweet.tweetId, 
          content: content,
        },
      }).then((res) => {
        console.log(res);
        // This hides the textarea from the user.
        this.showEditPost(tweet);
      
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    }
  
  },
  watch: {
    // This method watches for changes made to the user id to rerender and display all the posts.
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
  grid-template-columns: auto 1fr;
  margin-right: 7px;
  column-gap: 40px;
}
.boldName {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
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
.hidden {
  display: none;
}
button {
  padding: 3px 15px;
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  background-color: #f6afaf;
  border-radius: 10px 10px;
  border: 3px solid black;
}
.editComment{
  width: 100%;
  text-align: center;
}
textarea {
  width: 100%;
}
</style>
