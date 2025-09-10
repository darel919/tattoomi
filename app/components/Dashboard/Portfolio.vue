<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-semibold">Portfolio</h2>
      <button v-if="!props.readonly" onclick="modal_edit_portfolio.show()"
        class="btn btn-outline border-primary-yellow rounded-full btn-sm font-medium flex gap-2 justify-center items-center hover:bg-primary-yellow">
        Add or Edit Portfolio
        <Pencil :size="20" />
      </button>
    </div>

    <div v-if="props.data.length === 0 && !props.readonly" class="text-center py-8">
      <div class="text-secondary-200 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 class="text-lg font-semibold mb-2">No Portfolio Yet</h3>
        <p class="text-sm">Showcase your work by uploading your portfolio images</p>
      </div>
    </div>

    <div class="flex gap-5 mb-10">
      <div class="grow grid grid-cols-3 gap-5">
        <div v-for="(work, index) in portfolioData.slice(0, 3)" :key="work.workId"
          class="rounded-lg bg-secondary-350 h-[40rem] overflow-hidden relative">
          <img v-if="work.imageUrl" :src="work.imageUrl" :alt="work.title" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center text-secondary-200">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <!-- <p class="text-sm">No image uploaded</p> -->
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4 min-w-[7.75rem]">
        <div v-for="(work, index) in portfolioData.slice(3, 7)" :key="work.workId"
          class="rounded-lg bg-secondary-350 h-[8.75rem] overflow-hidden relative">
          <img v-if="work.imageUrl" :src="work.imageUrl" :alt="work.title" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center text-secondary-200">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-xs">No image</p>
            </div>
          </div>
        </div>

        <button onclick="modal_view_all_portfolio.show()"
          class="btn btn-outline border-primary-yellow rounded-full btn-sm font-medium mt-2 hover:bg-primary-yellow">View
          All
        </button>
      </div>
    </div>
    <ModalViewAllPortfolio />
    <ModalEditPortfolio />
  </div>
</template>

<script setup>
import { Pencil } from 'lucide-vue-next';

const props = defineProps({
  data: { type: Array, default: () => [] },
  readonly: { type: Boolean, default: false },
})

// Create empty portfolio placeholders
const emptyPortfolio = [
  { workId: 'empty-1', imageUrl: null, title: 'Empty slot 1' },
  { workId: 'empty-2', imageUrl: null, title: 'Empty slot 2' },
  { workId: 'empty-3', imageUrl: null, title: 'Empty slot 3' },
  { workId: 'empty-4', imageUrl: null, title: 'Empty slot 4' },
  { workId: 'empty-5', imageUrl: null, title: 'Empty slot 5' },
  { workId: 'empty-6', imageUrl: null, title: 'Empty slot 6' },
  { workId: 'empty-7', imageUrl: null, title: 'Empty slot 7' }
]

// Use actual data if available, otherwise use empty placeholders
const portfolioData = computed(() => {
  if (props.data && props.data.length > 0) {
    return props.data
  }
  return emptyPortfolio
})
</script>
