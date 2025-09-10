<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <h4 class="text-2xl font-semibold">Speciality</h4>
      <button v-if="!props.readonly" onclick="modal_edit_speciality.show()"
        class="btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
        <Pencil :size="20" />
      </button>
    </div>
    <div v-if="props.specialties.length > 0" class="flex flex-wrap gap-2">
      <span v-for="specialty in props.specialties" :key="specialty" class="badge badge-outline badge-primary">
        {{ specialty }}
      </span>
    </div>
    <p v-else class="text-secondary-100">
      Showcase your specialty here, <span class="text-primary-yellow">Add a specialty</span>
    </p>
    <ModalEditSpeciality />
  </div>
</template>

<script setup>
import { Pencil } from 'lucide-vue-next';
const props = defineProps({
  specialties: { type: Array, default: () => [] },
  readonly: { type: Boolean, default: false },
})
</script>
