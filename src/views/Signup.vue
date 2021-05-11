<!-- Collaborated with Liz for this project. -->
<template>
  <div>
    <main>
      <!-- Form for the user to sign up and create an account. -->
      <form action="javascript:void(0)">
      <h1>MOO.</h1>
      <h2>Create your account</h2>
      <div>  
        <div><input type="text" id="usernameInput" placeholder="Username" /></div>
        <input type="text" id="emailInput" placeholder="Email" />
      </div>  
      <div>     
          <div><input type="password" id="passwordInput1" placeholder="Password"/></div>
          <input type="password" id="passwordInput2" placeholder="Retype Password"/>
      </div>
      <div> 
        <div><input type="date" id="birthDateInput" placeholder="Date of Birth"/></div>
        <textarea id="bioInput" placeholder="Bio"/>
      </div>   
      <div>
        <div><input type="text" id="userImage" placeholder="Enter a url for your image"/></div>
        <input type="text" id="userBanner" placeholder="Enter a url for your banner"/>
      </div>  
        <h1>{{ errorMessage }}</h1>
        <!-- This click event allows the user to create their account. -->
        <button @click="signup">Sign up</button>
      </form>
    </main>
  </div>  
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      errorMessage: "",
    };
  },
  methods: {
    // This method allows the sign up of a user.
    // Conditional statements are used for data validation which checks for user input.
    signup() {
      // This checks to see if the passwords match.
      // If they don't match  an error message is displayed.
      if (document.getElementById("passwordInput1").value !== document.getElementById("passwordInput2").value  ) {
        this.errorMessage = "Passwords do not match. Retype password";
        return;
      }
      // This checks to see if a username was entered.
      // If they don't match  an error message is displayed.
      if (!document.getElementById("usernameInput").value) {
        this.errorMessage = "Please enter a name";
        return;
      }
      // This checks to see if an email was entered.
      // If they don't match  an error message is displayed.
      if (!document.getElementById("emailInput").value) {
        this.errorMessage = "Please enter an email";
        return;
      }
      // This checks to see if a password was entered.
      // If they don't match  an error message is displayed.
      if (!document.getElementById("passwordInput1").value) {
        this.errorMessage = "Please enter your password";
        return;
      }
      // This checks to see if a birth date was entered.
      // If they don't match  an error message is displayed.
      if (!document.getElementById("birthDateInput").value) {
        this.errorMessage = "Please enter your birth date";
        return;
      }
      // This checks to see if the user's bio was entered.
      // If they don't match an error message is displayed.
      if (!document.getElementById("bioInput").value) {
        this.errorMessage = "Please enter your bio";
        return;
      }
      // Configuring the request to enable the creation of a new user.
      axios.request({
        url: "https://tweeterest.ml/api/users",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        
        // The required data properties are sent with specific values inputted by the user.
        data: {
          email: document.getElementById("emailInput").value,
          username: document.getElementById("usernameInput").value,
          password: document.getElementById("passwordInput1").value,
          bio: document.getElementById("bioInput").value,
          birthdate: document.getElementById("birthDateInput").value,
          imageUrl: document.getElementById("userImage").value,
          bannerUrl: document.getElementById("userBanner").value,
        },
      }).then((res) => {
        console.log(res);
        // On success a mutation is committed (loginUser) and  sets a cookie which logs in a user.
        this.$store.commit('loginUser', res.data);
        // The user is then redirected to the home page (TweeterMain).
        this.$router.push({name: 'TweeterMain'});
      }).catch((err) => {
        console.log(err);
        this.errorMessage = err;
      });
    },
  },
};
</script>

<style scoped>
main {
  background-image: url("../assets/cow111.jpg");
  height: 100vh;
  background-size: cover;
  /* background-position: 0%;  */
}
form {
  display: grid;
  grid-template-columns:  1fr;
  place-items: center;
  row-gap: 7px;
  border-radius: 7px;
  margin-top: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h1, h2 {
  color: white;
}
input, textarea {
  padding: 12px 7px 7px;
  border-radius: 7px;
}
button {
    padding: 7px 37px;
    border-radius: 27px;
    background-color: #17C3B2;
    color: white;
    font-size: 1.3em;
}
</style>