<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <h4 class="text-2xl font-semibold">Speciality</h4>
      <button onclick="modal_edit_speciality.show()"
        class="btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
        <Pencil :size="20" />
      </button>
    </div>
    <p class="text-secondary-100">
      Showcase your specialty here, <span class="text-primary-yellow">Add a specialty</span>
    </p>
    <ModalEditSpeciality />
  </div>
</template>

<script setup>
import { Pencil } from 'lucide-vue-next';
</script>
