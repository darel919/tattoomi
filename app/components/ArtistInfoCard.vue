<template>
  <div class="my-8">
    <div v-if="error" class="text-center text-lg py-12">
      We're having trouble fetching the available artist. Please try again in a while.
    </div>
    <div v-else-if="!item || item.length === 0" class="text-center text-lg text-gray-500 py-12">
      There are no artists available.
    </div>
    <div v-else class="artist-grid gap-6">
      <ClientOnly>
        <div v-for="person in item" :key="person.artistId" class="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
          <div class="h-44 bg-base-200 relative group rounded-t-2xl overflow-hidden" tabindex="0">
            <img v-if="person.profileImage" :src="person.profileImage" alt="photo" class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 group-focus-within:scale-105 block transform-gpu will-change-transform" />
            <img v-else src="~/assets/images/sample_card.png" title="This is a sample photo." alt="photo" class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 group-focus-within:scale-105 block transform-gpu will-change-transform" />
            <div class="absolute inset-0 flex items-center justify-center flex-col gap-3 pointer-events-none">
              <div aria-hidden="true" class="absolute inset-0 z-0 bg-black/50 pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"></div>
              <NuxtLink :to="`/artist/${person.artistId}`" class="relative z-10 pointer-events-auto px-6 py-2 rounded-full border border-white text-white bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-focus-within:translate-y-0" aria-label="View profile">View Profile</NuxtLink>
              <button type="button" class="relative z-10 pointer-events-auto px-6 py-2 rounded-full bg-amber-400 text-black font-semibold hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-focus-within:translate-y-0" aria-label="Send request">Send Request</button>
            </div>
          </div>
          <div class="p-4">
            <div class="flex items-center mb-3">
              <div v-if="displayName(person)" class="w-12 h-12 rounded-full bg-base-100 flex items-center justify-center mr-3 text-sm font-semibold text-base-content">
                {{ initials(displayName(person)) }}
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div>
                    <section class="flex items-center gap-1 my-1">
                      <div v-if="displayName(person)" class="text-sm font-semibold text-base-content mr-1">{{ displayName(person) }}</div>
                      <section class="mt-1 gap-1 flex flex-row items-center">
                        <div v-if="person.isVerified">
                          <div class="inline-flex items-center" tabindex="0" @mouseenter="openTooltip($event, 'This artist has been verified by Tattoomii team.')" @mouseleave="closeTooltip" @focus="openTooltip($event, 'This artist has been verified by Tattoomii team.')" @blur="closeTooltip" aria-describedby="artist-tooltip">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0291F0" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-check-icon lucide-badge-check w-6 h-6"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
                          </div>
                        </div>
                      </section>
                    </section>
                    <div class="text-xs text-base-content/60 flex items-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-accent mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.456 2.716c-.784.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.547 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" /></svg>
                      <span class="mr-2">{{ getRating(person) }}</span>
                      <span v-if="getStudioCity(person) && getStudioState(person)" class="text-xs text-base-content/50 mr-2">•</span>
                      <span v-if="getStudioCity(person) && getStudioState(person)" class="text-xs text-base-content/60">{{ getStudioCity(person) }}, {{ getStudioState(person) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-3 flex flex-nowrap gap-2 items-center overflow-hidden" ref="categoriesContainer">
              <template v-for="(spec, idx) in getVisibleStyles(person.styles || []).visible" :key="idx">
                <span class="text-xs px-4 py-1 bg-base-200 text-base-content rounded-full flex-shrink-0">{{ spec }}</span>
              </template>
              <template v-if="getVisibleStyles(person.styles || []).hidden.length > 0">
                <div>
                  <button
                    type="button"
                    class="text-xs px-4 py-1 bg-base-200 text-base-content rounded-full flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-accent"
                    :aria-label="`Show ${getVisibleStyles(person.styles || []).hidden.length} more styles: ${getVisibleStyles(person.styles || []).hidden.join(', ')}`"
                    @mouseenter="openTooltip($event, getVisibleStyles(person.styles || []).hidden.join(', '))"
                    @mouseleave="closeTooltip"
                    @focus="openTooltip($event, getVisibleStyles(person.styles || []).hidden.join(', '))"
                    @blur="closeTooltip"
                  >
                    +{{ getVisibleStyles(person.styles || []).hidden.length }}
                  </button>
                </div>
              </template>
            </div>
            <ul class="text-sm text-base-content/70 space-y-1">
              <li v-if="person.spoken_lang" class="flex items-center">
                <Languages :size="16" class="mr-2" />
                {{ formatLangs(person.spoken_lang) }}
              </li>
              <li v-if="person.years_experience && person.years_experience > 0" class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase-icon lucide-briefcase h-4 w-4 mr-2"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
                {{ person.years_experience }} yrs experience
              </li>
              <li v-if="person.waitTime" class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock2-icon lucide-clock-2 h-4 w-4 mr-2"><path d="M12 6v6l4-2"/><circle cx="12" cy="12" r="10"/></svg>
                {{ waitingLabel(person.waitTime) }} wait
              </li>
              <li v-if="person.rate" class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign h-4 w-4 mr-2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
                <span class="tracking-wide">{{ priceSymbols(person.rate) }}</span>
              </li>
            </ul>
          </div>
        </div>
        <template #fallback>
          <div class="bg-base-100 rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div class="h-44 bg-base-200 rounded-t-2xl"></div>
            <div class="p-4">
              <div class="flex items-center mb-3">
                <div class="w-12 h-12 rounded-full bg-base-200 mr-3"></div>
                <div class="flex-1">
                  <div class="h-4 bg-base-200 rounded mb-2"></div>
                  <div class="h-3 bg-base-200 rounded w-3/4"></div>
                </div>
              </div>
              <div class="flex gap-2 mb-3">
                <div class="h-6 bg-base-200 rounded-full w-16"></div>
                <div class="h-6 bg-base-200 rounded-full w-20"></div>
              </div>
              <div class="space-y-2">
                <div class="h-4 bg-base-200 rounded"></div>
                <div class="h-4 bg-base-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </template>
      </ClientOnly>
    </div>
    <teleport to="body">
      <transition name="fade">
        <!-- Transition requires an element root; keep a stable wrapper so SSR renders an element and ClientOnly can populate tooltip on client -->
        <div class="tooltip-wrapper" aria-hidden="true">
          <ClientOnly>
            <div v-if="tooltip.show" class="fixed z-50 pointer-events-none" :style="tooltip.style">
              <div class="bg-black text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                {{ tooltip.text }}
              </div>
            </div>
          </ClientOnly>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { Languages } from 'lucide-vue-next'

const props = defineProps({
  item: {
    type: Array,
    default: () => []
  },
  error: {
    type: Boolean,
    default: false
  }
})
const { item = [], error = false } = props

const tooltip = ref({
  show: false,
  x: 0,
  y: 0,
  text: '',
  style: {}
})

const categoriesContainer = ref(null)
const categoriesWidth = ref(0)

function updateCategoriesWidth() {
  if (!categoriesContainer.value) return
  categoriesWidth.value = categoriesContainer.value.clientWidth || 0
}

let resizeTimer = null
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    updateCategoriesWidth()
  }, 120)
}

onMounted(() => {
  nextTick(() => {
    updateCategoriesWidth()
  })
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', onResize)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', onResize)
  }
  clearTimeout(resizeTimer)
})

function measureText(text) {
  return Math.max(20, text.length * 7)
}

function getVisibleStyles(styles) {
  if (!styles || styles.length === 0) return { visible: [], hidden: [] }
  const badgePadding = 32
  const gap = 8 
  let totalWidth = 0
  let visibleCount = 0
  const available = categoriesWidth.value || 318
  for (let i = 0; i < styles.length; i++) {
    const textWidth = measureText(styles[i])
    const badgeWidth = textWidth + badgePadding
    if (i > 0) totalWidth += gap
    if (totalWidth + badgeWidth > available) break
    totalWidth += badgeWidth
    visibleCount++
  }
  return {
    visible: styles.slice(0, visibleCount),
    hidden: styles.slice(visibleCount)
  }
}

function initials(name = '') {
  return String(name).split(' ').map(s => s[0] || '').slice(0, 2).join('').toUpperCase()
}

function openTooltip(ev, text) {
  const target = ev.currentTarget
  if (!target) return
  const rect = target.getBoundingClientRect()
  let x = rect.left + rect.width / 2
  let y = rect.bottom + 8
  const padding = 8
  const viewportWidth = (typeof window !== 'undefined') ? window.innerWidth : 1024
  x = Math.min(Math.max(x, padding + 40), viewportWidth - padding - 40)
  const viewportHeight = (typeof window !== 'undefined') ? window.innerHeight : 800
  const preferAbove = rect.bottom + 8 + 40 > viewportHeight
  if (preferAbove) {
    y = rect.top - 8 - 40
  }
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

function parseYears(bio) {
  const match = bio.match(/(\d+)\+?\s*years?/i)
  return match ? parseInt(match[1]) : '-'
}

function waitingLabel(days = 0) {
  // days can be number or string/nullable
  if (days == null) return 'No waiting time'
  const n = Number(days)
  if (Number.isNaN(n) || n <= 0) return 'No waiting time'
  if (n === 1) return '1 day'
  if (n <= 7) return `${n} days`
  // for >7 days, convert to weeks with remainder
  const weeks = Math.floor(n / 7)
  const rem = n % 7
  return rem === 0 ? `${weeks} week${weeks > 1 ? 's' : ''}` : `${weeks} week${weeks > 1 ? 's' : ''} ${rem} day${rem > 1 ? 's' : ''}`
}

function priceSymbols(rate = '') {
  const n = parseInt(rate)
  return '$'.repeat(Math.max(1, Math.floor(n / 50)))
}

function formatLangs(langs = []) {
  if (!Array.isArray(langs) || langs.length === 0) return '-'
  // spokenLanguage may be an array of strings (['German']) or objects ([{label:'German', value:'German'}])
  try {
    return langs
      .map(l => {
        if (!l && l !== 0) return null
        if (typeof l === 'string') return l
        if (typeof l === 'object') return l.label || l.value || String(l)
        return String(l)
      })
      .filter(Boolean)
      .join(', ') || '-'
  } catch (e) {
    return '-'
  }
}

function computeYears(startYear) {
  if (startYear == null) return 'N/A'
  const n = Number(startYear)
  if (Number.isNaN(n) || n <= 0) return 'N/A'
  const diff = new Date().getFullYear() - Math.floor(n)
  return diff >= 0 ? diff : 'N/A'
}

// Helper to read display name from different API fields
function displayName(person = {}) {
  return person.fullName || person.userFullName || person.name || person.displayName || ''
}

function getStudioCity(person = {}) {
  if (person.studio) return person.studio.city || person.studioCity || person.studioAddress || ''
  return person.studioCity || ''
}

function getStudioState(person = {}) {
  if (person.studio) return person.studio.state || person.studioState || ''
  return person.studioState || ''
}

function getRating(person = {}) {
  if (person.rating != null && person.rating !== '') return person.rating
  return 0
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
  .artist-grid {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: start;
    width: 100%;
  }
  @media (min-width: 349px) {
    .artist-grid {
      grid-template-columns: repeat(auto-fit, 350px);
      justify-content: start;
      justify-items: center;
    }
    .artist-grid > * {
      max-width: 350px;
      width: 100%;
      box-sizing: border-box;
      justify-self: center;
    }
  }
  .animate-pulse {
    animation: pulse 1.5s cubic-bezier(.4,0,.6,1) infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .5; }
  }
</style>