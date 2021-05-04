<template>
  <div>
    <page-header/>
    <main>
      <form action="javascript:void(0)">
        <h2>Edit Profile</h2>
        <input type="text" id="usernameInput" placeholder="Username" :value="user.username"/>
        <input type="text" id="emailInput" placeholder="Email" :value="user.email"/>
        <input type="date" id="birthDateInput" placeholder="Date of Birth" :value="user.birthdate"/>
        <textarea id="bioInput" placeholder="Bio"  :value="user.bio"/>
        <input type="text" id="userImage" placeholder="Enter a url for your image" :value="user.imageUrl"/>
        <input type="text" id="userBanner" placeholder="Enter a url for your banner" :value="user.bannerUrl"/>
        <h1>{{ errorMessage }}</h1>
        <button @click="edit">Save</button>
      </form>
    </main>
  </div>  
</template>

<script>
import PageHeader from '../components/PageHeader.vue';
import axios from "axios";

export default {
  name: "profile-edit",
  components: {
      PageHeader,
  },
  data() {
    PageHeader
    return {
      errorMessage: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    edit() {
      axios.request({
        url: "https://tweeterest.ml/api/users",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          email: document.getElementById("emailInput").value,
          username: document.getElementById("usernameInput").value,
          bio: document.getElementById("bioInput").value,
          birthdate: document.getElementById("birthDateInput").value,
          imageUrl: document.getElementById("userImage").value,
          bannerUrl: document.getElementById("userBanner").value,
          loginToken: this.$store.state.userInfo.loginToken
          
        },
      }).then((res) => {
        console.log(res.data);
        res.data.loginToken = this.$store.state.userInfo.loginToken;
        this.$store.commit('loginUser', res.data);
        this.$router.push({name: 'Profile', params: { id: this.$store.state.userInfo.userId }});
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    },
  },
};
</script>

<style scoped>

form {
  display: grid;
  grid-template-columns:  1fr;
  place-items: center;
  row-gap: 13px;
  margin-top: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
}
input, textarea {
  padding: 13px 7px 7px;
  border-radius: 7px;
}
button {
    padding: 15px 37px;
    border-radius: 27px;
    background-color: cornflowerblue;
    color: white;
    font-size: 1.3em;
}

@media screen and (min-width: 900px) {
main {
  background-image: url("../assets/cowEdit.jpg");
  height: 94vh;
  background-size: contain;
  background-repeat: no-repeat;

}
}

</style>