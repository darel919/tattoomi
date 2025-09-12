<template>
  <div>
    <ClientOnly>
      <ThemeInit />
    </ClientOnly>
    <NuxtLoadingIndicator color="#FBBF13"/>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import 'vue-multiselect/dist/vue-multiselect.css'
</script>
