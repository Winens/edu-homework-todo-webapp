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

  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  background: rgba(#09090b, 0.9);
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(#000, 0.2);
  height: calc(100vh - 16 * 4px - 4px);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  border: 2px solid rgba(#fff, 0.1);
}
</style>
