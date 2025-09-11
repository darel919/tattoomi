<template>
  <div class="mx-12 my-8">
    <section v-if="viewMode === 'list'">
      <p v-if="!isSearch">{{ isSearch ? `Search results for "${searchQuery}" (${searchType})` : 'All Artists' }}</p>
      <h1 class="text-3xl font-bold">{{ searchQuery ? `Find the perfect Tattoo Artist for your idea` : 'Find the perfect Tattoo Artist for your idea' }}</h1>
    </section>
    <section class="mt-7 mb-16 relative">
      <div class="border border-secondary-400 rounded-2xl px-5 py-2 shadow-md flex gap-4 justify-between items-center">
        <div class="flex flex-col justify-center items-center gap-4">
          <div class="grow bg-base-200 rounded-2xl px-2 py-2">
            <div ref="specialityGrid" class="grid grid-cols-8 w-full gap-4 overflow-hidden speciality-grid"
              :class="{ 'collapsed': modeSpeciality == 'less' }">
              <button @click="handleToggleSelectedSpesiciality(speciality)"
                class="flex flex-col items-center gap-1 text-secondary-90 dark:text-white px-2 py-1.5 cursor-pointer"
                :class="{ 'border border-primary-yellow rounded-2xl bg-primary-yellow/10': selectedSpecialities.includes(speciality.id) }"
                v-for="(speciality, index) in specialities" :key="index">
                <component v-if="speciality.icon" :is="speciality.icon" :size="28" />
                <p class="text-xs text-center">{{ speciality.text }}</p>
              </button>
            </div>
          </div>
          <!-- removed duplicate button; single toggle below -->
        </div>
        <button @click="handleToggleModeSpeciality" type="button"
          class="btn border border-secondary-90 rounded-full font-medium px-2.5 py-1.5 text-sm flex justify-center items-center gap-1.5">
          <template v-if="modeSpeciality === 'more'">
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
import { ArrowDown, ArrowUp, CircleParking, CirclePlus, CloudLightning, Hand, Heart, ListFilter, LockKeyhole, Pin, Rainbow, Star, TrainFront } from 'lucide-vue-next';
import CustomIconVeganColours from "@/components/CustomIcon/VeganColours";
import CustomIconSavespace from "@/components/CustomIcon/Savespace";
import CustomIconCoverups from "@/components/CustomIcon/Coverups";
import CustomIconWheelchair from "@/components/CustomIcon/Wheelchair";

import { nextTick, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const modeSpeciality = ref('less');
const selectedSpecialities = reactive([]);
const specialities = [
  {
    id: 1,
    icon: CustomIconVeganColours,
    text: 'Vegan Colours',
  },
  {
    id: 2,
    icon: CustomIconSavespace,
    text: 'Savespace',
  },
  {
    id: 3,
    icon: Rainbow,
    text: 'LGBTQ+ friendly',
  },
  {
    id: 4,
    icon: CustomIconCoverups,
    text: 'Coverups',
  },
  {
    id: 5,
    icon: LockKeyhole,
    text: 'High Privacy',
  },
  {
    id: 6,
    icon: CircleParking,
    text: 'Client Parking',
  },
  {
    id: 7,
    icon: Heart,
    text: 'Sacred Tattooing',
  },
  {
    id: 8,
    icon: Star,
    text: 'Luxury experience',
  },
  {
    id: 9,
    icon: Hand,
    text: 'Handpoke',
  },
  {
    id: 10,
    icon: CustomIconWheelchair,
    text: 'Wheelchair accessible',
  },
  {
    id: 11,
    icon: CloudLightning,
    text: 'Scar Coverups',
  },
  {
    id: 12,
    icon: Pin,
    text: 'Unique location',
  },
  {
    id: 13,
    icon: CirclePlus,
    text: 'Regular Customers Advantages',
  },
  {
    id: 14,
    icon: TrainFront,
    text: 'Well-Served by Public Transport',
  },
];

const handleToggleSelectedSpesiciality = (speciality) => {
  if (selectedSpecialities.includes(speciality.id)) {
    selectedSpecialities.splice(selectedSpecialities.indexOf(speciality.id), 1);
  } else {
    selectedSpecialities.push(speciality.id);
  }
}

const specialityGrid = ref(null)

const handleToggleModeSpeciality = async () => {
  const el = specialityGrid.value
  const collapsedHeight = 70
  if (!el) {
    modeSpeciality.value = modeSpeciality.value === 'less' ? 'more' : 'less'
    return
  }

  // Ensure DOM updated
  await nextTick()

  // Measure full height
  const fullHeight = el.scrollHeight

  // Prepare transition
  el.style.transition = 'height 350ms ease-in-out'

  if (modeSpeciality.value === 'less') {
    // expand from collapsed to full
    el.style.height = `${collapsedHeight}px`
    // force reflow
    el.getBoundingClientRect()
    el.style.height = `${fullHeight}px`
    modeSpeciality.value = 'more'
    // clear inline height after transition so content can flow naturally
    setTimeout(() => { el.style.height = '' }, 360)
  } else {
    // collapse from full to collapsed
    el.style.height = `${el.scrollHeight}px`
    el.getBoundingClientRect()
    el.style.height = `${collapsedHeight}px`
    modeSpeciality.value = 'less'
    setTimeout(() => { el.style.height = '' }, 360)
  }
}

const viewMode = ref('list');
const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

// Reactive computed query params
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

// Set initial view mode based on mapView parameter
if (mapViewParam.value === 'true') {
  viewMode.value = 'map'
}

// Compute API endpoint and provide a fetcher that chooses the correct backend
const apiEndpoint = computed(() => {
  if (searchQuery.value && searchType.value) {
    return `${config.public.baseURL}/api/search?q=${encodeURIComponent(searchQuery.value)}&type=${encodeURIComponent(searchType.value)}`
  }
  return `${config.public.baseURL}/api/artist/artistsFinder`
})

const fetchArtists = () => {
  if (searchQuery.value && searchType.value) {
    // search endpoint expects GET with query params
    return $fetch(apiEndpoint.value)
  }
  // default artists finder uses POST with empty body
  return $fetch(apiEndpoint.value, { method: 'POST', body: {} })
}

// Reactive key so Nuxt can cache per-query; also returns refresh
const { data: apiResponse, pending, error, refresh } = await useAsyncData(
  computed(() => `artists-${searchQuery.value}-${searchType.value}`),
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
  // Update URL with mapView parameter
  const newQuery = { ...route.query, mapView: 'true' }
  router.replace({ query: newQuery })
}

const switchToListView = () => {
  viewMode.value = 'list'
  scrollToTop()
  // Remove mapView parameter from URL
  const newQuery = { ...route.query }
  delete newQuery.mapView
  router.replace({ query: newQuery })
}

watch(() => route.query, (newQuery) => {
  // Update local state based on query parameter changes
  if (newQuery.mapView === 'true') {
    viewMode.value = 'map'
  } else {
    viewMode.value = 'list'
  }
})

useHead({
  title: computed(() => {
    if (searchQuery && searchType) {
      return `Search: ${searchQuery} (${searchType}) | tattooMii`
    }
    return 'Home | tattooMii'
  })
})

// Watch for query parameter changes to update view mode
watch(() => route.query.mapView, (newMapView) => {
  if (newMapView === 'true') {
    viewMode.value = 'map'
  } else {
    viewMode.value = 'list'
  }
})

// Watch for search parameter changes and refresh data
watch([searchQuery, searchType], async () => {
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
/* Smooth expand/collapse for specialties */
.speciality-grid {
  transition: height 350ms ease-in-out, opacity 200ms ease-in-out;
  height: auto;
  opacity: 1;
  overflow: hidden;
}
.speciality-grid.collapsed {
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
