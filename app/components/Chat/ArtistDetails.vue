<template>
    <div class="max-w-xs rounded-2xl mx-auto shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden h-full">
        <div class="p-6 text-center relative">
            <div class="mx-auto w-20 h-20 rounded-full ring-4 ring-white overflow-hidden">
                <img :src="artist.avatar || 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp'" :alt="artist.name || 'Artist'" class="w-full h-full object-cover" />
            </div>
            <h3 class="mt-3 text-lg font-semibold">{{ artist.name || 'Artist' }}</h3>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-800">
            <div class="px-6 py-4 space-y-3">
                <div class="flex items-center justify-between text-sm text-gray-600">
                    <span class="font-medium text-gray-700">Tattooes Since</span>
                    <span class="text-gray-500">{{ yearsText }}</span>
                </div>

                <div class="flex items-center justify-between text-sm text-gray-600">
                    <span class="font-medium text-gray-700">Language</span>
                    <span class="text-gray-500">{{ languagesText }}</span>
                </div>

                <div class="flex items-center justify-between text-sm text-gray-600">
                    <span class="font-medium text-gray-700">Money</span>
                    <span class="text-gray-500">{{ priceText }}</span>
                </div>

                <div class="flex items-center justify-between text-sm text-gray-600">
                    <span class="font-medium text-gray-700">Avg. Waiting Time</span>
                    <span class="text-gray-500">{{ waitingText }}</span>
                </div>

                <div class="flex items-center justify-between text-sm text-gray-600">
                    <span class="font-medium text-gray-700">Style</span>
                    <span class="text-gray-500">{{ stylesText }}</span>
                </div>
            </div>
        </div>

        <div class="pt-4 pb-6 px-6">
            <button @click="$emit('send-request', artist.artist_id || null)" class="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-yellow-400 text-yellow-700 hover:bg-yellow-50">
                <span>Send Request</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        default: null
    },
})

const artist = props.data || {}

function joinLangs(langArr) {
    if (!langArr) return '-'
    if (!Array.isArray(langArr)) {
        if (typeof langArr === 'string') return langArr
        return String(langArr)
    }
    return langArr
        .map(l => {
            if (!l && l !== 0) return null
            if (typeof l === 'string') return l
            if (typeof l === 'object') return l.label || l.value || String(l)
            return String(l)
        })
        .filter(Boolean)
        .join(', ') || '-'
}

function joinStyles(catArr) {
    if (!Array.isArray(catArr) || catArr.length === 0) return '-'
    return catArr.slice(0, 2).join(', ')
}

function computeYears(startYear) {
    if (startYear == null) return null
    const n = Number(startYear)
    if (Number.isNaN(n) || n <= 0) return null
    const diff = new Date().getFullYear() - Math.floor(n)
    return diff >= 0 ? diff : null
}

const yearsText = (() => {
    const y = computeYears(artist.startYear)
    return y != null ? `${y} Years` : '—'
})()
const languagesText = joinLangs(artist.spokenLanguage)
const priceText = (() => {
    const p = Number(artist.rate || 0)
    if (p <= 0) return '-'
    return '$'.repeat(Math.min(4, Math.floor(p / 50)))
})()

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

const waitingText = formatWaiting(artist.waitTime)

const stylesText = joinStyles(artist.specialties)
</script>