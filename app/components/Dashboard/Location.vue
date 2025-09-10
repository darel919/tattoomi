<template>
  <div>
    <div class="flex flex-col gap-3">
      <div class="flex justify-between items-center">
        <h4 class="text-2xl font-semibold">Location</h4>
        <button v-if="!props.readonly" onclick="modal_edit_map_view.show()"
          class="btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
          <Pencil :size="20" />
        </button>
      </div>
      <DashboardMapView :location="{ lat: props.studio.latitude || 37.7749, lng: props.studio.longitude || -122.4194 }" />
    </div>
    <EditMapView />
  </div>
</template>

<script setup>
import { Pencil } from 'lucide-vue-next';
const props = defineProps({
  studio: { type: Object, default: () => ({}) },
  readonly: { type: Boolean, default: false },
})
</script>