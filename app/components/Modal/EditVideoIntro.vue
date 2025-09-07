<template>
  <BaseModal id="modal_edit_video_intro">
    <div class="flex flex-col items-center gap-8">
      <div>
        <p class="text-xl text-center text-secondary-100 font-semibold">Video Introduction</p>
        <h2 class="text-3xl font-bold">Upload a video introduction</h2>
      </div>
      <div class="border border-secondary-300 rounded-2xl p-6 flex justify-between gap-2 w-full">
        <div class="space-y-4">
          <div class="space-y-1.5">
            <h4 class="font-bold text-secondary-90">Upload your introduction video</h4>
            <p class="text-shadow-secondary-200">Upload a short video about you explaining about yourself and how you
              work
              to attract your next customers</p>
          </div>
          <FileUpload />
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