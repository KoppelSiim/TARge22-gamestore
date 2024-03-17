<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
// Define props
const props = defineProps<{
  msg: string
}>();

// Define gameNames to fetch and specify the type of gameNames
const gameNames = ref<{ name: string }[]>([]);

const gameGenres = ref<{ genre: string }[]>([]);

// Define reactive variables for game name, genre, and price
const gameName = ref('');
const gameGenre = ref('');
const gamePrice = ref('');

onMounted(async () => {
  await fetchGameNames();
  await fetchGameGenres();
});

async function fetchGameNames() {
  try {
    const response = await fetch('http://localhost:8080/gamenames');
    const data = await response.json();
    gameNames.value = data;
    console.log(data);
  } catch (error) {
    console.error('Error fetching game names:', error);
  }
}
async function fetchGameGenres() {
  try {
    const response = await fetch('http://localhost:8080/gamegenres');
    const data = await response.json();
    gameGenres.value = data;
    console.log(data);
  } catch (error) {
    console.error('Error fetching game genres:', error);
  }
}
// Add a game on click
async function addGame() {
  try {
    const response = await fetch('http://localhost:8080/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: gameName.value,
        genre: gameGenre.value,
        price: gamePrice.value
      }),
    });

    // Update gamelist on success
    if (response.ok) {
      await fetchGameNames();
    } else {
      console.error('Failed to add game:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding game:', error);
  }
}
</script>

<style scoped>
h1 {
  font-weight: 100;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
.games ul {
  list-style: none;
}
.games #add {
  color: rgb(22, 24, 165);
  margin-top: 10px;
  margin-left: 25px;
  padding: 5px;
  font-size: medium;
  border-radius: 5px;
}
.add-game{
  margin-top: 20px;
}
.add-game label {
  margin-right: 20px; 
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    <h1>Welcome to my game store</h1>
  </div>

  <div class="games">
    <h1>Game Names</h1>
    <ul>
    <li v-for="(game, index) in gameNames" :key="index">
      {{ game.name }} - {{ gameGenres[index].genre }}
    </li>
    </ul>
    <!-- Use v-model to bind the data -->
    <div class="add-game">
      <label for="gname">Game name</label>
      <input type="text" id="gname" name="gname" v-model="gameName">
    </div>
    <div class="add-game">
      <label for="ggenre">Game genre</label>
      <input type="text" id="ggenre" name="ggenre" v-model="gameGenre">
    </div>
    <div class="add-game">
      <label for="gprice">Game price</label>
      <input type="number" step="0.1" id="gprice" name="gprice" v-model="gamePrice">
    </div>
    <button id="add" @click="addGame">Add game</button>
  </div>
</template>