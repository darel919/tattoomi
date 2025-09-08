<template>
  <div>
    <div class="flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <h4 class="text-2xl font-semibold">Introduction Video</h4>
        <button v-if="!props.readonly" onclick="modal_edit_video_intro.show()"
          class="btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
          <Pencil :size="20" />
        </button>
      </div>
      <p class="text-secondary-100">Upload a short video to let your customers know about you...</p>
    </div>
    <ModalEditVideoIntro />
  </div>
</template>

<script setup>
import { Pencil } from 'lucide-vue-next';
const props = defineProps({
  readonly: { type: Boolean, default: false },
})
</script>
