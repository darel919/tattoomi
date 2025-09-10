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
        <button type="submit" class="btn bg-primary-yellow text-black rounded-full w-full font-semibold border-0 mb-4"
          @click="handleSubmit" :disabled="isLoading">
          <span v-if="isLoading" class="loading-spinner"></span>
          Verify Email
        </button>
        <!-- Testing button - remove in production -->
        <button type="button" class="btn btn-outline btn-warning rounded-full w-full font-semibold border-2 mb-8"
          @click="handleCheckVerificationStatus">
          🔧 Check Verification Status (Testing Only)
        </button>
        <p class="roboto text-secondary-90 max-w-[30rem] text-center">
          Didn't receive the code? <button class="btn btn-link p-0 font-normal border-0" @click="handleResendCode">Resend Code</button>
        </p>
        <div v-if="verificationStatus" class="mt-4 p-4 bg-gray-100 rounded-lg text-center">
          <p class="text-sm font-semibold">Verification Status:</p>
          <p :class="verificationStatus.isVerified ? 'text-green-600' : 'text-red-600'">
            {{ verificationStatus.isVerified ? '✅ Email Verified' : '❌ Email Not Verified' }}
          </p>
          <p v-if="verificationStatus.message" class="text-xs text-gray-600 mt-1">
            {{ verificationStatus.message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useMyAuthStore } from '@/stores/auth';
import { useToast } from '@/composables/useToast';

const router = useRouter();
const authStore = useMyAuthStore();
const { toast } = useToast();

definePageMeta({
  layout: 'auth',
});

const form = reactive({
  code: '',
});

const verificationStatus = ref(null);
const isLoading = ref(false);

function onOtpChange(code) {
  console.log('OTP Entered:', code)
  form.code = code;
}

async function handleSubmit() {
  if (!form.code || form.code.length !== 6) {
    toast('error', 'Please enter a valid 6-digit verification code');
    return;
  }

  isLoading.value = true;
  try {
    const response = await authStore.verifyEmail(form.code);
    toast('success', 'Email verified successfully!');
    router.push('/register/basic-info');
  } catch (error) {
    const message = error.response?.data?.message || 'Verification failed. Please try again.';
    toast('error', message);
  } finally {
    isLoading.value = false;
  }
}

async function handleResendCode() {
  try {
    await authStore.sendVerificationCode();
    toast('success', 'Verification code sent to your email');
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to resend code. Please try again.';
    toast('error', message);
  }
}

async function handleCheckVerificationStatus() {
  try {
    // Fetch user data which includes isVerifiedEmail status
    await authStore.fetchUser();

    const isVerified = authStore.user?.isVerifiedEmail || false;

    verificationStatus.value = {
      isVerified: isVerified,
      message: isVerified ? 'Email is verified' : 'Email is not verified'
    };

    if (isVerified) {
      toast('success', 'Email is already verified! You can proceed to the next step.');
      setTimeout(() => {
        router.push('/register/basic-info');
      }, 2000);
    } else {
      toast('info', 'Email is not yet verified. Please check your email for the verification code.');
    }
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to check verification status.';
    toast('error', message);
    verificationStatus.value = {
      isVerified: false,
      message: 'Error checking status: ' + message
    };
  }
}

// Send verification code on page load
onMounted(async () => {
  try {
    await authStore.sendVerificationCode();
  } catch (error) {
    console.warn('Failed to send initial verification code:', error);
  }
});
</script>

<style scoped>
.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>