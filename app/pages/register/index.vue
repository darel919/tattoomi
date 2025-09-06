<template>
  <div class="min-h-screen flex gap-4">
    <AuthSideContent />

    <div class="flex-1 px-12 pt-[6.25rem] pb-[3.75rem] card bg-white rounded-3xl w-full">
      <div>
        <p class="text-lg text-secondary-100 font-bold">Welcome to Tattoomii</p>
        <h2 class="text-4xl font-bold mb-8">Get Registered</h2>

        <div class="border border-secondary-300 rounded-full flex gap-4 max-w-[13.75rem] mb-8">
          <button class="btn btn-ghost grow rounded-full" @click="handleChangeRole('user')">
            <span :class="{ 'text-secondary-200': form.role != 'user' }">User</span>
          </button>
          <button class="btn btn-ghost grow rounded-full" @click="handleChangeRole('artist')">
            <span :class="{ 'text-secondary-200': form.role != 'artist' }">Artist</span>
          </button>
        </div>

        <button
          class="btn bg-dark-100 rounded-full py-0.5 px-1 flex justify-center items-center gap-2 text-white w-full font-semibold text-sm">
          <img src="/assets/images/logo_google.png" alt="Google">
          Sign Up with Google
        </button>

        <div class="divider before:bg-secondary-400 after:bg-secondary-400 mb-8">or</div>

        <form class="mb-10" @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-5 mb-8">
            <InputOutline v-model="form.email" label="Email Address" placeholder="Enter your email address" type="email"
              :icon="IconsMail" required />
            <InputOutline v-model="form.phone" label="Phone Number" placeholder="Enter your phone number" type="tel"
              :icon="IconsPhone" required />
            <InputOutline v-model="form.password" label="Password" placeholder="Minimum 8 Characters" type="password"
              :icon="IconsLock" required minlength="8" />
          </div>

          <button type="submit"
            class="btn bg-primary-yellow rounded-full w-full font-semibold text-medium border-0">Sign Up</button>
        </form>

        <p class="text-center">
          Already have an account?
          <NuxtLink to="/login" class="link font-semibold">Sign In</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconsMail from '@/components/Icons/Mail.vue';
import IconsPhone from '@/components/Icons/Phone.vue';
import IconsLock from '@/components/Icons/Lock.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

definePageMeta({
  layout: 'auth',
})

const form = reactive({
  email: '',
  phone: '',
  password: '',
  role: 'user',
})

function handleSubmit() {
  if (form.role == 'user') {
    router.push('/');
  } else {
    router.push('/register/email-verification');
  }
}

function handleChangeRole(role) {
  form.role = role;
}
</script>