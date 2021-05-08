<template>
  <div>
   <section class="sidePanel" >
        <router-link :to="{name: 'TweeterMain'}">Home</router-link>
        <router-link :to="{name: 'Profile', params: { id: user.userId }}">Profile</router-link>
        <router-link :to="{name: 'Users'}">Users</router-link>
        <img src="../assets/cowLottie.gif" alt="Animated cartoon cow jumping up and down">
    </section>
  </div>  
</template>

<script>

export default {
  name: "side-panel",
  computed: {
    user() {
      return this.$store.state.userInfo; 
    }
  },
}
</script>

<style scoped>
img {
  height: 97px;
  border-radius: 50%;
}
.sidePanel {
  display: none;
}

@media screen and (min-width: 900px) {
  main {
    /* background-image: url("../assets/cowEdit.jpg");
    height: 94vh;
    background-size: contain;
    background-repeat: no-repeat; */
    max-width: 700px;
    display: grid;
    place-items: center;
  }
  .center {
    display: grid;
    place-items: center;
  }
  .sidePanel {
    display: flex;
    flex-flow: column wrap;
    row-gap: 70px;
    font-size: 2em;
    border-right: 1px solid grey;
    margin-left: 137px;
    margin-top: 56px;
    height: 100%;
    width: 11vw;
    /* background-color:	#FB8E7E; */
    padding-top: 20px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    visibility: visible;
  }
  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    background-color: pink;
    border-radius: 4px ;
    border-left: 5px solid black;
  }
  img {
   height: 200px;
  }
}
</style>
