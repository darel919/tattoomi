<template>
  <dialog :id="props.id" class="modal">
    <div class="modal-box rounded-4xl" :class="modalClass">
      <slot />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
const props = defineProps({
  id: { type: String, required: true },
  modalClass: { type: String, default: '' },
});
</script>