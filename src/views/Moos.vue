<!-- Collaborated with Liz for this project. -->
<template>
  <div :key="rerender">
    <mobile-ham/>
    <side-panel/>
    <div class="center" >
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
        <div class="tweetButtons" >
          <!-- This gives the user the ability to reply to a post -->
          <button @click="reply" class="replyButton" >Reply</button>
        </div>

        <div class="commentsContainer">
          <div v-for="comment of comments" :key="comment.commentId" class="border" >
            <p class="boldName" >{{ comment.username }}</p>
            <p>{{ comment.content }}</p>
            <div class="hidden editComment" :commentId="comment.commentId">
              <textarea name="editComment" :commentContentId="comment.commentId" cols="30" rows="04" v-model="comment.content"></textarea>
              <!-- This gives the user the ability to edit a comment -->
              <button class="submitButton" @click="editComment(comment)">Submit</button>
            </div>
            <div class="editButton">
              <span class="likes">
                 <!-- This gives the user the ability to like a comment -->
                <span v-if="!comment.isLiked"><i @click="like(comment)" class="far fa-heart"></i>: {{ comment.likes }}</span>
                 <!-- This gives the user the ability to unlike a comment -->
                <span v-else><span class="liked"><i @click="unlike(comment)" class="far fa-heart"></i></span>: {{ comment.likes }}</span>
              </span>
               <!-- This gives the user the ability to see the comment they are editing -->
              <i v-if="currentUser.userId == comment.userId" @click="showEditComment(comment)" class="fas fa-pencil-alt"></i>
               <!-- This gives the user the ability to delete a comment -->
              <i @click="deleteComment(comment)" v-if="currentUser.userId == comment.userId" class="far fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </main>
    </div>  
  </div>  
</template>

<script>
import MobileHam from '../components/MobileHam.vue';
import SidePanel from '../components/SidePanel.vue';

import axios from "axios";

export default {
  name: "Comments",
  components: {
    MobileHam,
    SidePanel,
  },
  data() {
    return {
      post: {},
      errorMessage: "",
      comments: [],
      rerender: 0,
    };
  },
  computed: {
    // This returns the current logged in user.
    currentUser() {
      return this.$store.state.userInfo; 
    }
  },
  methods: {
    // Configuring the request to enable the user to make a comment.
    reply() {
      axios.request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/comments`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          loginToken: this.$store.state.userInfo.loginToken,
          tweetId: parseInt(this.$route.params.mooId),
          content: document.getElementById("comment").value
        },
      }).then((res) => {
        // On success the comment input is cleared.
        document.getElementById("comment").value = '';
        // The comment then gets added to the comments that are displayed.
        res.data.likes = 0;
        res.data.isLiked = false;
        this.comments.push(res.data);
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    },
    // Configuring the request to enable the user to delete a comment.
    deleteComment (comment) {
      // A confirmation appears that asks the user to verify if they want to delete their comment.
      let verify = confirm("Are you sure you want to delete your comment?");
      if (verify) {
        axios.request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/comments`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.userInfo.loginToken,
            commentId: comment.commentId, 
          },
        }).then((res) => {
          console.log(res.data);
          // Used the filter method to remove a comment from the displayed comments.
          this.comments = this.comments.filter(function(item) {
            if (item.commentId == comment.commentId) {
              return false;
            }
            return true;
          });
        }).catch((err) => {
          console.log(err);
          this.errorMessage = err;
        });
      }
    },
    // This method displays and hides the text area for editing comments.
    showEditComment(comment) {
      let editComment = document.querySelectorAll(`[commentId="${comment.commentId}"]`);
      editComment[0].classList.toggle("hidden");
    },
   // Configuring the request to enable the user edit their comment.
    editComment(comment) {
      let editContentComment = document.querySelectorAll(`[commentContentId="${comment.commentId}"]`);
      let content = editContentComment[0].value;
      axios.request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/comments`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          loginToken: this.$store.state.userInfo.loginToken,
          commentId: comment.commentId, 
          content: content,
        },
      }).then((res) => {
        console.log(res);
        // On success the comment text area is hidden.
        this.showEditComment(comment);
      
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    },
    // Configuring the request to enable the user to like a comment.
    like(comment) {
      axios.request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/comment-likes`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          loginToken: this.$store.state.userInfo.loginToken,
          commentId: comment.commentId,
        },
      }).then((res) => {
        console.log(res);
        // The amount of likes get incremented by 1 .
        comment.likes += 1;
        //  This is set to true to determine that the user liked the comment.
        comment.isLiked = true;
        // Triggers a rerender.
        this.rerender += 1;

      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    },
    // Configuring the request to enable the user to unlike a comment.
    unlike(comment) {
      axios.request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/comment-likes`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          loginToken: this.$store.state.userInfo.loginToken,
          commentId: comment.commentId,
        },
      }).then((res) => {
        console.log(res);
        // The number of likes gets decremented by 1.
        comment.likes -= 1;
        //  This is set to true to determine that the user did not like the comment.
        comment.isLiked = false;
        // Triggers a rerender.
        this.rerender += 1;

      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    },
  },
  mounted () {
    // Configuring the request to enable the user to retrieve a post.
    axios.request({
      url: `${process.env.VUE_APP_BASE_DOMAIN}/api/tweets`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
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
    // Configuring the request to get comments that are made on a post.
    axios.request({
      url: `${process.env.VUE_APP_BASE_DOMAIN}/api/comments`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
      },
      params: {
        tweetId: parseInt(this.$route.params.mooId),
      },
    }).then((res) => {
      let comments = res.data;
      console.log(res.data);
      // For of loop used to get the like for each comment.
      for (const comment of comments) {
        axios.request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/comment-likes`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            commentId: comment.commentId,
          },
        }).then((res) => {
          // On success this sets the amount of likes.
          comment.likes = res.data.length;
          // This determines if we liked the comment.
          comment.isLiked = false;
          for (const like of res.data) {
            if (this.$store.state.userInfo.userId == like.userId) {
              comment.isLiked = true;
            }
          }
          // This rerenders the page.
          this.rerender += 1;
        }).catch((err) => {
          console.log(err);
          this.errorMessage = err;
        });
        this.comments = comments;
      }
    }).catch((err) => {
      console.log(err);
      this.errorMessage = err;
    });
  },
};
</script>

<style scoped>
img {
  width: 97px;
  height: 97px;
  border-radius: 50%;
}
.commentsContainer {
  display: grid;
  text-align: left;
  grid-auto-columns: 1fr;
  margin-left: 20px;
}

.hidden {
  display: none;
}

.twoCol {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-left: 20px;
}

.boldName {
  font-weight: bold;
  margin-bottom: 7px;
}

.border {
  display: grid;
  border: 1px solid grey;
}

textarea {
  margin-top: 7px;
  margin-bottom: 7px;
}
.editButton {
  display: grid;
  grid-auto-flow: column;
  text-align: center;
  margin-top: 7px;
 }
 .replyButton {
   padding: 11px 27px;
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  background-color: #f6afaf;
  border-radius: 10px 10px;
  border: 3px solid black;
  margin-bottom: 7px;
 }
 .editComment{
  width: 100%;
  text-align: center;
}
textarea {
  width: 100%;
}
.submitButton {
  padding: 3px 15px;
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  background-color: #f6afaf;
  border-radius: 10px 10px;
  border: 3px solid black;
}
.liked {
  color: red;
}

@media screen and (min-width: 600px) {
  main {
    max-width: 700px;
    display: grid;
  }
  .center {
    display: grid;
    place-items: center;
  }
}
</style>
