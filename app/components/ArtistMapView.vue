<template>
    <ClientOnly>
        <div class="h-[70vh] w-full rounded-xl -mt-10 mb-8 overflow-hidden z-0">
            <!-- Loading State -->
            <div v-if="isLoading" class="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
                <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p class="text-gray-600 dark:text-gray-400">Loading artists...</p>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
                <div class="text-center">
                    <div class="text-red-500 mb-4">
                        <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">{{ error }}</p>
                    <button
                        @click="fetchArtists()"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>

            <!-- Map -->
            <LMap v-else ref="map" :useGlobalLeaflet="false" @ready="onMapReady">
                <LTileLayer
                    :key="isDark"
                    :url="isDark 
                        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'"
                    :attribution="isDark 
                        ? `&copy; <a href='https://carto.com/attributions'>CARTO</a> &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>`
                        : `&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`"
                    layer-type="base"
                    :name="isDark ? 'Dark Map' : 'Light Map'">
                </LTileLayer>

                <!-- Artist Markers -->
                <LMarker
                    v-for="artist in validArtists"
                    :key="artist.artistId"
                    :lat-lng="[parseFloat(artist.studioLatitude), parseFloat(artist.studioLongitude)]"
                >
                    <LPopup>
                        <div class="max-w-sm">
                            <div class="flex items-center space-x-3 mb-3">
                                <img
                                    v-if="artist.profileImage"
                                    :src="artist.profileImage"
                                    :alt="artist.userFullName || 'Artist'"
                                    class="w-12 h-12 rounded-full object-cover"
                                />
                                <div v-else class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                    <UserRound class="w-6 h-6 text-gray-600" />
                                </div>
                                <div class="m-0 p-0 gap-0 flex flex-col">
                                    <h3 class="font-bold text-lg">{{ artist.userFullName || 'Unknown Artist' }}</h3>
                                    <h3 class="text-xs">{{ artist.studioName || 'No Studio' }}</h3>
                                </div>
                            </div>

                            <div class="mb-3">
                                <p class="text-sm text-gray-700 line-clamp-3">{{ artist.bio }}</p>
                            </div>

                            <div class="space-y-2">
                                <div v-if="artist.specialties && artist.specialties.length > 0" class="flex flex-wrap gap-1">
                                    <span
                                        v-for="specialty in artist.specialties"
                                        :key="specialty"
                                        class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                    >
                                        {{ specialty }}
                                    </span>
                                </div>

                                <div class="flex items-center justify-between text-sm">
                                    <div class="flex items-center space-x-4">
                                        <div v-if="artist.rate" class="flex items-center space-x-1">
                                            <Coins class="w-4 h-4 text-green-600" />
                                            <span class="font-medium">${{ artist.rate }}</span>
                                        </div>
                                        <div v-if="artist.waitTime != null" class="flex items-center space-x-1">
                                            <Clock class="w-4 h-4 text-orange-600" />
                                            <span>{{ formatWaiting(artist.waitTime) }}</span>
                                        </div>
                                    </div>
                                    <div v-if="artist.isVerified" class="flex items-center space-x-1">
                                        <CheckCircle class="w-4 h-4 text-green-600" />
                                        <span class="text-xs text-green-600">Verified</span>
                                    </div>
                                </div>

                                <div v-if="artist.studioAddress" class="text-xs text-gray-500">
                                    <MapPin class="w-3 h-3 inline mr-1" />
                                    {{ artist.studioAddress }}, {{ artist.studioCity }}, {{ artist.studioState }}
                                </div>
                            </div>
                        </div>
                    </LPopup>
                </LMarker>
            </LMap>
        </div>
    </ClientOnly>
</template>

<script setup>
import { CheckCircle, Clock, Coins, MapPin, UserRound } from 'lucide-vue-next'

const props = defineProps({
  artists: Array,
  isLoading: Boolean,
  error: String
})

const map = ref(null)
const colorMode = useColorMode()
const isDark = ref(false)

const { artists: fetchedArtists, isLoading: fetchLoading, error: fetchError, fetchArtists } = useArtistsFinder()

// Use props data if provided, otherwise use fetched data
const artists = computed(() => props.artists || fetchedArtists.value)
const isLoading = computed(() => props.isLoading ?? fetchLoading.value)
const error = computed(() => props.error || fetchError.value)

// Filter artists with valid coordinates
const validArtists = computed(() => {
    return artists.value.filter(artist =>
        artist &&
        artist.studioLatitude &&
        artist.studioLongitude &&
        !isNaN(parseFloat(artist.studioLatitude)) &&
        !isNaN(parseFloat(artist.studioLongitude))
    )
})

const updateTheme = () => {
    isDark.value = colorMode.value === 'dark'
    if (map.value) {
        try {
            const mapEl = map.value.getContainer()
            if (colorMode.value === 'dark') {
                mapEl.style.backgroundColor = '#242424'
                mapEl.style.color = '#fff'
            } else {
                mapEl.style.backgroundColor = '#fff'
                mapEl.style.color = '#222'
            }
        } catch (error) {
            console.warn('[ArtistMapView] Error updating theme:', error)
        }
    }
}

const fitMapToMarkers = (mapInstance) => {
    if (!mapInstance || validArtists.value.length === 0) return

    try {
        const bounds = validArtists.value.map(artist => [
            parseFloat(artist.studioLatitude),
            parseFloat(artist.studioLongitude)
        ])

        if (bounds.length === 1) {
            // Single marker - center on it
            mapInstance.setView(bounds[0], 13)
        } else {
            // Multiple markers - fit bounds
            mapInstance.fitBounds(bounds, { padding: [20, 20] })
        }
    } catch (error) {
        console.warn('[ArtistMapView] Error fitting map to markers:', error)
    }
}

watch(colorMode, updateTheme, { immediate: true })

onMounted(async () => {
    updateTheme()
    // Only fetch if no artists provided via props
    if (!props.artists) {
        await fetchArtists()
    }
})

const onMapReady = (mapInstance) => {
    if (!mapInstance) return

    try {
        map.value = mapInstance
        mapInstance.getContainer().style.zIndex = '0'
        updateTheme()

        // Fit map to markers once they're loaded
        nextTick(() => {
            fitMapToMarkers(mapInstance)
        })
    } catch (error) {
        console.warn('[ArtistMapView] Error in onMapReady:', error)
    }
}

function formatWaiting(days) {
    if (days == null) return 'No waiting time'
    const n = Number(days)
    if (Number.isNaN(n) || n <= 0) return 'No waiting time'
    if (n === 1) return '1 day'
    if (n <= 7) return `${n} days`
    const weeks = Math.floor(n / 7)
    const rem = n % 7
    return rem === 0 ? `${weeks} week${weeks > 1 ? 's' : ''}` : `${weeks} week${weeks > 1 ? 's' : ''} ${rem} day${rem > 1 ? 's' : ''}`
}

// Watch for artists data changes and refit map
watch(validArtists, (newArtists) => {
    if (map.value && newArtists.length > 0) {
        try {
            fitMapToMarkers(map.value)
        } catch (error) {
            console.warn('[ArtistMapView] Error updating map with new artists:', error)
        }
    }
}, { immediate: true })
</script>