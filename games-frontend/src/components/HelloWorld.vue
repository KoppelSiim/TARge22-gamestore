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
      <li v-for="gameName in gameNames">{{ gameName.name}}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';

// Define props
const props = defineProps<{
  msg: string
}>();

// Define gameNames to fetch
const gameNames = ref<string[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/gamenames');
    const data = await response.json();
    gameNames.value = data;
    console.log(data);
  } catch (error) {
    console.error('Error fetching game names:', error);
  }
});
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
.games ul{
  list-style: none;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
