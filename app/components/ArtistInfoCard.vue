<template>
  <div>
    <div class="grid gap-6" style="grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));">
      <div v-for="person in item" :key="person.id" class="bg-base-100 rounded-2xl shadow-md overflow-hidden">
        <div class="h-44 bg-base-200 relative group" tabindex="0">
          <img v-if="person.image" :src="person.image" alt="photo" class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 group-focus-within:scale-105" />
          <!-- FAILOVER ELEMENT IF NO IMAGE IS PRESENT ON PROP VALUE! DELETE ON PROD! -->
          <img v-else src="~/assets/images/sample_card.png" title="This is a sample photo." alt="photo" class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 group-focus-within:scale-105" />
          <div class="absolute inset-0 flex items-center justify-center flex-col gap-3 pointer-events-none">
            <div aria-hidden="true" class="absolute inset-0 z-0 bg-black/50 pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"></div>
            <button
              type="button"
              class="relative z-10 pointer-events-auto px-6 py-2 rounded-full border border-white text-white bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-focus-within:translate-y-0"
              aria-label="View profile"
              @click.prevent
            >
              View Profile
            </button>

            <button
              type="button"
              class="relative z-10 pointer-events-auto px-6 py-2 rounded-full bg-amber-400 text-black font-semibold hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-focus-within:translate-y-0"
              aria-label="Send request"
              @click.prevent
            >
              Send Request
            </button>
          </div>
        </div>

        <div class="p-4">
          <div class="flex items-center mb-3">
            <div class="w-12 h-12 rounded-full bg-base-100 flex items-center justify-center mr-3 text-sm font-semibold text-base-content">
              {{ initials(person.name) }}
            </div>

            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div>
                  <section class="flex items-center gap-1 my-1">
                    <div class="text-sm font-semibold text-base-content mr-1">{{ person.name }}</div>
                    <section class="mt-1 gap-1 flex flex-row items-center">
                      <div v-if="person.verified">
                        <div
                          class="inline-flex items-center"
                          tabindex="0"
                          @mouseenter="openTooltip($event, 'This artist has been verified by Tattoomii team.')"
                          @mouseleave="closeTooltip"
                          @focus="openTooltip($event, 'This artist has been verified by Tattoomii team.')"
                          @blur="closeTooltip"
                          aria-describedby="artist-tooltip"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0291F0" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-check-icon lucide-badge-check w-6 h-6"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                      </div>
                      <div v-if="person.hygiene_cert">
                        <div
                          class="inline-flex items-center"
                          tabindex="0"
                          @mouseenter="openTooltip($event, 'This artist has uploaded a hygiene certificate')"
                          @mouseleave="closeTooltip"
                          @focus="openTooltip($event, 'This artist has uploaded a hygiene certificate')"
                          @blur="closeTooltip"
                          aria-describedby="artist-tooltip"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-plus-icon lucide-shield-plus w-5 h-5"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M9 12h6"/><path d="M12 9v6"/></svg>
                        </div>
                      </div>
                    </section>
                  </section>
                  
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

          <div class="mb-3 flex flex-wrap gap-2 items-center" ref="categoriesContainer">
            <template v-for="(cat, idx) in person.category || []" :key="cat.cat_id">
              <span
                v-if="isCategoryVisible(person.id, idx)"
                class="text-xs px-4 py-1 bg-base-200 text-base-content rounded-full"
              >
                {{ cat.cat_name }}
              </span>
            </template>
            <button
              v-if="hiddenCount(person.id) > 0"
              type="button"
              class="text-xs px-3 py-1 bg-base-200 text-base-content rounded-full border border-base-300"
              @mouseenter="openHiddenCatsTooltip($event, person)"
              @mouseleave="closeTooltip"
              @focus="openHiddenCatsTooltip($event, person)"
              @blur="closeTooltip"
              aria-haspopup="true"
              aria-expanded="tooltip.show"
            >
              +{{ hiddenCount(person.id) }}
            </button>
            <div ref="measureRoot" class="invisible absolute left-0 top-0 pointer-events-none" aria-hidden="true">
              <span v-for="cat in (person.category || [])" :key="`m-${cat.cat_id}`" class="text-xs px-4 py-1 bg-base-200 text-base-content rounded-full inline-block mr-2" ref="measureTags">{{ cat.cat_name }}</span>
            </div>
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
    <teleport to="body">
      <transition name="fade">
        <div v-if="tooltip.show" :style="tooltip.style" class="fixed z-50 max-w-xs">
          <div id="artist-tooltip" role="tooltip" class="bg-black text-white text-sm rounded px-3 py-2 shadow-lg">{{ tooltip.text }}</div>
        </div>
      </transition>
    </teleport>


</template>

<script setup>
const props = defineProps({
  item: {
    type: Array,
    default: () => []
  }
})
const { item = [] } = props

const tooltip = ref({
  show: false,
  x: 0,
  y: 0,
  text: '',
  style: {}
})

const categoriesContainer = ref(null)
const measureRoot = ref(null)
const measureTags = ref([])
const visibleCountMap = ref({})

function isCategoryVisible(personId, idx) {
  const c = visibleCountMap.value[personId]
  if (!c) return idx < 0
  return idx < c
}

function hiddenCount(personId) {
  const total = (item.find(p => p.id === personId)?.category || []).length
  const visible = visibleCountMap.value[personId] ?? total
  return Math.max(0, total - visible)
}

function openTooltip(ev, text) {
  const target = ev.currentTarget
  if (!target) return
  const rect = target.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.bottom + 8
  tooltip.value = {
    show: true,
    x,
    y,
    text,
    style: {
      left: `${x}px`,
      top: `${y}px`,
      transform: 'translate(-50%, 0)',
      whiteSpace: 'pre-line'
    }
  }
}

function closeTooltip() {
  tooltip.value.show = false
}

function initials(name = '') {
  return String(name).split(' ').map(s => s[0] || '').slice(0, 2).join('').toUpperCase()
}

function openHiddenCatsTooltip(ev, person) {
  const hidden = (person.category || []).slice((visibleCountMap.value[person.id] || 0)).map(c => `• ${c.cat_name}`).join('\n')
  openTooltip(ev, hidden || 'No hidden categories')
}

function computeVisibleCounts() {
  const containers = Array.isArray(categoriesContainer.value) ? categoriesContainer.value : [categoriesContainer.value].filter(Boolean)

  item.forEach((person, idx) => {
    const container = containers[idx]
    if (!container) {
      const card = Array.from(document.querySelectorAll('.p-4')).find(el => el.textContent.includes(person.name))
      if (!card) return
      container = card.querySelector('.mb-3.flex')
      if (!container) return
    }

    const availableWidth = container.clientWidth
    const tags = person.category || []
    let used = 0
    let visible = 0
    const plusNPill = document.createElement('span')
    plusNPill.className = 'text-xs px-3 py-1 bg-base-200 text-base-content rounded-full inline-block mr-2'
    plusNPill.style.display = 'inline-block'
    plusNPill.textContent = `+${Math.max(1, tags.length - 1)}`
    const tempRoot = document.createElement('div')
    tempRoot.style.position = 'absolute'
    tempRoot.style.visibility = 'hidden'
    tempRoot.style.height = 'auto'
    tempRoot.style.whiteSpace = 'nowrap'
    document.body.appendChild(tempRoot)

    tempRoot.appendChild(plusNPill)

    tags.forEach((t) => {
      const span = document.createElement('span')
      span.className = 'text-xs px-4 py-1 bg-base-200 text-base-content rounded-full inline-block mr-2'
      span.style.display = 'inline-block'
      span.textContent = t.cat_name
      tempRoot.appendChild(span)
      const w = span.getBoundingClientRect().width
      const gap = 8
      if (used + w + gap <= availableWidth) {
        used += w + gap
        visible += 1
      }
    })
    
    const plusNWidth = plusNPill.getBoundingClientRect().width + 8
    if (visible < tags.length && used + plusNWidth > availableWidth) {

      while (visible > 0 && used + plusNWidth > availableWidth) {
        const last = tempRoot.children[tempRoot.children.length - 1]
        if (!last) break
        const lastW = last.getBoundingClientRect().width + 8
        used -= lastW
        visible -= 1
        tempRoot.removeChild(last)
      }
    }

    document.body.removeChild(tempRoot)
    visibleCountMap.value = { ...visibleCountMap.value, [person.id]: Math.max(0, visible) }
  })
}

onMounted(() => {
  setTimeout(() => computeVisibleCounts(), 50)
  window.addEventListener('resize', computeVisibleCounts)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', computeVisibleCounts)
})

watch(() => item, () => {
  setTimeout(() => computeVisibleCounts(), 50)
}, { deep: true })

function formatLangs(langs = []) {
  return (langs || []).map(l => l.lang_name).join(', ')
}

function waitingLabel(days = 0) {
  const weeks = Math.max(1, Math.round((days || 0) / 7))
  if (weeks === 1) return '1 week wait'
  return `${weeks}-${weeks + 1} weeks wait`
}

function priceSymbols(n = 0) {
  return '$'.repeat(Math.max(0, Math.floor(n || 0)))
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 180ms ease, transform 180ms ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }
  .fade-enter-to, .fade-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
</style>