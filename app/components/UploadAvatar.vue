<template>
  <div class="flex flex-col items-center">
    <div class="relative mb-3">
      <div
        class="w-28 h-28 rounded-full border-2 border-dashed border-dark-100 flex items-center justify-center overflow-hidden">
        <img v-if="preview" :src="preview" alt="Profile" class="w-full h-full object-cover" />
        <div class="h-10 w-10" v-else>
          <IconsUserRound />
        </div>
      </div>

      <button type="button"
        class="absolute bottom-1 right-0.5 w-8 h-8 rounded-full bg-white border border-secondary-300 shadow-md flex items-center justify-center hover:bg-gray-100"
        @click="triggerFileInput">
        <IconsAdd />
      </button>

      <input id="avatar-input" type="file" accept="jpeg,jpg,png" class="hidden" @change="handleFileChange" />
    </div>

    <p class="text-sm text-secondary-250 roboto" v-if="preview == null">
      No Picture Yet
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const preview = ref(null)

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      preview.value = reader.result
      emit('update:modelValue', file)
    }
    reader.readAsDataURL(file)
  }
}

function triggerFileInput() {
  document.getElementById('avatar-input').click()
}
</script>