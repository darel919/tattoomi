<template>
  <BaseModal id="modal_edit_map_view">
    <div class="flex flex-col items-center gap-8">
      <div>
        <p class="text-xl text-center text-secondary-100 font-semibold">Edit location</p>
        <h2 class="text-3xl font-bold">Set up your location</h2>
      </div>
      <InputOutline :icon="MapPin" placeholder="2440 Mission St, San Francisco, CA 94110, US" type="text" />
      <div>
        <p class="font-bold text-secondary-100 w-full">Verify your location on this map</p>
        <DashboardMapView :location="{ lat: 37.7749, lng: -122.4194 }" />
      </div>
      <div class="flex gap-6 w-full">
        <button type="button" class="btn border border-primary-yellow rounded-full flex-grow font-semibold">
          Back
        </button>
        <button type="submit" class="btn bg-primary-yellow text-black rounded-full flex-grow font-semibold border-0">
          Submit
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { MapPin } from 'lucide-vue-next';
</script>
