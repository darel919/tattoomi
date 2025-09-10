<template>
  <div class="h-[70vh] px-10 my-10">
    <div v-if="loading" class="flex justify-center items-center h-full">
      <div class="loading loading-spinner loading-lg"></div>
    </div>
    <div v-else-if="error" class="flex justify-center items-center w-full h-full">
      <ErrorState state="error" :title="'Failed to Load Chat Rooms'" :details="error" @retry="fetchChatRooms" />
    </div>
    <div v-else class="flex flex-col md:flex-row gap-4 h-full">
      <aside class="w-full md:w-[360px] md:flex-shrink-0 h-full md:h-full">
        <ChatRoomSelect :data="roomDatas" :selectedId="id" @select="onSelectRoom" />
      </aside>

      <section class="flex-1 bg-base-100 shadow-sm rounded-2xl h-full">
        <ChatWindow :key="`chat-${id || 'empty'}-${currentRoomData?.messages?.length || 0}`" :data="currentRoomData" :on-send-message="(content) => sendMessage(id, content)" />
      </section>

      <aside v-if="id && currentRoomData" class="hidden md:block w-full md:w-[320px] md:flex-shrink-0 h-full">
        <ChatArtistDetails :data="currentArtistData" />
      </aside>
    </div>
  </div>
</template>

<script setup>
import { useMyAuthStore } from '~/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useMyAuthStore()
const config = useRuntimeConfig()

// Reactive data
const roomDatas = ref([])
// use a ref with an object instead of reactive() for better reactivity tracking
const messages = ref({})
const loading = ref(false)
const error = ref(null)

const id = computed(() => route.params.id)

// API functions
const fetchChatRooms = async () => {
  try {
    loading.value = true
    const response = await $fetch(config.public.baseURL + '/api/user/chatRooms', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    if (response.message === "Chat rooms retrieved successfully") {
      roomDatas.value = response.data
    }
  } catch (err) {
    error.value = err.message
    console.error('Failed to fetch chat rooms:', err)
  } finally {
    loading.value = false
  }
}

const fetchMessages = async (chatRoomId) => {
  try {
    // accept either a raw id or a ref/computed
    const roomId = chatRoomId && chatRoomId.value ? chatRoomId.value : chatRoomId
    const roomIdStr = String(roomId)

    const response = await $fetch(`${config.public.baseURL}/api/message/room/${roomIdStr}/messages`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })

    // Extract messages based on the API response structure
    let msgs = []
    if (response && response.message === "Messages retrieved successfully") {
      if (response.data && Array.isArray(response.data.messages)) {
        msgs = response.data.messages
      } else if (response.data && Array.isArray(response.data)) {
        // fallback if data is directly an array
        msgs = response.data
      }
    } else if (response && Array.isArray(response.messages)) {
      // fallback for different response structure
      msgs = response.messages
    } else if (response && Array.isArray(response.data)) {
      // another fallback
      msgs = response.data
    }

    // Ensure msgs is an array
    if (!Array.isArray(msgs)) {
      msgs = []
    }

    // Sort by createdAt ascending so older messages appear first
    try {
      msgs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    } catch (e) {
      // ignore sorting errors
    }

    // assign to the .value property and create a new object to trigger reactivity
    messages.value = {
      ...messages.value,
      [roomIdStr]: msgs
    }
    
    // Force reactivity update
    await nextTick()
  } catch (err) {
    console.error('Failed to fetch messages:', err)
    // Set empty array on error to prevent undefined issues
    const roomIdStr = String(chatRoomId && chatRoomId.value ? chatRoomId.value : chatRoomId)
    messages.value = {
      ...messages.value,
      [roomIdStr]: []
    }
  }
}

const sendMessage = async (chatRoomId, content) => {
  try {
  const roomId = chatRoomId && chatRoomId.value ? chatRoomId.value : chatRoomId
  const roomIdStr = String(roomId)
  const response = await $fetch(`${config.public.baseURL}/api/chat/rooms/${roomIdStr}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content,
        messageType: 'text'
      })
    })
    // Refresh messages after sending
  await fetchMessages(roomIdStr)
  } catch (err) {
    console.error('Failed to send message:', err)
  }
}

// Computed properties
const currentRoomData = computed(() => {
  if (!id.value) return null
  const room = roomDatas.value.find(r => r.chatRoomId == id.value)
  if (!room) return null
  
  const roomMessages = messages.value[String(room.chatRoomId)] || []
  
  return {
    room_id: room.chatRoomId,
    projectTitle: room.projectTitle,
    projectStatus: room.projectStatus,
    recipient: {
      recipient_id: room.participant.id,
      name: room.participant.name,
      email: room.participant.email,
      role: room.participant.role
    },
    lastMessage: room.lastMessage,
    unreadCount: room.unreadCount,
    lastActivity: room.lastActivity,
    messages: roomMessages
  }
})

const currentArtistData = computed(() => {
  if (!currentRoomData.value) return null
  const recipient = currentRoomData.value.recipient
  return {
    artist_id: recipient.recipient_id,
    name: recipient.name,
    avatar: '', // Need to add avatar if available
    years_experience: 5, // Placeholder
    price: 3, // Placeholder
    lang: [], // Placeholder
    waitingTime: 14, // Placeholder
    category: [] // Placeholder
  }
})

// Lifecycle
onMounted(async () => {
  await fetchChatRooms()
  if (id.value) {
    await fetchMessages(id.value)
  }
})

watch(id, async (newId) => {
  if (newId) {
    await fetchMessages(newId)
  }
})

const onSelectRoom = (roomId) => {
  router.push(`/chat/${roomId}`)
}

useHead({
  title: 'Chat Inbox | tattooMii',
})
</script>
