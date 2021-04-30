<template>
  <div class="postsContainer">
		<article>
			<div class="twoCol">
        <p>Name</p>
        <select name="postOptions" id="postOptions">
          <!-- <option value=""></option> -->
          <option value="delete">Delete</option>
          <option value="edit">Edit</option>
        </select>
      </div>        
        <p>This is a post. Hello the quick brown fox jumps over the lazy dog.</p>
      
			<div class="tweetButtons" >
				<p>Reply</p>
				<p>Retweet</p>
				<p>Like</p>
			</div>
		</article>
  </div>   
</template>

<script>
// import axios from "axios";

export default {
  name: "Tweets",
}
</script>

<style scoped>
.postsContainer {
  display: grid;
  grid-auto-columns: 1fr;
  margin-top: 17px;
  row-gap: 17px;
  border-top: 1px  solid grey;
  border-bottom: 1px solid grey;
  padding: 7px;
}
.tweetButtons {
  display: grid;
  grid-auto-flow: column;
  justify-items: left;
  margin-left: 20px;
  margin-top: 17px;
}

.twoCol {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

select {
  max-width: 50%;
}
</style>