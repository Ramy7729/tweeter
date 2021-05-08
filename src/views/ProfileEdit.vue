<template>
  <div>
    <mobile-ham/>
    <side-panel/>
    <main>
      <div class="center" >
        <form action="javascript:void(0)">
          <div class="flex">  
            <h2>Edit Profile</h2>
            <img src="../assets/cowLottie.gif" alt="Animated cartoon cow jumping up and down.">
           </div>  
          <h2 class="noMobile" >Edit Profile</h2>
          <input type="text" id="usernameInput" placeholder="Username" :value="user.username"/>
          <input type="text" id="emailInput" placeholder="Email" :value="user.email"/>
          <input type="date" id="birthDateInput" placeholder="Date of Birth" :value="user.birthdate"/>
          <textarea id="bioInput" placeholder="Bio"  :value="user.bio"/>
          <input type="text" id="userImage" placeholder="Enter a url for your image" :value="user.imageUrl"/>
          <input type="text" id="userBanner" placeholder="Enter a url for your banner" :value="user.bannerUrl"/>
          <h1>{{ errorMessage }}</h1>
          <button @click="edit">Save</button>
        </form>
        <form action="javascript:void(0)">
          <input type="text" name="delete" id="delete" placeholder="Enter your password to delete profile">
          <button @click="deleteProfile" >Delete Profile</button>
        </form>
      </div>
    </main>
  </div>  
</template>

<script>
import MobileHam from '../components/MobileHam.vue';
import SidePanel from '../components/SidePanel.vue';

import axios from "axios";

export default {
  name: "profile-edit",
  components: {
      MobileHam,
      SidePanel,
  },
  data() {
    MobileHam
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
    deleteProfile() {
      axios.request({
        url: "https://tweeterest.ml/api/users",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          password: document.getElementById("delete").value,
          loginToken: this.$store.state.userInfo.loginToken
        },
      }).then((res) => {
        console.log(res.data);
        this.$store.commit('logoutUser');
        this.$router.push({name: 'Login'});
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    },
  },
};
</script>

<style scoped>
.center {
  position: absolute;
  top: 57%;
  left: 50%;
  transform: translate(-50%, -50%);
}

form {
  display: grid;
  grid-template-columns:  1fr;
  place-items: center;
  row-gap: 11px;
  margin-top: 20px;  
}
input, textarea {
  padding: 13px 7px 7px;
  border-radius: 7px;
}
button {
    padding: 7px 27px;
    border-radius: 27px;
    background-color: #FE6D73;
    color: white;
    font-size: 1.3em;
}
img {
  height: 80px;
}
.flex {
  display: flex;
  place-items: center;
  margin-top: 25px;
}
.noMobile {
  display: none;
}


@media screen and (min-width: 600px) {
  /* main {
    background-image: url("../assets/cowEdit.jpg");
    height: 94vh;
    background-size: contain;
    background-repeat: no-repeat;
  } */
  .center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  }
  .flex {
  display: none;
  }
  .noMobile {
    display: block;
    font-size: 1.7em;
  }

}

</style>