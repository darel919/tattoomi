<template>
  <BaseModal id="modal_edit_profile_language">
    <div class="flex flex-col items-center gap-8">
      <div>
        <p class="text-xl text-center text-secondary-100 font-semibold">Edit Profile Bio</p>
        <h2 class="text-3xl font-bold">Language</h2>
      </div>
      <InputOutline v label="Language" placeholder="Select language(s) you speak" type="select" :icon="Languages"
        :options="[
          {
            label: 'German',
            value: 'German',
          },
          {
            label: 'English',
            value: 'English',
          },
          {
            label: 'Italian',
            value: 'Italian',
          },
          {
            label: 'French',
            value: 'French',
          },
          {
            label: 'Portuguese',
            value: 'Portuguese',
          },
          {
            label: 'Spanish',
            value: 'Spanish',
          },
        ]" multiple />
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
import { Clock, Languages } from 'lucide-vue-next';

</script>
