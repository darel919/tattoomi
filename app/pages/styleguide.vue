<template>
  <div class="min-h-screen bg-base-200">
    <main class="max-w-7xl mx-12 py-6">
      <div class="mt-2 mb-16">
        <p class="text-xl font-grift text-base-content mb-2">Explore different tattoo styles</p>
        <h1 class="text-4xl font-grift font-bold text-based-content">Tattoo Style Guide</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style="gap: 15.572px;">
        <div v-for="style in tattooStyles" :key="style.id" class="bg-base-100 overflow-hidden hover:shadow-xl transition-shadow duration-300" style="padding: 18.299px; border-radius: 6.156px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -2px rgba(0, 0, 0, 0.05); display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 8.305px;">
          <div class="bg-gray-100 overflow-hidden" style="width: 265.792px; height: 265.792px; max-width: 100%; aspect-ratio: 1;">
            <img
              :src="style.image"
              :alt="style.name"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="w-full" style="display: flex; flex-direction: column; gap: 8.305px;">
            <div class="flex items-center justify-between" style="width: 100%;">
              <h3 class="font-grift text-base-content font-bold" style="font-size: 18px; line-height: 28px;">{{ style.name }}</h3>
              <button class="transition-colors" style="color: #45556C;">
                <svg style="width: 14.534px; height: 14.534px; flex-shrink: 0;" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_56436_1021)">
                    <path d="M6.03868 5.57905C6.18106 5.17431 6.46209 4.83302 6.83198 4.61563C7.20188 4.39824 7.63678 4.31877 8.05966 4.39131C8.48253 4.46384 8.86609 4.68369 9.1424 5.01193C9.41871 5.34016 9.56994 5.75559 9.5693 6.18464C9.5693 7.39583 7.75251 8.00143 7.75251 8.00143M7.80106 10.4238H7.80711M13.857 7.39578C13.857 10.7404 11.1457 13.4517 7.80106 13.4517C4.45645 13.4517 1.74512 10.7404 1.74512 7.39578C1.74512 4.05118 4.45645 1.33984 7.80106 1.33984C11.1457 1.33984 13.857 4.05118 13.857 7.39578Z" stroke="#45556C" stroke-width="1.03816" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_56436_1021">
                      <rect width="14.5343" height="14.5343" fill="white" transform="translate(0.533936 0.128906)"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>

            <p class="font-roboto text-base-content" style="width: 100%; font-size: 14px; font-weight: 400; line-height: 20px;">{{ style.description }}</p>

            <div class="flex items-flex-start" style="gap: 4.153px;">
              <button class="flex items-center transition-colors hover:bg-yellow-400" style="padding: 8px 12px; gap: 6px; border-radius: 24.622px; background: #FBBF13; color: #314158; font-family: Roboto; font-size: 14px; font-weight: 500; line-height: 20px;">
                Add to calculator
              </button>
              <button type="button" @click="openModal(style)" class="flex items-center transition-colors hover:bg-yellow-50" style="padding: 8px 12px; gap: 6px; border-radius: 24.622px; color: #FBBF13; font-family: Roboto; font-size: 14px; font-weight: 500; line-height: 20px;">
                Learn more
                <svg style="width: 20.763px; height: 20.763px;" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.38 10.8123H16.4919M16.4919 10.8123L10.4359 4.75635M16.4919 10.8123L10.4359 16.8682" stroke="#FBBF13" stroke-width="2.07632" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

  <!-- mount modal component -->
  <StyleGuideDetailModal v-model="modalVisible" :styleData="selectedStyle" />

  </div>
</template>

<script setup>
useHead({
  title: 'Tattoo Style Guide | tattooMii',
  meta: [
    { name: 'description', content: 'Explore different tattoo styles including Fineline, Oldschool, Microrealistic, Watercolor, Linework, Anime, Tribal, and Blackwork.' }
  ]
})

// Tattoo styles data
const tattooStyles = [
  {
    id: 1,
    name: 'Fineline',
    description: 'Delicate, thin lines that create complex designs.',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/fe349bc25f3f04d2d7d6b27eeb57d664513ba8c0?width=532'
  },
  {
    id: 2,
    name: 'Oldschool',
    description: 'Delicate, thin lines that create complex designs.',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/166bb2218b8428501ea34a5932d8ad73dd2a72d5?width=532'
  },
  {
    id: 3,
    name: 'Microrealistic',
    description: 'Delicate, thin lines that create complex designs.',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/76f3281e92720321d6a1cce545cf0a8c4aced509?width=532'
  },
  {
    id: 4,
    name: 'Watercolor',
    description: 'Delicate, thin lines that create complex designs.',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/5eae31c5f32e41ca9dff38d4c8dd8f1c613b335b?width=532'
  },
  {
    id: 5,
    name: 'Linework',
    description: 'Delicate, thin lines that create complex designs.',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/1d2318dbafcb366b964f3da0f53d9627bd86225c?width=532'
  },
  {
    id: 6,
    name: 'Anime',
    description: 'Delicate, thin lines that create complex designs.',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/18648ba33e5c4b0e5785976d74306a7e88a93a03?width=532'
  },
  {
    id: 7,
    name: 'Tribal',
    description: 'Delicate, thin lines that create complex designs.',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/0a87d9326db0a9e0801968fcddca17fa4eb80704?width=532'
  },
  {
    id: 8,
    name: 'Blackwork',
    description: 'Delicate, thin lines that create complex designs.',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/cb200f08bd8a60e5b1da6eb089a4ed4925019d52?width=532'
  }
]
import { ref } from 'vue'
import StyleGuideDetailModal from '../components/StyleGuideDetailModal.vue'

const modalVisible = ref(false)
const selectedStyle = ref({})

function openModal(style) {
  console.log('[styleguide] openModal called, style:', style)
  selectedStyle.value = style || {}
  modalVisible.value = true
}
</script>

<style scoped>
/* Additional styles if needed - using Tailwind classes primarily */
</style>
