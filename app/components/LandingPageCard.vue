<template>
  <div>
    <div class="grid gap-6" style="grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));">
      <div v-for="person in item" :key="person.id" class="bg-base-100 rounded-2xl shadow-md overflow-hidden">
        <div class="h-44 bg-base-200 relative">
          <!-- <img v-if="person.image" :src="person.image" alt="photo" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full bg-gradient-to-br from-base-300 to-base-200 flex items-end p-4">
            <div class="w-16 h-16 rounded-full bg-base-100/40 backdrop-blur-sm border border-base-200/30"></div>
          </div> -->
        </div>

        <div class="p-4">
          <div class="flex items-center mb-3">
            <div class="w-12 h-12 rounded-full bg-base-100 flex items-center justify-center mr-3 text-sm font-semibold text-base-content">
              {{ initials(person.name) }}
            </div>

            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-sm font-semibold text-base-content">{{ person.name }}</div>
                  <div class="text-xs text-base-content/60 flex items-center mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-accent mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.456 2.716c-.784.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.547 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                    <span class="mr-2">{{ person.rating ?? '-' }}</span>
                    <span class="text-xs text-base-content/50">•</span>
                    <span class="ml-2 text-xs text-base-content/60">{{ person.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-3 flex flex-wrap gap-2">
            <span v-for="cat in (person.category || []).slice(0,3)" :key="cat.cat_id" class="text-xs px-2 py-1 bg-base-200 text-base-content rounded-full">{{ cat.cat_name }}</span>
          </div>

          <ul class="text-sm text-base-content/70 space-y-1">
            <li class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/50 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.585 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>{{ formatLangs(person.lang) }}</li>
            <li class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/50 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 1.567-3 3.5S10.343 15 12 15s3-1.567 3-3.5S13.657 8 12 8z"/></svg>{{ person.years_experience }} yrs experience</li>
            <li class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/50 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M6 2a1 1 0 00-1 1v1H5a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3h-.001V3a1 1 0 00-1-1H6zm1 5h6v2H7V7z"/></svg>{{ waitingLabel(person.waitingTime) }}</li>
            <li class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/50 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h14a1 1 0 011 1v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3z"/></svg><span class="tracking-wide">{{ priceSymbols(person.price) }}</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  item: { type: Array as () => Array<any>, default: () => [] }
})

function initials(name = ''){
  return String(name).split(' ').map(s => s[0] || '').slice(0,2).join('').toUpperCase()
}

function formatLangs(langs:any[] = []){
  return (langs || []).map(l => l.lang_name).join(', ')
}

function waitingLabel(days = 0){
  const weeks = Math.max(1, Math.round((days || 0) / 7))
  if (weeks === 1) return '1 week wait'
  return `${weeks}-${weeks + 1} weeks wait`
}

function priceSymbols(n = 0){
  return '$'.repeat(Math.max(0, Math.floor(n || 0)))
}
</script>
