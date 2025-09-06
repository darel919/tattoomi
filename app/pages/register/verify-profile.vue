<template>
  <div class="min-h-screen flex gap-4">
    <RegisterStepContent :current-step="4" />

    <div class="flex-1 px-12 pt-[6.25rem] pb-[3.75rem] card bg-white rounded-3xl w-full flex items-center">
      <div class="flex flex-col items-center max-w-[30rem]">
        <div class="mb-10 text-primary-yellow">
          <IconsCircleCheck />
        </div>
        <h2 class="text-3xl font-bold mb-8">Your Profile Will be Verified </h2>
        <p class="roboto text-secondary-90 mb-8">
          Our team is currently reviewing your profile and details, this process may take up to 72 hours. Once your
          information is verified and meets our quality standards, your profile will be published on Tattoomii. You’ll
          receive an email notification upon activation. <br><br>
          Your Tattoomii membership is currently <strong>free of charge</strong>. Should this change, you will be
          notified at least 3
          months in advance. <br><br>
          In the meantime you can finish setting up your profile.
        </p>
        <button type="submit" class="btn bg-primary-yellow rounded-full w-full font-semibold border-0 mb-8"
          @click="handleSubmit">
          Continue to Artist’s Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

definePageMeta({
  layout: 'auth',
});

function handleSubmit() {
  // router.push('/register/basic-info');
}
</script>