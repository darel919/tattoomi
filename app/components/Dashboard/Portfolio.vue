<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-semibold">Portfolio</h2>
      <button v-if="!props.readonly" onclick="modal_edit_portfolio.show()"
        class="btn btn-outline border-primary-yellow rounded-full btn-sm font-medium flex gap-2 justify-center items-center hover:bg-primary-yellow">
        Add or Edit Portfolio
        <Pencil :size="20" />
      </button>
    </div>
    <div class="flex gap-5 mb-10">
      <div class="grow grid grid-cols-3 gap-5">
        <div v-for="item in portfolios.filter(p => p.size === 'large')" :key="item.id"
          class="rounded-lg bg-secondary-350 h-[40rem]"></div>
      </div>
      <div class="flex flex-col gap-4 min-w-[7.75rem]">
        <div v-for="item in portfolios.filter(p => p.size === 'small')" :key="item.id"
          class="rounded-lg bg-secondary-350 h-[8.75rem]"></div>

        <button onclick="modal_view_all_portfolio.show()"
          class="btn btn-outline border-primary-yellow rounded-full btn-sm font-medium mt-2 hover:bg-primary-yellow">View
          All
        </button>
      </div>
    </div>
    <ModalViewAllPortfolio />
    <ModalEditPortfolio />
  </div>
</template>

<script setup>
const portfolios = [
  { id: 1, size: "large" },
  { id: 2, size: "large" },
  { id: 3, size: "large" },
  { id: 4, size: "small" },
  { id: 5, size: "small" },
  { id: 6, size: "small" },
  { id: 7, size: "small" },
]
const props = defineProps({
  readonly: { type: Boolean, default: false },
})
</script>
