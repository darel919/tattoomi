<template>
  <BaseModal id="modal_edit_wont_do">
    <div class="flex flex-col items-center gap-8">
      <div>
        <p class="text-xl text-center text-secondary-100 font-semibold">Select preferences</p>
        <h2 class="text-3xl font-bold">Body Part’s you won’t do</h2>
      </div>
      <h3 class="text-secondary-90">
        Select the properties that you want to have visible on your profile.
      </h3>
      <div class="border border-secondary-300 rounded-2xl p-6 flex justify-between gap-2 w-full">
        <div class="grid grid-cols-4 gap-y-6 gap-x-2">
          <div class="flex gap-2 items-center" v-for="(bodyPart, index) in bodyParts" :key="index">
            <input type="checkbox" class="checkbox checked:bg-dark-100 checked:text-white" />
            <p class="text-sm font-medium text-secondary-90">{{ bodyPart }}</p>
          </div>
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
const bodyParts = [
  "Arm",
  "Chest",
  "Hip",
  "Back",
  "Ribs",
  "Underboob",
  "Belly",
  "Leg",
  "Hand",
  "Finger",
  "Palm",
  "Back of knee",
  "Foot",
  "Toe",
  "Head",
  "Face",
  "Intim",
  "Neck",
  "Ear",
  "Behind the ear",
  "Eyes",
  "Eyelids",
  "Tongue",
  "Lips",
  "Foot sole",
  "Armpit",
  "Inner tip"
];
</script>