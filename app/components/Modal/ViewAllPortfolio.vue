<template>
  <BaseModal id="modal_view_all_portfolio" modalClass="bg-[#050505] max-w-[67.5rem] scrollbar-style-1 p-20">
    <div class="flex flex-col items-center gap-8">
      <div class="text-center">
        <h2 class="text-4xl text-white font-bold">Artist’s Portfolio</h2>
        <p class="text-secondary-200">Browse all of this artist’s portfolio</p>
      </div>
      <div class="grow grid grid-cols-3 gap-1.5 w-full">
        <div v-for="item in portfolios" :key="item.id" class="rounded-lg bg-secondary-350 h-[29.875rem]"></div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
const portfolios = [
  { id: 1, },
  { id: 2, },
  { id: 3, },
  { id: 4, },
  { id: 5, },
  { id: 6, },
  { id: 7, },
];
</script>