<template>
  <div class="min-h-screen flex gap-4">
    <AuthSideContent />

    <div class="flex-1 px-12 pt-[6.25rem] pb-[3.75rem] card bg-white text-black rounded-3xl w-full">
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

        <div class="divider before:bg-secondary-400 after:bg-secondary-400 py-8">or</div>

        <form class="mb-10" @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-5 mb-8">
            <InputOutline v-if="form.role === 'user'" v-model="form.fullName" label="Full Name" placeholder="Enter your full name" type="text"
              :icon="IconsUserRound" required />
            <InputOutline v-if="form.role === 'artist'" v-model="form.phoneNumber" label="Phone Number" placeholder="Enter your phone number" type="tel"
              :icon="IconsPhone" required />
            <InputOutline v-model="form.email" label="Email Address" placeholder="Enter your email address" type="email"
              :icon="IconsMail" required />
            <InputOutline v-model="form.password" label="Password" placeholder="Minimum 8 Characters" type="password"
              :icon="IconsLock" required minlength="8" />
          </div>

          <button type="submit"
            class="btn bg-primary-yellow text-black rounded-full w-full font-semibold text-medium border-0">Sign Up</button>
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
import IconsLock from '@/components/Icons/Lock.vue';
import IconsUserRound from '@/components/Icons/UserRound.vue';
import IconsPhone from '@/components/Icons/Phone.vue';
import { useRouter } from 'vue-router';
import { useMyAuthStore } from '@/stores/auth';
import { useToast } from '@/composables/useToast';
const router = useRouter();
const authStore = useMyAuthStore()
const { toast } = useToast()

definePageMeta({
  layout: 'auth',
})

const form = reactive({
  fullName: '',
  phoneNumber: '',
  email: '',
  password: '',
  role: 'user',
})

const errorMessage = ref('')

async function handleSubmit() {
  if (form.role === 'user') {
    errorMessage.value = ''
    try {
      await authStore.register(form.email, form.password, form.fullName)
      await navigateTo('/')
    } catch (error) {
      const extractReason = (err) => {
        if (err && err.response && err.response._data && err.response._data.message) {
          return String(err.response._data.message)
        }
        if (err && typeof err.message === 'string' && err.message.length > 0) {
          const m = err.message
          if (m.includes('Failed to fetch')) return 'Network error'
          const parts = m.split(': ')
          return parts[parts.length - 1]
        }
        return 'An error occurred. Please try again.'
      }

      const reason = extractReason(error)
      const message = `Failed to register: ${reason}`
      errorMessage.value = reason
      toast('error', message)
    }
  } else if (form.role === 'artist') {
    errorMessage.value = ''
    try {
      await authStore.registerArtist(form.email, form.password, form.phoneNumber)
      router.push('/register/email-verification');
    } catch (error) {
      const extractReason = (err) => {
        if (err && err.response && err.response._data && err.response._data.message) {
          return String(err.response._data.message)
        }
        if (err && typeof err.message === 'string' && err.message.length > 0) {
          const m = err.message
          if (m.includes('Failed to fetch')) return 'Network error'
          const parts = m.split(': ')
          return parts[parts.length - 1]
        }
        return 'An error occurred. Please try again.'
      }

      const reason = extractReason(error)
      const message = `Failed to register: ${reason}`
      errorMessage.value = reason
      toast('error', message)
    }
  }
}

function handleChangeRole(role) {
  form.role = role;
}
</script>