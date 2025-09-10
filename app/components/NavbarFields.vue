<template>
    <div class="w-full max-w-3xl mx-auto relative">
        <section class="rounded-full border-hero border-[1.5px] overflow-hidden my-6 p-2 flex items-center">
            <span class="inline-flex items-center rounded-full px-3 py-1 font-grift text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wand-sparkles-icon lucide-wand-sparkles h-4 w-4 mr-2"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>
                <button @click="openCalculatorModal" class="hover:text-primary-yellow transition-colors cursor-pointer">
                    Tattoo Price Calculator
                </button>
            </span>

            <span class="mx-3 w-px self-stretch -my-2 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>

            <span class="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" fill="none" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2" />
                </svg>
                <input
                    v-model="searchQuery"
                    @keydown.enter.prevent="onEnter"
                    type="text"
                    placeholder="Search"
                    class="border-none outline-none bg-transparent text-sm w-32"
                />
            </span>

            <span class="mx-3 w-px self-stretch -my-2 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>

            <!-- Dropdown: uses daisyUI-style panel layout -->
                    <div class="inline-flex items-center ml-auto relative" ref="dropdownRoot">
                        <button ref="trigger" @click="toggleDropdown" class="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <span class="select-label">{{ selectedLabel }}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <teleport to="body">
                            <transition name="fade">
                                <div v-if="open" ref="panel" :style="panelStyle" class="absolute w-72 bg-white dark:bg-gray-900 border border-hero rounded-lg shadow-lg p-4 z-50">
                                    <div class="grid gap-3">
                                        <button @click="select('Location')" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                                            <div class="text-2xl text-primary flex-shrink-0">
                                                <!-- map icon -->
                                                <Map />
                                            </div>
                                            <div>
                                                <div class="font-semibold text-gray-800 dark:text-gray-100">Location</div>
                                                <div class="text-sm text-gray-500 dark:text-gray-400">Find Artist Based on Location</div>
                                            </div>
                                        </button>

                                        <button @click="select('Artist')" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                                            <div class="text-2xl text-primary flex-shrink-0">
                                                <!-- artist icon -->
                                                <PenTool :color="black"/>
                                            </div>
                                            <div>
                                                <div class="font-semibold text-gray-800 dark:text-gray-100">Artist</div>
                                                <div class="text-sm text-gray-500 dark:text-gray-400">Search a Tattoomii Artist</div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </transition>
                        </teleport>
                    </div>
        </section>

        <div class="absolute right-0 top-full transform translate-y-2">
            <slot name="toggle" />
        </div>
    </div>
</template>

<script setup>
import {Map, PenTool} from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const open = ref(false)
const selected = ref('Location')
const searchQuery = ref('')

const selectedLabel = computed(() => selected.value)

const dropdownRoot = ref(null)
const trigger = ref(null)
const panel = ref(null)

const panelStyle = ref({ top: '0px', left: '0px' })

const computePosition = () => {
    if (!trigger.value || !panel.value) return
    const trigRect = trigger.value.getBoundingClientRect()
    const panelRect = panel.value.getBoundingClientRect()

    // Prefer placing panel below trigger; clamp within viewport horizontally
    const top = Math.min(window.innerHeight - panelRect.height - 8, trigRect.bottom + 8)
    const left = Math.min(Math.max(8, trigRect.right - panelRect.width), window.innerWidth - panelRect.width - 8)

    panelStyle.value = {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`
    }
}

const toggleDropdown = async () => {
    open.value = !open.value
    if (open.value) {
    await nextTick()
        computePosition()
    }
}

const closeDropdown = () => {
    open.value = false
}

const select = (val) => {
    selected.value = val
    closeDropdown()
}

const openCalculatorModal = () => {
    const modal = document.getElementById('modal_calculator')
    if (modal) modal.showModal()
}

const onClickOutside = (e) => {
    const target = e.target
    if (dropdownRoot.value && dropdownRoot.value.contains(target)) return
    if (panel.value && panel.value.contains(target)) return
    closeDropdown()
}

const onWindowChange = () => {
    if (!open.value) return
    computePosition()
}

const onEnter = () => {
    const q = String(searchQuery.value || '').trim()
    if (!q) return
    const type = String(selected.value || 'Location').toLowerCase()
    const query = { q, type }
    if (type === 'location') query['mapView'] = 'true'
    router.push({ path: '/', query })
}

onMounted(() => {
    document.addEventListener('click', onClickOutside)
    window.addEventListener('resize', onWindowChange)
    window.addEventListener('scroll', onWindowChange, true)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside)
    window.removeEventListener('resize', onWindowChange)
    window.removeEventListener('scroll', onWindowChange, true)
})
</script>