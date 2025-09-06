<template>
  <div class="min-h-screen flex gap-4">
    <RegisterStepContent :current-step="3" />

    <div class="flex-1 px-12 pt-[6.25rem] pb-[3.75rem] card bg-white text-black rounded-3xl w-full">
      <div class="flex flex-col items-center">
        <p class="text-xl text-secondary-100 font-semibold">Almost there,</p>
        <h2 class="text-3xl font-bold mb-8">Add your professional info</h2>
        <form @submit.prevent="handleSubmit" class="w-full">
          <div class="flex flex-col gap-5 mb-8">
            <InputOutline v-model="form.websiteLink" label="Website Link"
              placeholder="Paste your website link (optional)" type="text" :icon="IconsGlobe" />
            <InputOutline v-model="form.location" label="Location" placeholder="Select city you are resident artist in"
              type="select" :icon="IconsMapPinHouse" :options="[
                {
                  label: 'Zurich',
                  value: 'Zurich',
                },
                {
                  label: 'Bern',
                  value: 'Bern',
                },
                {
                  label: 'Basel',
                  value: 'Basel',
                },
                {
                  label: 'Luzern',
                  value: 'Luzern',
                },
                {
                  label: 'Winterthur',
                  value: 'Winterthur',
                },
              ]" />
            <InputOutline v-model="form.language" label="Language" placeholder="Select language(s) you speak"
              type="select" :icon="IconsLanguages" :options="[
                {
                  label: 'German',
                  value: 'German',
                },
                {
                  label: 'English',
                  value: 'English',
                },
                {
                  label: 'Italian',
                  value: 'Italian',
                },
                {
                  label: 'French',
                  value: 'French',
                },
                {
                  label: 'Portuguese',
                  value: 'Portuguese',
                },
                {
                  label: 'Spanish',
                  value: 'Spanish',
                },
              ]" multiple />
            <div class="flex gap-5">
              <InputOutline v-model="form.sex" label="Sex" placeholder="Your Sex" type="select" :icon="IconsLanguages"
                :options="[
                  {
                    label: 'Male',
                    value: 'Male',
                  },
                  {
                    label: 'Female',
                    value: 'Female',
                  },
                  {
                    label: 'Non-Binary',
                    value: 'Non-Binary',
                  },
                  {
                    label: 'Other',
                    value: 'Other',
                  },
                ]" />
              <InputOutline v-model="form.birthday" label="Birthday" placeholder="Your Birthday" type="date"
                :icon="IconsCake" />
            </div>
            <div class="flex items-end gap-1.5">
              <InputOutline v-model="form.rate" label="Rate" placeholder="Set your minimum rate" type="number"
                :icon="IconsCake" />
              <div class="w-[18.75rem]">
                <InputOutline v-model="form.currency" placeholder="Currency" type="select" :icon="IconsCurrency"
                  :options="[{
                    label: 'USD',
                    value: 'USD',
                  }]" />
              </div>
            </div>
            <InputOutline v-model="form.budget" placeholder="Select  budget range" type="select" :icon="IconsCalculator"
              :options="[
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
          </div>
          <div class="flex gap-6">
            <button type="button" class="btn border border-primary-yellow rounded-full flex-grow font-semibold"
              @click="handleBack">
              Back
            </button>
            <button type="submit" class="btn bg-primary-yellow text-black rounded-full flex-grow font-semibold border-0">
              Verify Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconsGlobe from '@/components/Icons/Globe.vue';
import IconsMapPinHouse from '@/components/Icons/MapPinHouse.vue';
import IconsLanguages from '@/components/Icons/Languages.vue';
import IconsCake from '@/components/Icons/Cake.vue';
import IconsCoins from '@/components/Icons/Coins.vue';
import IconsCurrency from '@/components/Icons/Currency.vue';
import IconsCalculator from '@/components/Icons/Calculator.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

definePageMeta({
  layout: 'auth',
});

const form = reactive({
  websiteLink: '',
  location: '',
  language: '',
  sex: '',
  birthday: '',
  rate: '',
  currency: '',
  budget: '',
});

function handleBack() {
  router.push('/register/basic-info');
}

function handleSubmit() {
  router.push('/register/verify-profile');
}
</script>