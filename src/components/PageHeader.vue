<template>
  <header>
    <img src="../assets/cowIcon.svg" alt="">
    <h1>MOO</h1>
    <!-- <img src="../assets/user.svg" alt=""> -->
  </header>
</template>

<script>
export default {
  name: 'page-header',
}

</script>

<style scoped>
header {
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

</style>
