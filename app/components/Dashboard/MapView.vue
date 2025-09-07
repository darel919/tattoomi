<template>
    <ClientOnly>
        <div v-if="location?.lat && location?.lng" class="card bg-base-100 shadow-xl">
            <div class="px-4 py-4">
                <p v-if="address" class="text-sm">📍 {{ address }}</p>
                <p v-else-if="isLoadingAddress" class="text-sm">Loading address...</p>
            </div>
            <div class="h-[400px] w-full rounded-xl overflow-hidden">
                <LMap ref="map" :useGlobalLeaflet="false" @ready="onMapReady">
                    <LTileLayer :key="isDark" :url="isDark
                        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'"
                        :attribution="isDark
                            ? `&copy; <a href='https://carto.com/attributions'>CARTO</a> &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>`
                            : `&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`" layer-type="base"
                        :name="isDark ? 'Dark Map' : 'Light Map'">
                    </LTileLayer>
                    <LMarker :lat-lng="[location.lat, location.lng]">
                        <LPopup>The location is here!</LPopup>
                    </LMarker>
                </LMap>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
/**
 * DashboardMapView Component
 *
 * A Component that displays an interactive map with a marker at a specified location.
 * The component automatically fetches and displays the address for the given coordinates
 * and supports both light and dark themes.
 *
 * @example
 * <DashboardMapView :location="{ lat: 37.7749, lng: -122.4194 }" />
 *
 * @typedef {Object} Location
 * @property {number} lat - Latitude coordinate
 * @property {number} lng - Longitude coordinate
 */

const props = defineProps({
    /**
     * The geographic location to display on the map
     * @type {Location}
     * @required
     */
    location: {
        type: Object,
        required: true,
        validator: (value) => {
            return value && typeof value.lat === 'number' && typeof value.lng === 'number'
        }
    }
})

const map = ref(null)
const colorMode = useColorMode()
const isDark = ref(false)

const updateTheme = () => {
    isDark.value = colorMode.value === 'dark'
    if (map.value) {
        const mapEl = map.value.getContainer()
        if (colorMode.value === 'dark') {
            mapEl.style.backgroundColor = '#242424'
            mapEl.style.color = '#fff'
        } else {
            mapEl.style.backgroundColor = '#fff'
            mapEl.style.color = '#222'
        }
    }
}

watch(colorMode, updateTheme, { immediate: true })

onMounted(() => {
    if (!props.location) return console.warn('[DashboardMapView] Component is mounted, but "location" prop data is not defined. "location" is required for DashboardMapView!')
    updateTheme()
    getAddress(props.location.lat, props.location.lng)
})

const address = ref('')
const isLoadingAddress = ref(false)
const lastCoordinates = ref({ lat: null, lng: null })

const getAddress = async (lat, lng) => {
    isLoadingAddress.value = true
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        )
        const data = await response.json()
        address.value = data.display_name
        lastCoordinates.value = { lat, lng }
    } catch (error) {
        console.error('Error fetching address:', error)
        address.value = 'Unable to fetch address'
    } finally {
        isLoadingAddress.value = false
    }
}

const onMapReady = (mapInstance) => {
    map.value = mapInstance
    mapInstance.setView(
        [props.location.lat, props.location.lng],
        17
    )
    updateTheme()
}
</script>

<style scoped>
.leaflet-container {
    height: 100%;
    width: 100%;
    transition: background-color 0.3s ease;
}

/* Theme-specific styles for map controls */
[data-theme='dark'] .leaflet-control-zoom,
[data-theme='dark'] .leaflet-control-attribution {
    filter: invert(1) hue-rotate(180deg);
}
</style>
