<template>
  <BaseModal id="modal_edit_profile_rate">
    <div class="flex flex-col items-center gap-8">
      <div>
        <p class="text-xl text-center text-secondary-100 font-semibold">Edit Profile Bio</p>
        <h2 class="text-3xl font-bold">Set your Rate</h2>
      </div>
      <div class="flex items-end gap-1.5 w-full">
        <InputOutline label="Rate" placeholder="Set your minimum rate" type="number" :icon="Coins" />
        <div class="w-[18.75rem]">
          <InputOutline placeholder="Currency" type="select" :icon="Currency" :options="[{
            label: 'USD',
            value: 'USD',
          }]" />
        </div>
      </div>
      <InputOutline placeholder="Select budget range" type="select" :icon="Calculator" :options="[
        {
          label: 'Small (up to CHF 1200 for a one-day session)',
          value: 'small',
        },
        {
          label: 'Normal (1200 to 2000 CHF for a one-day session)',
          value: 'normal',
        },
        {
          label: 'Large (CHF 2000 and more for a one-day session)',
          value: 'large',
        },
      ]" />
      <div class="border border-secondary-300 rounded-2xl p-6 flex flex-col gap-4  w-full">
        <div class="flex items-end gap-1.5">
          <InputOutline label="Hourly Rate" placeholder="150" type="number" :icon="Coins" />
          <div class="w-[18.75rem]">
            <InputOutline placeholder="Currency" type="select" :icon="Currency" :options="[{
              label: 'USD',
              value: 'USD',
            }]" />
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <input type="checkbox" class="checkbox checked:bg-dark-100 checked:text-white" />
          <p class="text-sm font-medium text-secondary-200">On request (do not show my hourly rate)</p>
        </div>
      </div>
      <div class="border border-secondary-300 rounded-2xl p-6 flex flex-col gap-4  w-full">
        <div class="flex items-end gap-1.5">
          <InputOutline label="Session Day Cost" placeholder="200" type="number" :icon="Coins" />
          <div class="w-[18.75rem]">
            <InputOutline placeholder="Currency" type="select" :icon="Currency" :options="[{
              label: 'USD',
              value: 'USD',
            }]" />
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <input type="checkbox" class="checkbox checked:bg-dark-100 checked:text-white" />
          <p class="text-sm font-medium text-secondary-200">On request (do not show my daily rate)</p>
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
import { Calculator, Coins, Currency } from 'lucide-vue-next';

</script>
