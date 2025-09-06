<template>
  <div
    class="hidden md:flex flex-col justify-between min-w-[38rem] bg-radial-[at_100%_0%] from-primary-yellow/40 to-black to-80% text-white rounded-3xl pt-[6.25rem] pb-[3.75rem] px-[3rem] shadow-md">
    <div class="flex flex-col">
      <NuxtLink to="/"><img src="/assets/images/logo_light.png" alt="Logo" class="w-48 mb-[3.75rem]" /></NuxtLink>
      <ul class="list-none flex flex-col gap-10">
        <li class="flex items-center gap-8" :class="{ 'text-primary-yellow': index + 1 <= props.currentStep }"
          v-for="(step, index) in steps">
          <IconsCheck />
          <p class="text-xl font-semibold">{{ step }}</p>
        </li>
      </ul>
    </div>
    <div class="flex justify-between items-center font-semibold">
      <NuxtLink to="/privacypolicy" class="link">Privacy Policy</NuxtLink>
      <NuxtLink to="/contact" class="link">Support</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentStep: { type: Number, default: 1 },
});

const steps = ['Login Details', 'Basic Info', 'Professional Informations', 'Verification'];
</script>