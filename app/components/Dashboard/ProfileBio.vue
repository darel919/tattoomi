<template>
  <div>
    <div class="flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <h4 class="text-2xl font-semibold">About</h4>
        <button v-if="!props.readonly" onclick="modal_edit_profile_bio.show()"
          class="btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
          <Pencil :size="20" />
        </button>
      </div>
      <p class="">{{ props.bio || 'Write down your professional description here...' }}</p>
    </div>
    <ModalEditProfileBio />
  </div>
</template>

<script setup>
import { Pencil } from 'lucide-vue-next';
const props = defineProps({
  bio: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
})
</script>