<template>
  <ClientOnly>
    <div class="w-full h-full flex items-center justify-center p-0">
      <div class="w-full h-full">
        <div :class="`flex flex-row w-full h-full rounded-lg shadow-sm p-0`">
          <div class="flex flex-col items-center justify-center w-full text-center gap-4 py-8 px-6">
            <CloudAlert :size="128" v-if="state === 'error'"/>
            <div class="max-w-3xl mx-auto">
              <h2 class="text-lg md:text-2xl font-semibold mb-2">{{ title }}</h2>
              <p v-if="recommendations" class="text-sm md:text-base text-gray-700 mb-4 break-words">{{ recommendations }}</p>
              <p v-if="details" class="text-xs text-muted-foreground mb-0 break-words">{{ details }}</p>
            </div>
            
            <div>
              <button @click="$emit('retry')" class="btn btn-primary bg-hero rounded-full px-6 py-2 text-black">Retry</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { CloudAlert } from "lucide-vue-next"
const props = defineProps({
  state: {
    type: String,
    default: 'error',
    validator: (value) => ['warning', 'error', 'fatal'].includes(value)
  },
  title: {
    type: String,
    default: 'An error occurred'
  },
  details: {
    type: String,
    default: 'Sorry, something went wrong. Please try again later.'
  },
  recommendations: {
  type: String,
  default: 'Please try again in a little while'
  }
})
</script>

<style>

</style>