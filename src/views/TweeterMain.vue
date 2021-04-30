<template>
  <div>
   <header>
    <h1>Tweeter</h1>
   </header>
    <main>
      <profile-card :userId="userId"/>
      <div>
        <textarea name="createPost" id="createPost" cols="30" rows="4" placeholder="Make a post" ></textarea>
      </div>
      <div class="tweetButton">
        <button>Tweet</button>
      </div>
      <tweets/>
    </main>
  </div>
</template>

<script>
// import axios from "axios";
// import cookies from "vue-cookies";
import ProfileCard from '../components/ProfileCard.vue'
import Tweets from "../components/Tweets.vue"
export default {
  name: 'tweeter-main',
  components: {
    Tweets,
    ProfileCard,
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.userId; 
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