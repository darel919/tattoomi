<template>
  <div class="mx-12 my-8">
    <section v-if="viewMode === 'list'">
      <p v-if="!isSearch">{{ isSearch ? `Search results for "${searchQuery}" (${searchType})` : 'All Artists' }}</p>
      <h1 class="text-3xl font-bold">{{ searchQuery ? `Find the perfect Tattoo Artist for your idea` : 'Find the perfect Tattoo Artist for your idea' }}</h1>
    </section>
    <section v-if="styles.length > 0"  class="mt-7 mb-16 relative">
      <div class="border border-secondary-400 rounded-2xl px-5 py-2 shadow-md flex gap-4 justify-between items-center">
        <div class="flex flex-col justify-center items-center gap-4">
          <div class="grow bg-base-200 rounded-2xl px-2 py-2">
            <div ref="styleGrid" class="grid grid-cols-8 w-full gap-4 overflow-hidden style-grid"
              :class="{ 'collapsed': modeStyle == 'less' }">
              <button @click="handleToggleSelectedStyle(style)"
                class="flex flex-col items-center gap-1 text-secondary-90 dark:text-white px-2 py-1.5 cursor-pointer"
                :class="{ 'border border-primary-yellow rounded-2xl bg-primary-yellow/10': selectedStyles.includes(style) }"
                v-for="(style, index) in styles" :key="style">
                <p class="text-xs text-center">{{ style }}</p>
              </button>
            </div>
          </div>
        </div>
        <button v-if="styles.length > 0" @click="handleToggleModeStyle" type="button"
          class="btn border border-secondary-90 rounded-full font-medium px-2.5 py-1.5 text-sm flex justify-center items-center gap-1.5">
          <template v-if="modeStyle === 'more'">
            <ArrowUp :size="20" />
            view less
          </template>
          <template v-else>
            <ArrowDown :size="20" />
            view more
          </template>
        </button>
        <button @click="handleToggleFilter" type="button"
          class="btn border border-secondary-90 rounded-full font-medium px-2.5 py-1.5 text-sm flex justify-center items-center gap-1.5">
          <ListFilter :size="20" />
          filters
        </button>
      </div>
      <Transition>
        <div v-if="filterIsOpen"
          class="z-[999] absolute bg-white p-4 bottom-0 right-0 translate-y-full rounded-2xl shadow-md ">
          <h3 class="text-dark-100 font-bold text-xl">Filters</h3>
          <div class="divider before:bg-secondary-400 after:bg-secondary-400 py-4"></div>
          <div class="flex gap-6">
            <div class="flex flex-col gap-4 w-[14.625rem]">
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Budget
                </label>
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <div class="flex gap-2 items-center" v-for="item in budgets">
                    <input type="radio" class="radio checked:bg-dark-100 checked:text-white" />
                    <p class="text-sm font-medium text-secondary-200">{{ item }}</p>
                  </div>
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Sex
                </label>
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <div class="flex gap-2 items-center" v-for="item in sexs">
                    <input type="radio" class="radio checked:bg-dark-100 checked:text-white" />
                    <p class="text-sm font-medium text-secondary-200">{{ item }}</p>
                  </div>
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Language
                </label>
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <div class="flex gap-2 items-center" v-for="item in languages">
                    <input type="radio" class="radio checked:bg-dark-100 checked:text-white" />
                    <p class="text-sm font-medium text-secondary-200">{{ item }}</p>
                  </div>
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Colours
                </label>
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <div class="flex gap-2 items-center" v-for="item in colours">
                    <input type="radio" class="radio checked:bg-dark-100 checked:text-white" />
                    <p class="text-sm font-medium text-secondary-200">{{ item }}</p>
                  </div>
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Hygiene Certificate
                </label>
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <div class="flex gap-2 items-center" v-for="item in hygieneCertificate">
                    <input type="radio" class="radio checked:bg-dark-100 checked:text-white" />
                    <p class="text-sm font-medium text-secondary-200">{{ item }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="divider lg:divider-horizontal before:bg-secondary-400 after:bg-secondary-400"></div>
            <div class="flex flex-col gap-4 w-[14.625rem]">
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Min. Rating
                </label>
                <div class="mt-2">
                  <InputSlider />
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Min. Price
                </label>
                <div class="mt-2">
                  <InputSlider />
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Min. Experience
                </label>
                <div class="mt-2">
                  <InputStep />
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Avg. waiting time (weeks)
                </label>
                <div class="mt-2">
                  <InputSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </section>
    <ArtistInfoCard v-if="!pending && viewMode === 'list'" :item="artists" :error="!!error" />
    <div v-if="pending" class="artist-grid gap-6">
      <div v-for="n in 4" :key="n" class="bg-base-100 rounded-2xl shadow-lg overflow-hidden animate-pulse">
        <div class="h-44 bg-base-200 rounded-t-2xl"></div>
        <div class="p-4">
          <div class="w-12 h-12 rounded-full bg-base-300 mb-3"></div>
          <div class="h-4 bg-base-300 rounded w-1/2 mb-2"></div>
          <div class="h-3 bg-base-200 rounded w-1/3 mb-2"></div>
          <div class="h-3 bg-base-200 rounded w-1/4 mb-2"></div>
          <div class="h-3 bg-base-200 rounded w-1/2 mb-2"></div>
        </div>
      </div>
    </div>
    <ArtistMapView v-if="viewMode === 'map' && artists.length > 0" :artists="artists" :is-loading="pending" :error="error?.message" />
    <div v-if="viewMode === 'map' && !pending && artists.length === 0" class="h-[70vh] w-full -mt-10 mb-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
      <div class="text-center">
        <div class="text-gray-600 dark:text-gray-400 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
          </svg>
        </div>
        <p class="text-lg text-gray-600 dark:text-gray-400">There are no locations found with your query</p>
      </div>
    </div>
    <section class="my-4">
      <button v-if="viewMode === 'list'" @click="switchToMapView"
        class="flex flex-row items-center gap-1 bg-hero text-black rounded-full px-6 py-4 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-map-icon lucide-map mr-2">
          <path
            d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
          <path d="M15 5.764v15" />
          <path d="M9 3.236v15" />
        </svg>
        <p class="font-bold">Go to Map View</p>
      </button>
      <button v-if="viewMode === 'map'" @click="switchToListView"
        class="flex flex-row items-center gap-1 bg-hero text-black rounded-full px-6 py-4 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-map-icon lucide-map mr-2">
          <path
            d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
          <path d="M15 5.764v15" />
          <path d="M9 3.236v15" />
        </svg>
        <p class="font-bold">Go to Card View</p>
      </button>
    </section>
  </div>
</template>

<script setup>
import { ArrowDown, ArrowUp, ListFilter } from 'lucide-vue-next';
import { useRoute, useRouter } from 'vue-router'

const modeStyle = ref('less');
const selectedStyles = reactive([]);
const config = useRuntimeConfig()
const stylesEndpoint = `${config.public.baseURL}/api/user/styleGuide`
const { data: stylesData } = await useAsyncData('styles', () => $fetch(stylesEndpoint, { method: 'POST', body: {} }))
const styles = computed(() => stylesData.value?.styleGuide?.map(item => item.styleName) || [])

const handleToggleSelectedStyle = (style) => {
  if (selectedStyles.includes(style)) {
    selectedStyles.splice(selectedStyles.indexOf(style), 1);
  } else {
    selectedStyles.push(style);
  }
  const newQuery = { ...route.query }
  if (selectedStyles.length > 0) {
    newQuery.style = selectedStyles.join(',')
  } else {
    delete newQuery.style
  }
  delete newQuery.filter
  delete newQuery.styles
  router.replace({ query: newQuery })
}

const styleGrid = ref(null)

const handleToggleModeStyle = async () => {
  const el = styleGrid.value
  const collapsedHeight = 70
  if (!el) {
    modeStyle.value = modeStyle.value === 'less' ? 'more' : 'less'
    return
  }
  await nextTick()
  const fullHeight = el.scrollHeight
  el.style.transition = 'height 350ms ease-in-out'

  if (modeStyle.value === 'less') {
    el.style.height = `${collapsedHeight}px`
    el.getBoundingClientRect()
    el.style.height = `${fullHeight}px`
    modeStyle.value = 'more'
    setTimeout(() => { el.style.height = '' }, 360)
  } else {
    el.style.height = `${el.scrollHeight}px`
    el.getBoundingClientRect()
    el.style.height = `${collapsedHeight}px`
    modeStyle.value = 'less'
    setTimeout(() => { el.style.height = '' }, 360)
  }
}

const viewMode = ref('list');
const route = useRoute()
const router = useRouter()
const searchQuery = computed(() => {
  const q = route.query.q
  return q == null ? '' : String(q)
})
const searchType = computed(() => {
  const t = route.query.type
  return t == null ? '' : String(t)
})
const mapViewParam = computed(() => {
  const m = route.query.mapView
  return m == null ? '' : String(m)
})

if (mapViewParam.value === 'true') {
  viewMode.value = 'map'
}
if (route.query.style) {
  const s = String(route.query.style)
  selectedStyles.splice(0, selectedStyles.length, ...s.split(',').filter(Boolean))
} else if (route.query.styles) {
  const s = String(route.query.styles)
  selectedStyles.splice(0, selectedStyles.length, ...s.split(',').filter(Boolean))
}
const apiEndpoint = computed(() => {
  if (searchQuery.value && searchType.value) {
    return `${config.public.baseURL}/api/search?q=${encodeURIComponent(searchQuery.value)}&type=${encodeURIComponent(searchType.value)}`
  }
  return `${config.public.baseURL}/api/artist/artistsFinder`
})

const fetchArtists = () => {
  if (searchQuery.value && searchType.value) {
    return $fetch(apiEndpoint.value)
  }
  const q = route.query || {}
  const budgetMapping = {
    basic: { min: 0, max: 100 },
    standard: { min: 100, max: 400 },
    premium: { min: 400, max: 99999 }
  }

  const body = {
    description: q.q ? String(q.q) : '',
    styles: [],
    color: q.color ? String(q.color) : undefined,
    placement: q.placement ? String(q.placement) : undefined
  }
  if (q.city || q.location) {
    body.location = q.city ? String(q.city) : String(q.location)
  }
  if (q.radius) {
    body.radius = Number(q.radius)
  }

  if (q.minPrice) {
    const min = Number(q.minPrice) || 1
    body.budget = { min, max: Math.max(min, min * 4) }
  }
  if (selectedStyles.length > 0) {
    body.styles = selectedStyles.slice()
  } else if (q.styles) {
    body.styles = String(q.styles).split(',').filter(Boolean)
  } else if (q.style) {
    body.styles = [String(q.style)]
  }

  return $fetch(apiEndpoint.value, { method: 'POST', body })
}

const { data: apiResponse, pending, error, refresh } = await useAsyncData(
  computed(() => {
    const q = route.query || {}
    const keyParts = [
      searchQuery.value,
      searchType.value,
      selectedStyles.join(','),
      q.style || q.styles || '',
      q.minPrice || '',
      q.city || '',
      q.color || '',
      q.placement || '',
      q.budget || ''
    ]
    return `artists-${keyParts.join('-')}`
  }),
  fetchArtists
)

const artists = computed(() => {
  if (!apiResponse || !apiResponse.value) return []
  return apiResponse.value.data || []
})

const isSearch = computed(() => !!(searchQuery.value && searchType.value))

const filterIsOpen = ref(false);
const budgets = ['Small', 'Medium', 'Large'];
const sexs = ['Female', 'Male', 'Non-Binary', 'Other'];
const languages = ['German', 'English', 'Italian', 'French'];
const colours = ['Blank n Grey', 'Colour', 'Blank n Grey with Color'];
const hygieneCertificate = ['Yes', 'No'];

const handleToggleFilter = () => {
  filterIsOpen.value = !filterIsOpen.value;
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const switchToMapView = () => {
  viewMode.value = 'map'
  scrollToTop()
  const newQuery = { ...route.query, mapView: 'true' }
  router.replace({ query: newQuery })
}

const switchToListView = () => {
  viewMode.value = 'list'
  scrollToTop()
  const newQuery = { ...route.query }
  delete newQuery.mapView
  router.replace({ query: newQuery })
}

watch(() => route.query, (newQuery) => {
  if (newQuery.mapView === 'true') {
    viewMode.value = 'map'
  } else {
    viewMode.value = 'list'
  }
  if (newQuery.style) {
    selectedStyles.splice(0, selectedStyles.length, ...String(newQuery.style).split(',').filter(Boolean))
  } else if (newQuery.styles) {
    selectedStyles.splice(0, selectedStyles.length, ...String(newQuery.styles).split(',').filter(Boolean))
  } else {
    selectedStyles.splice(0)
  }
})

useHead({
  title: computed(() => {
    if (searchQuery.value && searchType.value) {
      return `Search: ${searchQuery.value} (${searchType.value}) | tattooMii`
    }
    return 'Home | tattooMii'
  })
})

watch(() => route.query.mapView, (newMapView) => {
  if (newMapView === 'true') {
    viewMode.value = 'map'
  } else {
    viewMode.value = 'list'
  }
})

watch([searchQuery, searchType, selectedStyles], async () => {
  try {
    await refresh()
  } catch (e) {
    // ignore - error will be handled by `error` from useAsyncData
  }
})
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* Smooth expand/collapse for styles */
.style-grid {
  transition: height 350ms ease-in-out, opacity 200ms ease-in-out;
  height: auto;
  opacity: 1;
  overflow: hidden;
}
.style-grid.collapsed {
  opacity: 0.95;
  height: 70px;
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
