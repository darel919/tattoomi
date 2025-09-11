<template>
  <BaseModal id="modal_view_all_portfolio" modalClass="bg-[#050505] max-w-[67.5rem] scrollbar-style-1 p-20">
    <div class="flex flex-col items-center gap-8">
      <div class="text-center">
        <h2 class="text-4xl text-white font-bold">Artist’s Portfolio</h2>
        <p class="text-secondary-200">Browse all of this artist’s portfolio</p>
      </div>
      <div class="grow grid grid-cols-3 gap-1.5 w-full">
        <div v-for="(item, idx) in portfoliosToShow" :key="item.workId || item.id || idx" class="rounded-lg bg-secondary-350 h-[29.875rem] overflow-hidden relative">
          <img v-if="item.imageUrl" :src="item.imageUrl" class="w-full h-full object-cover" :alt="item.title || `portfolio-${idx}`" />
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
const props = defineProps({
  portfolios: { type: Array, default: () => [] }
});

// Local placeholders when no portfolios prop provided
const localPlaceholders = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 }
];

const portfoliosToShow = computed(() => {
  if (Array.isArray(props.portfolios) && props.portfolios.length > 0) return props.portfolios;
  return localPlaceholders;
});
</script>