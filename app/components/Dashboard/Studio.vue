<template>
  <div>
    <div class="flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <h4 class="text-2xl font-semibold">Where do you work</h4>
        <button onclick="modal_edit_studio.show()"
          class="btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
          <Pencil :size="20" />
        </button>
      </div>
      <div class="min-h-[13.75rem]">
        <p class="text-secondary-100">
          Tell your customers about <span class="text-primary-yellow">your studio</span>
        </p>
      </div>
    </div>
    <ModalEditStudio />
  </div>
</template>

<script setup>
import { Pencil } from 'lucide-vue-next';

</script>
