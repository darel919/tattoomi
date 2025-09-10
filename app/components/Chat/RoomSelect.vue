<template>
    <div class="card shadow-sm overflow-hidden rounded-2xl h-full flex flex-col">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div class="flex items-center justify-between">
                <h3 class="text-3xl font-semibold">Inbox</h3>
            </div>
            <div class="mt-3">
                <div class="flex items-center gap-1 bg-base-100 rounded-full border-1 border-gray-200 dark:border-gray-700 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ml-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7 7 0 1116.65 6.65a7 7 0 010 9.9z" />
                    </svg>
                    <input
                        v-model="query"
                        type="text"
                        placeholder="Search"
                        class="input input-sm text-sm input-ghost w-full bg-transparent border-0 focus:outline-none"
                        aria-label="Search conversations"
                    />
                </div>
            </div>
        </div>

        <div class="h-full overflow-auto">
            <section
                v-for="(chat, index) in filtered"
                :key="chat.chatRoomId"
                :class="['flex flex-row items-center gap-4 p-3 cursor-pointer', selectedId == chat.chatRoomId ? 'bg-blue-100 dark:text-black' : 'hover:bg-gray-100 hover:text-black']"
                @click="selectRoom(chat.chatRoomId)"
            >
                <section v-if="chat.participant" class="avatar">
                    <div class="w-12 rounded-full">
                        <img :src="chat.participant.avatar || 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp'" :alt="chat.participant.name" />
                    </div>
                </section>

                <section class="flex-1 flex flex-col items-start">
                    <div class="w-full flex items-center justify-between">
                        <h2 v-if="chat.participant" class="font-medium">{{ chat.participant.name }}</h2>
                        <span class="text-sm text-gray-500">{{ chatTime(chat) }}</span>
                    </div>
                    <p v-if="chat.lastMessage" class="text-sm text-gray-600">{{ chat.lastMessage.content }}</p>
                    <p v-if="chat.projectTitle" class="text-xs text-gray-500">{{ chat.projectTitle }}</p>
                </section>
            </section>
            <section v-if="!filtered.length" class="p-4 text-center text-gray-500">
                No conversations found
            </section>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    selectedId: {
        type: [String, Number],
        default: null,
    },
})

const emit = defineEmits(['select'])

const query = ref('')

const timeAgoMap = reactive(new Map())

watch(() => props.data, (newData) => {
    newData.forEach(chat => {
        if (!timeAgoMap.has(chat.chatRoomId)) {
            const { timeAgo } = useTimeAgo(new Date(chat.lastMessage?.createdAt || chat.createdAt).getTime() / 1000)
            timeAgoMap.set(chat.chatRoomId, timeAgo)
        }
    })
}, { immediate: true })

const filtered = computed(() => {
    const q = query.value && query.value.trim().toLowerCase()
    if (!q) return props.data
    return props.data.filter((chat) => {
        const name = chat.participant?.name ? chat.participant.name.toLowerCase() : ''
        const projectTitle = chat.projectTitle ? chat.projectTitle.toLowerCase() : ''
        const lastMessage = chat.lastMessage?.content ? chat.lastMessage.content.toLowerCase() : ''
        return name.includes(q) || projectTitle.includes(q) || lastMessage.includes(q)
    })
})

function chatTime(chat) {
    return timeAgoMap.get(chat.chatRoomId)?.value ?? ''
}

function selectRoom(roomId) {
    emit('select', roomId)
}
</script>