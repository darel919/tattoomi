<template>
  <div class="min-h-screen flex gap-4">
    <RegisterStepContent :current-step="2" />

    <div class="flex-1 px-12 pt-[6.25rem] pb-[3.75rem] card bg-white text-black rounded-3xl w-full">
      <div class="flex flex-col items-center">
        <p class="text-xl text-secondary-100 font-semibold">Let’s Set up</p>
        <h2 class="text-3xl font-bold mb-8">Your Artist Profile</h2>
        <form @submit.prevent="handleSubmit" class="w-full">
          <div class="mb-8">
            <UploadAvatar v-model="avatarFile" @update:modelValue="onAvatarChange" />
          </div>
          <div class="flex flex-col gap-5 mb-8">
            <InputOutline v-model="form.fullName" label="Full Name" placeholder="Enter your full name" type="text"
              :icon="IconsUserRoundBold" required />
            <InputOutline v-model="form.displayName" label="Display Name" placeholder="Enter your display name"
              type="text" :icon="IconsLaptop" required />
            <InputOutline v-model="form.instagram" label="Instagram Account" placeholder="Paste your Instagram Link"
              type="text" :icon="IconsInstagram" required />
            <InputOutline v-model="form.facebook" label="Facebook Account"
              placeholder="Paste your Facebook Link (optional)" type="text" :icon="IconsFacebook" />
          </div>
          <div class="flex gap-6">
            <button type="button" class="btn border border-primary-yellow rounded-full flex-grow font-semibold"
              @click="handleBack">
              Back
            </button>
            <button type="submit" class="btn bg-primary-yellow text-black rounded-full flex-grow font-semibold border-0">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconsUserRoundBold from '@/components/Icons/UserRoundBold.vue';
import IconsLaptop from '@/components/Icons/Laptop.vue';
import IconsInstagram from '@/components/Icons/Instagram.vue';
import IconsFacebook from '@/components/Icons/Facebook.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

definePageMeta({
  layout: 'auth',
});

const avatarFile = ref(null)
const form = reactive({
  fullName: '',
  displayName: '',
  instagram: '',
  facebook: '',
});

function onAvatarChange(file) {
  avatarFile.value = file;
}

function handleBack() {
  router.push('/register/email-verification');
}

function handleSubmit() {
  // Store basic info for later submission
  const basicInfo = {
    fullName: form.fullName,
    displayName: form.displayName,
    instagram: form.instagram,
    facebook: form.facebook,
    avatar: avatarFile.value
  };

  // Store in session storage for use in professional info page
  if (process.client) {
    sessionStorage.setItem('artistBasicInfo', JSON.stringify(basicInfo));
  }

  router.push('/register/professional-information');
}
</script>