<template>
  <div class="w-full">
    <div class="label mb-1 text-black" v-if="label">
      {{ label }}
    </div>


    <label class="border border-secondary-300 rounded-md py-2 px-3 flex items-center gap-2">
      <div class="w-4 h-4">
        <component v-if="icon" :is="icon" />
      </div>
      <Multiselect v-if="type === 'select'" v-bind="$attrs" :placeholder="placeholder" :model-value="modelValue"
        @update:modelValue="emit('update:modelValue', $event)" :options="options" track-by="value" label="label"
        :searchable="false" :show-labels="false">
      </Multiselect>
      <input v-else v-bind="$attrs" :type="type" :placeholder="placeholder" class="grow roboto outline-none"
        :value="modelValue" @input="emit('update:modelValue', $event.target.value)" />
    </label>
  </div>
</template>

<script setup>
import { Teleport } from 'vue';
import Multiselect from 'vue-multiselect';

const props = defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  modelValue: { type: [String, Number], default: '' },
  icon: { type: [Object, Function], default: null },
  options: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);
</script>