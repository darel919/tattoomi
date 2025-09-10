<template>
  <div class="w-full px-4 pb-6">
    <form @submit.prevent="onSend" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div class="flex flex-col p-0">
        <div class="flex items-end p-4 space-x-3">
        <div class="flex-1">
          <label for="chat-input" class="sr-only">Message</label>
          <textarea
            id="chat-input"
            ref="ta"
            v-model="value"
            @input="onInput"
            @keydown.enter.exact.prevent="onSend"
            @keydown.enter.shift="insertNewline"
            rows="1"
            class="w-full resize-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none text-sm leading-snug max-h-40"
            placeholder="Ask Anything.."
            aria-label="Type a message"
          />
          <div class="mt-2 text-xs text-gray-400"> 
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <!-- <button type="button" @click="toggleBold" class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Bold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="text-gray-600 dark:text-gray-300">
              <path d="M7 4h5a4 4 0 010 8H7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 12h6a4 4 0 010 8H7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button> -->

          <label for="file-upload" class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" aria-label="Attach file">
            <input id="file-upload" type="file" class="hidden" @change="onAttach" />
            <Paperclip :size="16" />
          </label>
        </div>

        <button type="submit" class="ml-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white shadow" aria-label="Send message">
          <SendHorizonal :size="16" color="black"/>
        </button>

        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { SendHorizonal, Paperclip } from 'lucide-vue-next';

const props = defineProps({
  onSend: {
    type: Function,
    default: null
  }
})

const value = ref('')
const ta = ref(null)
const attachedFile = ref(null)
const boldActive = ref(false)

function getLineHeight(el) {
  const cs = window.getComputedStyle(el)
  const lh = parseFloat(cs.lineHeight || '0')
  if (!lh) {
    const fs = parseFloat(cs.fontSize || '16')
    return fs * 1.2
  }
  return lh
}

function resize() {
  if (!ta.value) return
  ta.value.style.height = 'auto'

  const lineHeight = getLineHeight(ta.value)
  const maxLines = 10
  const maxHeight = Math.round(lineHeight * maxLines)

  const newHeight = Math.min(ta.value.scrollHeight, maxHeight)
  ta.value.style.height = newHeight + 'px'
}

function onInput() {
  resize()
}

async function onSend() {
  if (!value.value.trim()) return
  const messageContent = value.value.trim()
  value.value = ''
  await nextTick()
  resize()
  
  // Call the sendMessage function passed as prop
  if (props.onSend) {
    await props.onSend(messageContent)
  }
}

function insertNewline() {
  nextTick(resize)
}

function onAttach(e) {
  const input = e.target
  if (!(input && input instanceof HTMLInputElement)) return
  if (!input.files || input.files.length === 0) return
  const file = input.files[0]
  if (!file) return
  attachedFile.value = file
  input.value = ''
}

function toggleBold() {
  boldActive.value = !boldActive.value
}

nextTick(resize)
</script>

<style scoped>
textarea::-webkit-scrollbar { display: none; }
</style>
