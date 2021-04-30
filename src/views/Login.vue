<template>
  <main>
    <h1>Tweeter</h1>
    <form action="javascript:void(0)">
      <input type="text" id="emailInput" placeholder="email" />
      <input type="password" id="passwordInput" placeholder="password" />
      <button @click="login">Login</button>
      <p>{{ errorMessage }}</p>
			<router-link to="/signup"><button>Sign Up</button></router-link>
      <router-link to="/TweeterMain"><button>Tweeter</button></router-link>
    </form>
    
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      errorMessage: "",
    }
  },

  methods: {
    login() {
      if (!document.getElementById("emailInput").value) {
        this.errorMessage = "Please enter an email";
        return;
      } 
      if (!document.getElementById("passwordInput").value) {
        this.errorMessage = "Please enter your password";
        return;
      }

      axios.request({
        url: "https://tweeterest.ml/api/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          email: document.getElementById("emailInput").value,
          password: document.getElementById("passwordInput").value,
        },
      }).then((res) => {
        console.log(res);
        this.$store.commit('loginUser', res.data);
        this.$router.push({name: 'TweeterMain'})
      }).catch((err) => {
        if (err.response.status == 403) {
          this.errorMessage = 'Invalid username/password';
          return;
        }
        this.errorMessage = err;
      });


      // ===========================================
      // DELETE ME!!
      // ===========================================
      // this.$store.commit('loginUser', { 
      //   "userId": 23,
      //   "email": "cindyLou@suess.com",
      //   "username": "CindyLou",
      //   "bio": "I just want everyone to be together on christmas.",
      //   "birthdate": "1993-07-26",
      //   "loginToken": "LIAbfvh341uNAS314"
      // });
      // ===========================================

    }
  }
};
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  padding: 17px;
  row-gap: 7px;
}
button {
  padding: 0 27px;
  
}

h1 {
  background-color: #7ECFD4;
  
}
</style>