<!-- Collaborated with Liz for this project. -->
<template>
  <div>
    <mobile-ham/>
    <side-panel/>
    <main>
      <div class="center">
        <section class="mainGrid">
          <!-- Binding userId to get the userId of the logged in person.
            Doing so will display the profile card of the person who is currently logged in.
           -->
          <profile-card :userId="userId"/>
          <div>
            <textarea name="postContent" id="postContent" cols="30" rows="4" placeholder="Make a MOO" ></textarea>
          </div>
          <div class="tweetButton">
            <img class="noMobile" src="../assets/cowLottie.gif" alt="">
            <!-- This at click event submits the post when the user clicks on the button -->
            <button @click="submitPost">MOO</button>
          </div>
          <!-- Binding userIds to display posts made by the users we are following. -->
          <!-- Setting a key here allows the component to re-render which displays a newly made post in real time.-->
          <posts :userIds="followingUserIds" :key="rerender"/>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

import ProfileCard from '../components/ProfileCard.vue';
import Posts from "../components/Posts.vue";
import MobileHam from '../components/MobileHam.vue';
import SidePanel from '../components/SidePanel.vue';

export default {
  name: 'tweeter-main',
  components: {
    Posts,
    ProfileCard,
    MobileHam,
    SidePanel,
  },
  data() {
    return {
      errorMessage: "",
      followingUserIds: [],
      rerender: 0,
    };
  },
  computed: {
    // This returns the current user's id.
    userId() {
      return this.$store.state.userInfo.userId; 
    },
  },
  mounted () {
    // Gets our user id and the users that we are following.
    let followingUserIds = [
      this.$store.state.userInfo.userId,
    ];
    axios.request({
      url: `${process.env.VUE_APP_BASE_DOMAIN}/api/follows`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
      },
      params: {
        userId: this.$store.state.userInfo.userId,
      },
    }).then((res) => {
      // For of loop that populates the list of users we are following.
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
    // This method allows the user to make a post.
    submitPost() {
      // If statement that displays an error message if the post is empty.
      if (!document.getElementById("postContent").value) {
        this.errorMessage = "Please enter your message";
        return;
      }
      // Configuring the request to enable the user to make a post.
      axios.request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/tweets`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          loginToken: this.$store.state.userInfo.loginToken,
          content: document.getElementById("postContent").value,
        },
      }).then((res) => {
        console.log(res);
        document.getElementById("postContent").value = "";
        // Rerenders the page.
        this.rerender += 1;
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
  display: flex;
  margin-left: 20px;
  margin-top: 17px;
  place-content: center;
  column-gap: 7px;
}

button {
  padding: 11px 27px;
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  background-color: #f6afaf;
  border-radius: 10px 10px;
  border: 3px solid black;
}

.twoColGrid {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  column-gap: 30px;
}

textarea {
  border:#94A717 2px solid;
  width: 100vw;
  margin-top: 11px;
  font-family: 'Times New Roman', Times, serif;
}

/* header {
  background-color: #7ECFD4;
} */

h2 {
  font-size: 1.3em
}

img {
  height: 50px;
}

.sidePanel {
  display: none;
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
    border:#94A717 2px solid;
  }

  .center {
    display: grid;
    place-items: center;
    
  }
  
  .noMobile {
    display: none;
  }

}

</style>
