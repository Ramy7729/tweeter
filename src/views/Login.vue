<template>
  <main>
    <div class="heroText" >
      <h1>MOO.</h1>
      <h2>Make your voice herd</h2>
    </div>  
    <form action="javascript:void(0)">
      <input type="text" id="emailInput" placeholder="email" />
      <input type="password" id="passwordInput" placeholder="password" />
      <button @click="login">Login</button>
      <p>{{ errorMessage }}</p>
			<router-link to="/signup"><button class="signupButton" >Sign Up</button></router-link>
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
    }
  }
};
</script>

<style scoped>
.heroText {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}
form {
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  padding: 17px;
  row-gap: 7px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
input {
  border-radius: 20px 20px;
  padding: 7px;
}
button {
  font-size: 1.3em;
  padding: 5px 67px;
  border-radius: 20px 20px;
  background-color: #FE6D73;
  color: white;
}
.signupButton {
  background-color: #17C3B2;
}
main {
  background-image: url("../assets/cow.jpg");
  background-size: cover;
  height: 100vh;
}

@media screen and (min-width: 900px) {
  .heroText {
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.7em;
  }
}
</style>
