<template>
  <div class="min-h-screen flex gap-4">
    <AuthSideContent />

    <div class="flex-1 px-12 pt-[6.25rem] pb-[3.75rem] card bg-white rounded-3xl w-full">
      <div>
        <p class="text-lg text-secondary-100 font-bold">Welcome back to Tattoomii</p>
        <h2 class="text-4xl font-bold mb-8">Sign in to your account</h2>

        <button
          class="btn bg-dark-100 rounded-full py-0.5 px-1 flex justify-center items-center gap-2 text-white w-full font-semibold text-sm">
          <img src="/assets/images/logo_google.png" alt="Google">
          Sign In with Google
        </button>

        <div class="divider before:bg-secondary-400 after:bg-secondary-400 mb-8">or</div>

        <form class="mb-10" @submit="handleSubmit">
          <div class="flex flex-col gap-5 mb-8">
            <InputOutline v-model="form.email" label="Email Address" placeholder="Enter your email address" type="email"
              :icon="IconsMail" required />
            <InputOutline v-model="form.password" label="Password" placeholder="Minimum 8 Characters" type="password"
              :icon="IconsLock" required minlength="8" />
          </div>

          <button type="submit"
            class="btn bg-primary-yellow rounded-full w-full font-semibold text-medium border-0">Sign In</button>
        </form>

        <p class="text-center">
          Don’t have an account?,
          <NuxtLink to="/register" class="link font-semibold">Sign Up</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconsMail from '@/components/Icons/Mail.vue';
import IconsLock from '@/components/Icons/Lock.vue';

definePageMeta({
  layout: 'auth',
})

const form = reactive({
  email: '',
  password: '',
})

function handleSubmit(e) {
  e.preventDefault();
}
</script>