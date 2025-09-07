<template>
  <BaseModal id="modal_edit_speciality">
    <div class="flex flex-col items-center gap-8">
      <div>
        <p class="text-xl text-center text-secondary-100 font-semibold">Specialties</p>
        <h2 class="text-3xl font-bold">Add your Specialties</h2>
      </div>
      <h3 class="text-lg font-semibold text-dark-100">Select the properties that you want to have visible on your
        profile.</h3>
      <div class="border border-secondary-300 rounded-2xl p-6 flex justify-between gap-2 w-full">
        <div class="grid grid-cols-4 w-full gap-y-6">
          <div class="flex flex-col items-center gap-1 text-secondary-90" v-for="(speciality, index) in specialities"
            :key="index">
            <component v-if="speciality.icon" :is="speciality.icon" :size="28" />
            <p class="text-xs text-center">{{ speciality.text }}</p>
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
import { CircleParking, CirclePlus, CloudLightning, Hand, Heart, LockKeyhole, Pin, Rainbow, Star, TrainFront } from 'lucide-vue-next';
import CustomIconVeganColours from "@/components/CustomIcon/VeganColours";
import CustomIconSavespace from "@/components/CustomIcon/Savespace";
import CustomIconCoverups from "@/components/CustomIcon/Coverups";
import CustomIconWheelchair from "@/components/CustomIcon/Wheelchair";

const specialities = [
  {
    icon: CustomIconVeganColours,
    text: 'Vegan Colours',
  },
  {
    icon: CustomIconSavespace,
    text: 'Savespace',
  },
  {
    icon: Rainbow,
    text: 'LGBTQ+ friendly',
  },
  {
    icon: CustomIconCoverups,
    text: 'Coverups',
  },
  {
    icon: LockKeyhole,
    text: 'High Privacy',
  },
  {
    icon: CircleParking,
    text: 'Client Parking',
  },
  {
    icon: Heart,
    text: 'Sacred Tattooing',
  },
  {
    icon: Star,
    text: 'Luxury experience',
  },
  {
    icon: Hand,
    text: 'Handpoke',
  },
  {
    icon: CustomIconWheelchair,
    text: 'Wheelchair accessible',
  },
  {
    icon: CloudLightning,
    text: 'Scar Coverups',
  },
  {
    icon: Pin,
    text: 'Unique location',
  },
  {
    icon: CirclePlus,
    text: 'Regular Customers Advantages',
  },
  {
    icon: TrainFront,
    text: 'Well-Served by Public Transport',
  },
];
</script>