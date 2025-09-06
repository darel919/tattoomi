<template>
  <div class="min-h-screen flex gap-4">
    <RegisterStepContent />

    <div class="flex-1 px-12 pt-[6.25rem] pb-[3.75rem] card bg-white text-black rounded-3xl w-full">
      <div class="flex flex-col items-center">
        <p class="text-xl text-secondary-100 font-semibold">Check your mailbox</p>
        <h2 class="text-3xl font-bold mb-8">Email Verification</h2>
        <div class="mb-8">
          <IconsMailCheck />
        </div>
        <p class="roboto text-secondary-90 max-w-[30rem] text-center mb-8">
          We have mailed you a 6-digit code. Please check your email and enter the code to complete the verification
          process
        </p>
        <div class="mb-8">
          <InputOtp @change="onOtpChange" />
        </div>
        <button type="submit" class="btn bg-primary-yellow text-black rounded-full w-full font-semibold border-0 mb-8"
          @click="handleSubmit">
          Verify Email
        </button>
        <p class="roboto text-secondary-90 max-w-[30rem] text-center">
          Didn’t receive the code? <button class="btn btn-link p-0 font-normal border-0">Resend Code</button>
        </p>
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

const form = reactive({
  code: '',
});

function onOtpChange(code) {
  console.log('OTP Entered:', code)
  form.code = code;
}

function handleSubmit() {
  router.push('/register/basic-info');
}
</script>