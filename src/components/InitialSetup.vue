<script setup lang="ts">
import { ref } from "vue";

const name = ref("");

const handleSave = () => {
  localStorage.setItem("username", name.value);
  window.location.reload();
};
</script>

<template>
  <div class="vcenter">
    <div class="app-container" style="margin-bottom: 120px">
      <h1>İsminizi Giriniz:</h1>

      <input
        v-model="name"
        type="text"
        placeholder="İsminizi Giriniz"
        class="input"
      />

      <button
        @click="handleSave"
        class="btn"
        style="margin-top: 16px; width: 100%"
      >
        Kaydet
      </button>
    </div>
  </div>
</template>

<style scoped>
.vcenter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
