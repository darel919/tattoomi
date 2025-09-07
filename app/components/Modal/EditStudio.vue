<template>
  <BaseModal id="modal_edit_studio">
    <div class="flex flex-col items-center gap-8">
      <div>
        <p class="text-xl text-center text-secondary-100 font-semibold">Edit studio</p>
        <h2 class="text-3xl font-bold">Show us your where work</h2>
      </div>
      <div class="border border-secondary-300 rounded-2xl p-6 flex justify-between gap-2 w-full">
        <div class="space-y-4">
          <div class="space-y-1.5">
            <h4 class="font-bold text-secondary-90">Add your studio details</h4>
            <p class="text-shadow-secondary-200">Upload an image of the studio and then show the address on the
              description box.</p>
          </div>
          <FileUpload />
          <InputOutline placeholder="Link to your studio website" type="text" />
        </div>
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