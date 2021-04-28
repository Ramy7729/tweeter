<template>
  <main>
    <form action="javascript:void(0)">
      <input type="text" id="emailInput" placeholder="email" />
      <input type="password" id="passwordInput" placeholder="password" />
      <button @click="login">Login</button>
      <p>{{ errorMessage }}</p>
			<router-link to="/signup"><button>Sign Up</button></router-link>
    </form>
  </main>
</template>

<script>
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
    }
  }
};
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
}
</style>
