<template>
  <div>
    <div class="flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <h4 class="text-2xl font-semibold">Where do you work</h4>
        <button v-if="!props.readonly" onclick="modal_edit_studio.show()"
          class="btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
          <Pencil :size="20" />
        </button>
      </div>
      <div class="min-h-[13.75rem]">
        <div v-if="props.studio.name" class="space-y-4">
          <h5 class="text-xl font-semibold">{{ props.studio.name }}</h5>
          <p class="text-secondary-100">{{ props.studio.address }}</p>
          <p class="text-secondary-100">{{ props.studio.city }}, {{ props.studio.state }}, {{ props.studio.country }}</p>
        </div>
        <p v-else class="text-secondary-100">
          Tell your customers about <span class="text-primary-yellow">your studio</span>
        </p>
      </div>
    </div>
    <ModalEditStudio />
  </div>
</template>

<script setup>
import { Pencil } from 'lucide-vue-next';
const props = defineProps({
  studio: { type: Object, default: () => ({}) },
  readonly: { type: Boolean, default: false },
})
</script>
