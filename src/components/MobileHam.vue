<template>
  <header>
    <div  class="logo">
      <img src="../assets/cowIcon.svg" alt="" />
      <h1>MOO</h1>
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
}
h1 {
  background-color: black;
  color: white;
  padding: 7px;
}

@media screen and (min-width: 600px) {
  .mobileDisplay {
    visibility: hidden;
  }
  header {
    display: flex;
  }
}
</style>
