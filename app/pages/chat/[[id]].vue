<template>
  <div class="h-[70vh] px-10 my-10">
    <div class="flex flex-col md:flex-row gap-4 h-full">
      <aside class="w-full md:w-[360px] md:flex-shrink-0 h-full md:h-full">
        <ChatRoomSelect :data="roomDatas" :selectedId="id" @select="onSelectRoom" />
      </aside>

      <section class="flex-1 bg-base-100 shadow-sm rounded-2xl h-full">
        <ChatWindow :data="currentRoomData" />
      </section>

      <aside class="hidden md:block w-full md:w-[320px] md:flex-shrink-0 h-full">
        <ChatArtistDetails :data="currentArtistData" />
      </aside>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

const roomDatas = [
  { id: 1, recipient: { name: 'Stephen C', avatar: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp' }, message: 'Hey there. Can i get an appointment for tomorrow?', timestamp: 1757224366 },
  { id: 2, recipient: { name: 'Alice Eon', avatar: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp' }, message: 'Hey there. Can i get an appointment for yesterday?', timestamp: 1757224407 },
];

const id = computed(() => route.params.id)

const currentRoomData = computed(() => {
  if (!id.value) return null
  const room = roomDatas.find(r => r.id == id.value)
  if (!room) return null
  return {
    room_id: room.id,
    recipient: { recipient_id: room.id, name: room.recipient.name, avatar: room.recipient.avatar },
    messages: [
      { msg_id: 1, msg_sender: 1, msg_content: 'Hello, how may i assist? You can also send an email directly too me', timestamp: 1757224366 },
      { msg_id: 2, msg_sender: 2, msg_content: 'Hey there. Can i get an appointment for tomorrow?', timestamp: 1757225273 },
      { msg_id: 3, msg_sender: 1, msg_content: 'Yes, you can!', timestamp: 1757225336 },
    ],
  }
})

const currentArtistData = computed(() => {
  if (!currentRoomData.value) return null
  return {
    artist_id: currentRoomData.value.recipient.recipient_id,
    name: currentRoomData.value.recipient.name,
    avatar: currentRoomData.value.recipient.avatar,
    years_experience: 5,
    price: 3,
    lang: [{lang_id: 1, lang_name: 'German'}, {lang_id: 2, lang_name: 'English'}],
    waitingTime: 14,
    category: [
        {cat_id: 1, cat_name: 'Ornamental'},
        {cat_id: 2, cat_name: 'Heavy Blackwork'},
        {cat_id: 3, cat_name: 'Comic'},
        {cat_id: 4, cat_name: 'Tribal'},
        {cat_id: 5, cat_name: 'Watercolor'}
    ],
  }
})
onMounted(() => {
  if (!id.value && roomDatas.length) {
    router.push(`/chat/${roomDatas[0].id}`)
  }
})
const onSelectRoom = (roomId) => {
  router.push(`/chat/${roomId}`)
}
useHead({
  title: 'Chat Inbox | tattooMii',
})
</script>
