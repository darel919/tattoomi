<template>
  <div>
    <div class="grid gap-6" style="grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));">
      <div v-for="person in item" :key="person.id" class="bg-base-200 rounded-2xl shadow-md overflow-hidden">
        <div class="h-44 bg-base-200 relative">
          <img v-if="person.image" :src="person.image" alt="photo" class="w-full h-full object-cover" />
          <!-- FAILOVER ELEMENT IF NO IMAGE IS PRESENT ON PROP VALUE! DELETE ON PROD! -->
          <img v-else src="~/assets/images/sample_card.png" title="This is a sample photo." alt="photo" class="w-full h-full object-cover" />
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
            <span v-for="cat in (person.category || []).slice(0,3)" :key="cat.cat_id" class="text-xs px-4 py-1 bg-base-200 text-base-content rounded-full">{{ cat.cat_name }}</span>
          </div>

          <ul class="text-sm text-base-content/70 space-y-1">
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user h-4 w-4 mr-2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {{ formatLangs(person.lang) }}
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase-icon lucide-briefcase h-4 w-4 mr-2"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
              {{ person.years_experience }} yrs experience
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock2-icon lucide-clock-2 h-4 w-4 mr-2"><path d="M12 6v6l4-2"/><circle cx="12" cy="12" r="10"/></svg>
              {{ waitingLabel(person.waitingTime) }}
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign h-4 w-4 mr-2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
              <span class="tracking-wide">
                {{ priceSymbols(person.price) }}
              </span>
            </li>
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
