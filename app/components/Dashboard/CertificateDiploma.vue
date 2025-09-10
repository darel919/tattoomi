<template>
  <div>
    <div class="flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <h4 class="text-2xl font-semibold">Certificates & Diplomas</h4>
        <button v-if="!props.readonly" onclick="modal_edit_certificate_diploma.show()"
          class="btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
          <Pencil :size="20" />
        </button>
      </div>
      <div v-if="props.diplomas.length > 0" class="space-y-4">
        <div v-for="diploma in props.diplomas" :key="diploma.diplomaId"
          class="border border-secondary-300 rounded-2xl px-4 py-4 flex justify-between items-center">
          <div class="flex items-center gap-3 text-secondary-100">
            <BookPlus :size="32" />
            <div>
              <p class="font-semibold">{{ diploma.title }}</p>
              <p class="text-sm">{{ diploma.institution }} - {{ diploma.yearObtained }}</p>
            </div>
          </div>
          <button class="btn btn-ghost btn-square">
            <Eye :size="20" />
          </button>
        </div>
      </div>
      <div v-else class="border border-secondary-300 rounded-2xl px-2 py-4 flex justify-between items-center">
        <div class="flex justify-between items-center gap-3 text-secondary-100">
          <BookPlus :size="32" />
          <p>Showcase your Certificates & Diplomas</p>
        </div>
        <button class="btn btn-ghost btn-square">
          <Eye :size="20" />
        </button>
      </div>
    </div>
    <ModalEditCertificateDiploma />
  </div>
</template>

<script setup>
import { BookPlus, Eye, Pencil } from 'lucide-vue-next';

const props = defineProps({
  diplomas: { type: Array, default: () => [] },
  readonly: { type: Boolean, default: false },
})
</script>