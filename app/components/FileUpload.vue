<template>
  <div class="space-y-2 w-full">
    <label for="file-upload"
      class="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer border-secondary-300 hover:border-primary-yellow">
      <Upload :size="48" class="w-4 h-4 text-secondary-200 mb-2" />
      <span class="text-gray-500 text-sm">JPG, PNG & PDF</span>
      <span class="text-secondary-200 text-xs">(max size 20MB)</span>
      <input id="file-upload" type="file" accept=".jpg,.jpeg,.png,.pdf" class="hidden" @change="handleFileUpload" />
    </label>

    <p class="text-xs text-secondary-250">
      * Maximum Upload Size is 20MB
    </p>

    <img v-if="file && file.type.startsWith('image/') && previewUrl" :src="previewUrl" alt="Preview"
      class="mx-auto rounded-lg" />
    <div v-else-if="file && file.type === 'application/pdf' && previewUrl" class="flex flex-col items-center space-y-2">
      <iframe :src="previewUrl" class="w-full h-60 border rounded"></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Upload } from "lucide-vue-next"

const file = ref(null)
const previewUrl = ref(null)

function handleFileUpload(event) {
  const input = event.target;
  if (input.files && input.files.length > 0) {
    file.value = input.files[0];

    // create preview for images and pdfs
    const type = file.value.type
    if (type.startsWith("image/")) {
      previewUrl.value = URL.createObjectURL(file.value);
    } else if (type === "application/pdf") {
      previewUrl.value = URL.createObjectURL(file.value);
    } else {
      previewUrl.value = null
    }
  }
}

</script>