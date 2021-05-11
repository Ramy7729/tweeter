<!-- Collaborated with Liz for this project. -->
<template>
  <main>
    <div class="heroText" >
      <h1>MOO.</h1>
      <h2>Make your voice herd</h2>
    </div>  
    <form action="javascript:void(0)">
      <input type="text" id="emailInput" placeholder="email" />
      <input type="password" id="passwordInput" placeholder="password" />
      <!-- This gives the user the ability to log in -->
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
    // This method is used to log in a user.
    // // Conditional statements are used for data validation which checks for user input.
    login() {
      // This checks to see if an email was entered.
      // If they don't match  an error message is displayed.
      if (!document.getElementById("emailInput").value) {
        this.errorMessage = "Please enter an email";
        return;
      } 
      // This checks to see if a password was entered.
      // If they don't match  an error message is displayed.
      if (!document.getElementById("passwordInput").value) {
        this.errorMessage = "Please enter your password";
        return;
      }
      // Configuring the request to enable the user to log in.
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
        // On success a mutation is committed from the store which logs in the user.
        this.$store.commit('loginUser', res.data);
        // The user is then redirected to the home page (TweeterMain).
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
  padding: 5px 47px;
  border-radius: 20px 20px;
  background-color: #FE6D73;
  color: white;
  width: 100%;
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
