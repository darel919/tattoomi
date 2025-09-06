<template>
  <div>
    <ClientOnly>
      <ThemeInit />
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import 'vue-multiselect/dist/vue-multiselect.css'
</script>
