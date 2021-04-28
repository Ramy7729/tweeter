<template>
  <main>
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
    },
  },
};
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns:  1fr;
  place-items: center;
}
</style>
