<template>
    <div class="max-w-xs rounded-2xl mx-auto shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div class="p-6 text-center relative">
            <div class="mx-auto w-20 h-20 rounded-full ring-4 ring-white overflow-hidden">
                <img :src="artist.avatar" :alt="artist.name" class="w-full h-full object-cover" />
            </div>
            <h3 class="mt-3 text-lg font-semibold">{{ artist.name }}</h3>
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
            <button @click="$emit('send-request', artist.artist_id)" class="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-yellow-400 text-yellow-700 hover:bg-yellow-50">
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
        required: true,
    },
})

const artist = props.data || {}

function joinLangs(langArr) {
    if (!Array.isArray(langArr) || langArr.length === 0) return '-'
    return langArr.map(l => l.lang_name).join(', ')
}

function joinStyles(catArr) {
    if (!Array.isArray(catArr) || catArr.length === 0) return '-'
    return catArr.slice(0, 2).map(c => c.cat_name).join(', ')
}

const yearsText = artist.years_experience ? `${artist.years_experience} Years` : '—'
const languagesText = joinLangs(artist.lang)
const priceText = (() => {
    const p = Number(artist.price || 0)
    if (p <= 0) return '-'
    return '$'.repeat(Math.min(4, p))
})()

const waitingText = (() => {
    const days = Number(artist.waitingTime || 0)
    if (!days) return '-'
    if (days <= 7) return '1 Week'
    if (days <= 14) return '2 Weeks'
    if (days <= 21) return '2-3 Weeks'
    if (days <= 30) return '3-4 Weeks'
    return `${Math.round(days/7)}+ Weeks`
})()

const stylesText = joinStyles(artist.category)
</script>