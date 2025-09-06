<template>
  <label class="w-full">
    <div class="label mb-1 text-black" v-if="label">
      {{ label }}
    </div>

    <label class="border border-secondary-300 rounded-md py-2 px-3 flex items-center gap-2">
      <div class="w-4 h-4">
        <component v-if="icon" :is="icon" />
      </div>
      <select v-if="type === 'select'" v-bind="$attrs" class="select select-xs text-base p-0 grow roboto"
        :value="modelValue" @change="emit('update:modelValue', $event.target.value)">
        <optgroup class="rounded-xl bg-white text-black shadow-md font-bold">
          <option v-for="(opt, i) in options" :key="i" :value="opt.value">
            {{ opt.label }}
          </option>
        </optgroup>
      </select>
      <input v-else v-bind="$attrs" :type="type" :placeholder="placeholder" class="grow roboto outline-none"
        :value="modelValue" @input="emit('update:modelValue', $event.target.value)" />
    </label>
  </label>
</template>

<script setup>
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