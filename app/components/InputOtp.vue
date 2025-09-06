<template>
  <div class="flex gap-2">
    <input v-for="(_, i) in inputs" :key="i" type="text" maxlength="1"
      class="w-12 h-12 text-center border border-secondary-300 rounded-md text-lg focus:outline-primary"
      v-model="inputs[i]" ref="refs" @input="handleInput($event, i)" @keydown="handleBackspace($event, i)" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  length: { type: Number, default: 6 }
})

const emit = defineEmits(['complete', 'change'])

const inputs = ref(Array(props.length).fill(''))
const refs = ref([])

function handleInput(e, index) {
  const value = e.target.value.replace(/[^0-9]/g, '')
  inputs.value[index] = value

  if (value && index < props.length - 1) {
    refs.value[index + 1].focus()
  }

  // emit changes
  emit('change', inputs.value.join(''))

  // emit complete when filled
  if (inputs.value.every((val) => val !== '')) {
    emit('complete', inputs.value.join(''))
  }
}

function handleBackspace(e, index) {
  if (e.key === 'Backspace' && !inputs.value[index] && index > 0) {
    refs.value[index - 1].focus()
  }
}

onMounted(() => {
  if (refs.value[0]) refs.value[0].focus()
})
</script>
