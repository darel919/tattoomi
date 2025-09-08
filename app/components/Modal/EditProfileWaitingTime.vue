<template>
  <BaseModal id="modal_edit_profile_waiting_time">
    <div class="flex flex-col items-center gap-8">
      <div>
        <p class="text-xl text-center text-secondary-100 font-semibold">Edit Profile Bio</p>
        <h2 class="text-3xl font-bold">Set Average Waiting Time</h2>
      </div>
      <div>
        <label class="label mb-1 text-black">
          Avg. waiting time for an appointment (weeks)?
        </label>
        <div class="flex items-center gap-3">
          <input type="range" min="0" max="10" v-model="form.waiting_time" class="range range-neutral" />
          <p class="text-secondary-100">{{ form.waiting_time }}</p>
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
const form = reactive({
  waiting_time: 2,
})
</script>