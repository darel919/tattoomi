<template>
  <div class="toast toast-top toast-end">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="`alert ${getAlertClass(toast.status)}`"
    >
        <section class="flex flex-row items-center w-full px-4 py-2">
            <div class="flex items-center gap-4 flex-1 min-w-0">
              <CircleX v-if="toast.status === 'error'" :size="24"/>
              <p class="text-xl truncate min-w-0">{{ toast.message }}</p>
            </div>
            <div class="ml-8 -mr-8 flex-shrink-0">
              <button
                class="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200"
                aria-label="Close toast"
                @click="removeToast(toast.id)"
              >
                ✕
              </button>
            </div>
        </section>
    </div>
  </div>
</template>

<script setup>
import { CircleX } from 'lucide-vue-next'
import { toasts } from '~/composables/useToast'
import { useToast } from '~/composables/useToast'

const getAlertClass = (status) => {
  switch (status) {
    case 'error':
      return 'alert-error'
    case 'warning':
      return 'alert-warning'
    case 'ok':
      return 'alert-success'
    case 'info':
      return 'alert-info'
    default:
      return 'alert-info'
  }
}

const { removeToast } = useToast()
</script>
