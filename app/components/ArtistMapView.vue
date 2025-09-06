<template>
    <ClientOnly>
        <div class="h-[70vh] w-full rounded-xl -mt-8 mb-8 overflow-hidden">
            <LMap ref="map" :useGlobalLeaflet="false" @ready="onMapReady">
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
            </LMap>
        </div>
    </ClientOnly>
</template>

<script setup>
const map = ref(null);
const colorMode = useColorMode();
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
    updateTheme()
})
const onMapReady = (mapInstance) => {
    map.value = mapInstance
    mapInstance.setView(
        [47.2228, 8.3228], // latitude, longitude
        17
    )
    updateTheme()
}
</script>