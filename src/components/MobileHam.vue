<template>
  <header>
    <div  class="logo">
      <img src="../assets/cowIcon.svg" alt="face of a cartoon cow" />
      <h1>MOO</h1>
      <router-link  class="signOut" to="/"><h2 @click="signOut" >Sign Out</h2></router-link>
    </div>
    <div></div>
    <div class="headerNav mobileDisplay">
      <nav>
        <div class="displayBlock">
          <input type="checkbox" />

          <span></span>
          <span></span>
          <span></span>

          <ul>
            <router-link to="/tweetermain"><li>Home</li></router-link>
            <router-link to="/profile"><li>Profile</li></router-link>
            <router-link to="/users"><li>Users</li></router-link>
            <router-link to="/"><li @click="signOut" >Sign Out</li></router-link>
          </ul>
        </div>
      </nav>
    </div>
    <!-- <img src="../assets/user.svg" alt=""> -->
  </header>
</template>

<script>
export default {
  name: "mobile-ham",
  methods: {
    signOut() {
      this.$store.commit('logoutUser');
    }
  },
};
</script>

<style scoped>
/* img {
  height: 47px;
} */
header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  margin-right: 27px;
}
.headerNav {
  display: grid;
  grid-template-columns: auto auto;
}
a {
  text-decoration: none;
  color: white;
}
.displayBlock {
  display: block;
  position: relative;
  top: 9px;
  left: 50px;
  z-index: 1;
  margin-right: 30px;
  
}
input {
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -6px;
  left: -4px;
  cursor: pointer;
  z-index: 2;
  opacity: 0;
  user-select: none;
}
input:checked ~ ul {
  visibility: visible;
}
span {
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  background: black;
  border-radius: 3px;
  z-index: 1;
}
ul {
  position: absolute;
  width: 90px;
  padding: 30px;
  list-style-type: none;
  left: -108px;
  background-color: black;
  text-align: center;
  visibility: hidden;
}
li {
  padding: 7px 0;
  font-size: 18px;
}

.logo {
  display: flex;
  align-items: center;
  column-gap: 5px;
}

img {
  height: 47px;
  margin: 5px 5px;
  margin-right: 0;
  border: 2px solid;
  border-radius: 10px 10px;
}
h1 {
  background-color: black;
  color: white;
  padding: 7px;
  border-radius: 10px 10px;
}
.signOut:hover {
  cursor: pointer;
  color: #FE6D73;
}

@media screen and (min-width: 900px) {
  .mobileDisplay {
    visibility: hidden;
  }
  header {
    display: flex;
  }
  .signOut {
    position: absolute;
    right: 0;
    font-size: 1.3em;
    /* background-color: #0e6b0e; */
    color: black;
    border: 2px solid black;
    width: 10vw;
    padding: 9px 15px;
    margin-right: 5px;
    border-radius: 4px;
  }
}
</style>
