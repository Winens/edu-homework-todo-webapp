<script setup lang="ts">
import { ref } from "vue";

const name = ref("");

const handleSave = () => {
  localStorage.setItem("username", name.value);
  window.location.reload();
};
</script>

<template>
  <div class="center">
    <div class="app-container section-box">
      <h1>İsminizi Giriniz:</h1>

      <input
        v-model="name"
        type="text"
        placeholder="İsminizi Giriniz"
        class="input"
        style="width: 100%; display: block"
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
.section-box {
  /* margin-bottom: 120px; */
  padding-bottom: 32px !important;
  max-width: 320px;
  flex-shrink: 0;
  width: 100%;
  height: max-content;
  /* margin: 0 auto; */
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
