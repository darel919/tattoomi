<template>
  <div class="flex items-center gap-3">
    <input type="range" :min="props.min" :max="props.max" :step="props.step" v-model="value"
      class="range range-sm w-full [--range-bg:#E2E8F0] [--range-thumb:white] [--range-progress:#656564]" />
    <span class="text-secondary-100 text-sm font-bold">{{ value }}{{ props.labelValue }}</span>
  </div>
</template>

<script setup>
const value = ref(4);
const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 5 },
  step: { type: Number, default: 1 },
  labelValue: { type: String, default: '' },
})

</script>
