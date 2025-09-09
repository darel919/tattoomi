<template>
  <div class="flex items-center justify-between rounded-full border border-secondary-300 px-3 py-1">
    <button class="btn btn-ghost btn-xs" @click="decrease">
      <Minus class="w-5 h-5 text-secondary-200" />
    </button>
    <span class="text-secondary-250 font-medium">{{ value }}</span>
    <button class="btn btn-ghost btn-xs" @click="increase">
      <Plus class="w-5 h-5 text-secondary-200" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Minus, Plus } from 'lucide-vue-next';

const value = ref(0);

const increase = () => value.value++;
const decrease = () => {
  if (value.value > 0) value.value--;
};
</script>