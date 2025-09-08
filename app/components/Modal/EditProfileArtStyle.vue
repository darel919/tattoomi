<template>
  <BaseModal id="modal_edit_profile_art_style">
    <div class="flex flex-col items-center gap-8">
      <div>
        <p class="text-xl text-center text-secondary-100 font-semibold">Edit Profile Bio</p>
        <h2 class="text-3xl font-bold">Set Your Art Style</h2>
      </div>
      <InputOutline :icon="Droplets" label="Select up to 2 Primary Art Style" placeholder="Search Style" type="text" />
      <InputOutline :icon="Droplets" label="Select up to 3 Secondary Art Style" placeholder="Search Style"
        type="text" />
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
import { Droplets } from 'lucide-vue-next';

</script>