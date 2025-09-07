<template>
  <BaseModal id="modal_edit_portfolio">
    <div class="flex flex-col items-center gap-8">
      <div>
        <p class="text-xl text-center text-secondary-100 font-semibold">Portfolio Settings</p>
        <h2 class="text-3xl font-bold">Showcase your work</h2>
      </div>
      <div class="border border-secondary-300 rounded-2xl p-6 flex justify-between gap-2 w-full">
        <div class="space-y-1.5">
          <h4 class="font-bold text-secondary-90">Link Portfolio</h4>
          <p class="text-shadow-secondary-200">Always show my last 12 Insta posts as my portfolio</p>
        </div>
        <input type="checkbox"
          class="toggle border-secondary-400 bg-secondary-400 text-white checked:border-dark-100 checked:bg-dark-100 checked:text-white" />
      </div>
      <div class="border border-secondary-300 rounded-2xl p-6 flex justify-between gap-2 w-full">
        <div class="space-y-4">
          <div class="space-y-1.5">
            <h4 class="font-bold text-secondary-90">Manually Add Portfolio</h4>
            <p class="text-shadow-secondary-200">Upload your own portfolio and add description for each image.</p>
          </div>
          <FileUpload />
        </div>
        <input type="checkbox"
          class="toggle border-secondary-400 bg-secondary-400 text-white checked:border-dark-100 checked:bg-dark-100 checked:text-white" />
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
import FileUpload from '../FileUpload.vue';
</script>