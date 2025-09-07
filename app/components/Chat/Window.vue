<template>
    <section class="space-y-4 p-4">
    <header class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 mb-8">
        <section class="flex-row flex gap-3">
            <div v-if="data.recipient?.avatar" class="avatar">
                <div class="w-12 rounded-full overflow-hidden">
                    <img :src="data.recipient.avatar" :alt="data.recipient.name" />
                </div>
            </div>
            <div>
                <div class="font-medium">{{ data.recipient?.name ?? 'Recipient' }}</div>
                <div class="text-sm text-muted-foreground">Room #{{ data.room_id }}</div>
            </div>
        </section>
        <section class="items-center flex flex-row gap-4">
            <button class="border-1 border-hero flex flex-row items-center rounded-full px-3 py-1">
                <Mail class="mr-2" :size="16" />
                <p>Send via Mail</p>
            </button>
             <button class="border-1 border-hero flex flex-row items-center rounded-full px-3 py-1">
                <Video class="mr-2" :size="16" />
                <p>Schedule a Call</p>
            </button>
        </section>
    </header>
        <div class="flex flex-col gap-3 ">
            <div v-for="msg in data.messages" :key="msg.msg_id">
                <div :class="['chat', isSent(msg) ? 'chat-end' : 'chat-start']">
                    <div class="chat-header mb-1">
                        <span class="text-sm font-medium">{{ !isSent(msg) ? data.recipient?.name : 'You' }}</span>
                    </div>

                    <div :class="['chat-bubble', isSent(msg) ? 'bg-hero text-black' : 'bg-base-200 text-base-content']">
                        {{ msg.msg_content }}
                    </div>

                    <div class="chat-footer opacity-70 text-xs mt-2" :class="isSent(msg) ? 'text-right' : ''">
                        {{ formatTime(msg.timestamp) }}
                    </div>
                </div>
            </div>
        </div>
        <ChatInput/>
</section>
</template>

<script setup>
import { Mail, Video } from "lucide-vue-next"

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
})

const data = props.data
const currentUserId = 1

function isSent(msg) {
    return msg.msg_sender === currentUserId
}

function formatTime(ts) {
    const n = Number(ts) || Date.now()
    const t = n < 1e12 ? n * 1000 : n
    const d = new Date(t)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>