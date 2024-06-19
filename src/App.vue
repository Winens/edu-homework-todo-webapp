<script setup lang="ts">
import InitialSetup from "./components/InitialSetup.vue";
import TodoApp from "./components/TodoApp.vue";

const username = localStorage.getItem("username");
</script>

<template>
  <InitialSetup v-if="!username" />
  <TodoApp v-else />
</template>

<style lang="scss">
.app-container {
  max-width: 768px;
  margin: 16px auto;
  padding: 16px 32px;
  position: relative;

  background: rgba(#09090b, 0.9);
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(#000, 0.2);
  height: calc(100vh - 16 * 4px - 4px);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  border: 2px solid rgba(#fff, 0.1);
}
</style>
