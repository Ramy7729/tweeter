<template>
  <div class="twitterProfile" >
    <div class="twoColGrid">
      <img src="../assets/doggo.jpg" alt="">
      <div>
        <h2>Name</h2>
        <p>bio info blah blah blah hallo</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile-card",
  props: {
    userId: {
      type: Number,
    },
  },
};
</script>

<style scoped>
.twitterProfile {
  display: grid;
  justify-items: left;
  margin-left: 20px;
  row-gap: 7px;
  
  
}
.twoColGrid {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  /* place-items: center; */
  column-gap: 30px;
  padding: 17px;
}
img {
    width: 97px;
}
.fa-thumbs-up {
  height: 50px;
}

</style>