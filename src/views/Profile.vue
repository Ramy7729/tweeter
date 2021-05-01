<template>
  <div>
    <page-header/>
    <main>
      <div class="twitterProfile">
        <div class="twoColGrid">
          <img src="../assets/doggo.jpg" alt="">
          <div>
            <h2>Name Name</h2>
            <p>somthing somthing</p>
            <p></p>
          </div>
        </div>
      </div>
      <other-posts/>
    </main>
  </div>
</template>

<script>
import OtherPosts from '../components/OtherPosts.vue';
// import axios from "axios";
import PageHeader from '../components/PageHeader.vue';

export default {
  name: "Profile",
  components: {
    PageHeader,
    OtherPosts
  },
  data() {
    OtherPosts
    return {
      errorMessage: "",
    };
  },
//   methods: {
    
//       axios.request({
//         url: "https://tweeterest.ml/api/users",
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
//         },
//         data: {
//           email: document.getElementById("emailInput").value,
//           username: document.getElementById("usernameInput").value,
//           password: document.getElementById("passwordInput1").value,
//           bio: document.getElementById("bioInput").value,
//           birthdate: document.getElementById("birthDateInput").value,
//           imageUrl: document.getElementById("userImage").value,
//         },
//       }).then((res) => {
//         console.log(res);
//         this.$store.commit('loginUser', res.data);
//         this.$router.push({name: 'TweeterMain'});
//       }).catch((err) => {
//         console.log(err);
//         this.errorMessage = err;
//       });
//     },
//   },
};
</script>

<style scoped>
.twitterProfile {
  display: grid;
  justify-items: left;
  margin-left: 20px;
  row-gap: 7px;
}
.twoColGrid {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  /* place-items: center; */
  column-gap: 30px;
  padding: 17px;
}
img {
    width: 90px;
}
input {
  padding: 12px 7px 7px;
}
</style>