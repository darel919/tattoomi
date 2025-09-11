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
      <DashboardMapView :location="mapLocation" />
    </div>
    <ClientOnly>
      <ModalEditMapView />
    </ClientOnly>
  </div>
</template>

<script setup>
import { Pencil } from 'lucide-vue-next';

const props = defineProps({
  studio: { type: Object, default: () => ({}) },
  readonly: { type: Boolean, default: false },
})

const mapLocation = computed(() => {
  // Convert string coordinates to numbers, with fallback to San Francisco coordinates
  const defaultLat = 37.7749;
  const defaultLng = -122.4194;
  
  if (!props.studio?.latitude || !props.studio?.longitude) {
    return { lat: defaultLat, lng: defaultLng };
  }
  
  const lat = parseFloat(props.studio.latitude);
  const lng = parseFloat(props.studio.longitude);
  
  // Validate that the coordinates are valid numbers
  if (isNaN(lat) || isNaN(lng)) {
    return { lat: defaultLat, lng: defaultLng };
  }
  
  return { lat, lng };
})
</script>