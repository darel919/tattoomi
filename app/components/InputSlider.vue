<template>
  <div class="flex items-center gap-3">
    <input type="range" min="0" max="5" step="0.5" v-model="value"
      class="range range-sm [--range-bg:#E2E8F0] [--range-thumb:white]" />
    <span class="text-secondary-100 text-sm">{{ value }}</span>
  </div>
</template>

<script setup>
const value = ref(4);
</script>
