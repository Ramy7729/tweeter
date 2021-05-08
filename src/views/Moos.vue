<template>
  <div>
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
          <button @click="reply" class="replyButton" >Reply</button>
        </div>

        <div class="commentsContainer">
          <div v-for="comment of comments" :key="comment.commentId" class="border" >
            <p class="boldName" >{{ comment.username }}</p>
            <p>{{ comment.content }}</p>
            <div class="hidden editComment" :commentId="comment.commentId">
              <textarea name="editComment" :commentContentId="comment.commentId" cols="30" rows="04" v-model="comment.content"></textarea>
              <button class="submitButton" @click="editComment(comment)">Submit</button>
            </div>
            <div class="editButton">
              <i class="far fa-comment-dots"></i>
              <span class="likes">
                <span v-if="!comment.isLiked"><i @click="like(comment)" class="far fa-heart"></i>: {{ comment.likes }}</span>
                <span v-else><span class="liked"><i @click="unlike(comment)" class="far fa-heart"></i></span>: {{ comment.likes }}</span>
              </span>
              <i v-if="currentUser.userId == comment.userId" @click="showEditComment(comment)" class="fas fa-pencil-alt"></i>
              
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
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.userInfo; 
    }
  },
  methods: {
    reply() {
      axios.request({
        url: "https://tweeterest.ml/api/comments",
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
        document.getElementById("comment").value = '';
        this.comments.push(res.data);
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    },
    deleteComment (comment) {
      let verify = confirm("Are you sure you want to delete your comment?");
      if (verify) {
        axios.request({
          url: "https://tweeterest.ml/api/comments",
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
    showEditComment(comment) {
      let editComment = document.querySelectorAll(`[commentId="${comment.commentId}"]`);
      editComment[0].classList.toggle("hidden");
    },
    editComment(comment) {
      let editContentComment = document.querySelectorAll(`[commentContentId="${comment.commentId}"]`);
      let content = editContentComment[0].value;
      axios.request({
        url: "https://tweeterest.ml/api/comments",
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
        this.showEditComment(comment);
      
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
  
    axios.request({
      url: "https://tweeterest.ml/api/comments",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
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

@media screen and (min-width: 600px) {
  main {
    /* background-image: url("../assets/cowEdit.jpg");
    height: 94vh;
    background-size: contain;
    background-repeat: no-repeat; */
    max-width: 700px;
    display: grid;
  }
  .center {
    display: grid;
    place-items: center;
  }
}
</style>
