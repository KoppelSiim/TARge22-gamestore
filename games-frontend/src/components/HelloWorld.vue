<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<script lang="ts">
import { ref, defineProps } from 'vue';
// Define props
const props = defineProps<{
  msg: string
}>();
// Define a message and add content
const message = ref('My games');
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    <h1>
      Welcome to my game store
    </h1>
    <p>{{ message }}</p>
  </div>
</template>

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

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
