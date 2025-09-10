<template>
    <section v-if="data" class="space-y-4 p-4 h-full flex flex-col">
        <header class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 mb-8 flex-shrink-0">
        <section class="flex-row flex gap-3 mr-2">
            <div v-if="data?.recipient?.avatar" class="avatar">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                    <img :src="data?.recipient?.avatar" :alt="data?.recipient?.name" />
                </div>
            </div>
            <div>
                <div class="font-medium truncate">{{ data?.recipient?.name ?? 'Recipient' }}</div>
                <div class="text-sm text-muted-foreground">{{ data?.projectTitle ?? '' }}</div>
            </div>
        </section>
        <section class="items-center flex flex-row gap-4">
            <button class="border-1 border-hero flex flex-row items-center rounded-full px-3 py-1">
                <Mail class="mr-2" :size="16" />
                <p class="text-sm truncate">Send via Mail</p>
            </button>
             <button class="border-1 border-hero flex flex-row items-center rounded-full px-3 py-1">
                <Video class="mr-2" :size="16" />
                <p class="text-sm truncate">Schedule a Call</p>
            </button>
        </section>
    </header>
    <div class="flex flex-col gap-3 flex-1 overflow-y-auto">
        <!-- Debug: Show messages count -->
        <div v-if="data?.messages && data.messages.length === 0" class="text-center text-gray-500 py-8">
            No messages yet. Start the conversation!
        </div>
        
        <div v-for="msg in data?.messages || []" :key="msg.messageId">
            <div :class="['chat', isSent(msg) ? 'chat-end' : 'chat-start']">
                <div class="chat-header mb-1">
                    <span class="text-sm font-medium">{{ !isSent(msg) ? msg.senderName : 'You' }}</span>
                </div>

                <div :class="['chat-bubble', isSent(msg) ? 'bg-hero text-black' : 'bg-base-200 text-base-content']">
                    {{ msg.content }}
                </div>

                <div class="chat-footer opacity-70 text-xs mt-2" :class="isSent(msg) ? 'text-right' : ''">
                    {{ formatTime(msg.createdAt) }}
                </div>
            </div>
        </div>
    </div>
                <ChatInput :on-send="onSendMessage"/>
    </section>

    <section v-else class="h-full flex items-center justify-center">
        <div class="text-center text-sm text-muted-foreground">No conversation selected</div>
    </section>
</template>

<script setup>
import { Mail, Video } from "lucide-vue-next"
import { useMyAuthStore } from '~/stores/auth'

const props = defineProps({
    data: {
    type: Object,
    required: false,
    default: null
    },
    onSendMessage: {
        type: Function,
        default: null
    }
})

// Make data reactive to prop changes
const data = computed(() => props.data)
const authStore = useMyAuthStore()

function isSent(msg) {
    try {
        const senderId = msg?.senderId != null ? String(msg.senderId) : null
        const userId = authStore.user?.id != null ? String(authStore.user?.id) : null
        if (senderId && userId) return senderId === userId
        // fallback to matching email if ids missing
        if (msg?.senderEmail && authStore.user?.email) return msg.senderEmail === authStore.user.email
        return false
    } catch (e) {
        return false
    }
}

function formatTime(ts) {
    const d = new Date(ts)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>