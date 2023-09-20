<script setup>
import { Vue3Snackbar } from "vue3-snackbar";
import { onMounted } from "vue";
const emit = defineEmits(["loading-emit"]);

onMounted(() => {
  //document.body.classList = "d-flex flex-column"
  //document.body.style.height = null
});
</script>
<template>
  <div class="d-flex flex-column vh-100">
    <main class="flex-grow-1">
      <slot />
    </main>
    <Vue3Snackbar bottom right :duration="10000"></Vue3Snackbar>
  </div>
</template>
<style lang="scss">
html {
  height: 100% !important;
  min-height: 100% !important;
}
</style>
