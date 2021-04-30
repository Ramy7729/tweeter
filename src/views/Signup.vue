<template>
  <main>
    <h1>Tweeter</h1>
    <form action="javascript:void(0)">
      <input type="text" id="usernameInput" placeholder="Username" />
      <input type="text" id="emailInput" placeholder="Email" />
      <input type="password" id="passwordInput1" placeholder="Password"/>
      <input type="password" id="passwordInput2" placeholder="Retype Password"/>
      <input type="date" id="birthDateInput" placeholder="Date of Birth"/>
      <textarea id="bioInput" placeholder="Bio"/>
      <h1>{{ errorMessage }}</h1>
      <button @click="signup">Sign up</button>
    </form>
  </main>
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
    signup() {
      if (document.getElementById("passwordInput1").value !== document.getElementById("passwordInput2").value  ) {
        this.errorMessage = "Passwords do not match. Retype password";
        return;
      }
      if (!document.getElementById("usernameInput").value) {
        this.errorMessage = "Please enter a name";
        return;
      }
      if (!document.getElementById("emailInput").value) {
        this.errorMessage = "Please enter an email";
        return;
      }
      if (!document.getElementById("passwordInput1").value) {
        this.errorMessage = "Please enter your password";
        return;
      }
      if (!document.getElementById("birthDateInput").value) {
        this.errorMessage = "Please enter your birth date";
        return;
      }
      if (!document.getElementById("bioInput").value) {
        this.errorMessage = "Please enter your bio";
        return;
      }
      axios.request({
        url: "https://tweeterest.ml/api/users",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "'X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        data: {
          email: document.getElementById("emailInput").value,
          username: document.getElementById("usernameInput").value,
          password: document.getElementById("passwordInput1").value,
          bio: document.getElementById("bioInput").value,
          birthdate: document.getElementById("birthDateInput").value,
        },
      }).then((res) => {
        console.log(res);
        this.$store.commit('loginUser', res.data);
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
form {
  display: grid;
  grid-template-columns:  1fr;
  place-items: center;
  row-gap: 7px;
  border-radius: 7px;
  margin-top: 20px;
}

input {
  padding: 12px 7px 7px;
}
</style>