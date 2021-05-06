<template>
  <div>
    <page-header/>
    <main>
      <div class="center">
        <section class="mainGrid">
          <profile-card :userId="userId"/>
          <div>
            <textarea name="postContent" id="postContent" cols="30" rows="4" placeholder="Make a post" ></textarea>
          </div>
          <div class="tweetButton">
            <button @click="submitPost">MOO</button>
          </div>
          <posts class="noDeco"   :userIds="followingUserIds" />
        </section>
      </div>  
    </main>
  </div>
</template>

<script>
import axios from "axios";

import ProfileCard from '../components/ProfileCard.vue';
import Posts from "../components/Posts.vue";
import PageHeader from '../components/PageHeader.vue';

export default {
  name: 'tweeter-main',
  components: {
    Posts,
    ProfileCard,
    PageHeader,
  },
  data() {
    return {
      errorMessage: "",
      followingUserIds: [],
    };
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.userId; 
    },
  },
  mounted () {
    let followingUserIds = [
      this.$store.state.userInfo.userId,
    ];
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
      for (const user of res.data) {
        followingUserIds.push(user.userId);
      }
      this.followingUserIds = followingUserIds;
    }).catch((err) => {
      console.log(err);
      this.errorMessage = err;
    });
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
        document.getElementById("postContent").value = "";
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

header {
  background-color: #7ECFD4;
}

h2 {
  font-size: 1.3em
}

img {
  height: 50px;
}

.sidePanel {
  visibility: hidden;
}

a {
  text-decoration: none;
  color: black;
}

@media screen and (min-width: 900px) {
  
  .sidePanel {
    display: flex;
    flex-flow: column wrap;
    row-gap: 70px;
    font-size: 2em;
    border-right: 1px solid grey;
    margin-left: 137px;
    margin-top: 56px;
    height: 100%;
    width: 11vw;
    /* background-color:	#FB8E7E; */
    padding-top: 20px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    visibility: visible;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    background-color: lightblue;
    border-radius: 20px 20px ;
  }
  
  .mainGrid {
    max-width: 700px;
    background-color: #F9F9F9;
    margin-top: 20px;
  }

  textarea {
    max-width: 700px;
  }

  .center {
    display: grid;
    place-items: center;
    
  }
  
}

</style>
