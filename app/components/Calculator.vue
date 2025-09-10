<template>
  <div class="bg-white border border-secondary-400 rounded-4xl px-20 py-12 shadow-sm flex flex-col justify-center">
    <h2 class="text-4xl text-dark-100 font-bold mb-3 text-center">Tattoo Price Calculator</h2>
    <p class="text-secondary-100 mb-8 text-center">Get an instant estimate for your customized tattoo</p>
    <div class="flex justify-center items-center gap-3 mb-8" v-if="currentStep != 8">
      <template v-for="(step, index) in steps" :key="step">
        <div v-if="index !== 0">
          <div class="divider w-4" :class="{
            'before:bg-dark-100 after:bg-dark-100': step <= currentStep,
            'before:bg-secondary-400 after:bg-secondary-400': step > currentStep,
          }"></div>
        </div>
        <div
          class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-colors duration-300"
          :class="{
            'bg-dark-100 text-white': step < currentStep,
            'bg-dark-100 text-white border-2 border-primary-yellow': step === currentStep,
            'bg-gray-100 text-secondary-250': step > currentStep
          }">
          {{ step }}
        </div>
      </template>
    </div>
    <div class="mb-10">
      <div v-if="currentStep == 1">
        <div class="flex flex-col gap-6">
          <h4 class="text-secondary-100 text-lg font-bold">Describe Your Tattoo or Upload a Picture</h4>
          <InputOutline placeholder="Describe your tattoo" type="textarea" />
          <div class="divider before:bg-secondary-400 after:bg-secondary-400 text-sm text-secondary-90">or</div>
          <InputOutline :icon="SquareUserRound" placeholder="Upload your picture" type="file" />
        </div>
      </div>
      <div v-if="currentStep == 2">
        <div class="flex flex-col gap-6">
          <h4 class="text-secondary-100 text-lg font-bold">
            Choose Whether You Want Your Tattoo in Color or Black-Grey
          </h4>
          <div class="flex flex-col gap-4">
            <div class="flex gap-2 items-center" v-for="item in colours">
              <input type="radio" name="colour" class="radio checked:bg-dark-100 checked:text-white" />
              <p class="text-sm font-medium text-secondary-200">{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentStep == 3">
        <div class="flex flex-col gap-6">
          <h4 class="text-secondary-100 text-lg font-bold">
            Choose the Placement for Your Tattoo.
          </h4>
          <InputOutline v-model="form.placement" placeholder="Choose your body part" type="select"
            :options="bodyParts.map((bodyPart) => ({ label: bodyPart, value: bodyPart }))" />
        </div>
      </div>
      <div v-if="currentStep == 4">
        <div class="flex flex-col gap-6">
          <h4 class="text-secondary-100 text-lg font-bold">
            Choose the Style for Your Tattoo.
          </h4>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-3">
              <div class="bg-secondary-400/50 rounded-3xl px-12 py-4 flex gap-2 items-center w-full">
                <div class="tooltip tooltip-bottom" data-tip="hello">
                  <CircleHelp :size="14" />
                </div>
                <p class="text-xs">
                  Need help choosing a style? See our
                  <NuxtLink to="/styleguide" class="font-bold"> Style Guide</NuxtLink>
                </p>
              </div>
              <InputOutline v-model="form.style" placeholder="Choose a style" type="select" :options="styles" />
            </div>
          </div>
          <h4 class="text-secondary-100 text-lg font-bold">
            Set the Level of Detail
          </h4>
          <InputOutline v-model="form.levelDetail" placeholder="Choose a level detail" type="select"
            :options="levels" />
        </div>
      </div>
      <div v-if="currentStep == 5">
        <div class="flex flex-col gap-6 mb-10">
          <h4 class="text-secondary-100 text-lg font-bold">
            Set the Size
          </h4>
          <div>
            <label class="text-secondary-90">
              Length in cm
            </label>
            <div class="mt-3">
              <InputSlider :max="20" labelValue="cm" />
            </div>
          </div>
          <div>
            <label class="text-secondary-90">
              Width (cm)
            </label>
            <div class="mt-3">
              <InputSlider :max="20" labelValue="cm" />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="bg-secondary-400/50 rounded-3xl px-12 py-4 flex gap-2 items-center w-full">
            <div class="tooltip tooltip-bottom" data-tip="hello">
              <CircleHelp :size="14" />
            </div>
            <p class="text-xs">
              Is your idea bigger than you can choose here?
              <NuxtLink to="/" class="font-bold"> Contact the artist directly</NuxtLink>
            </p>
          </div>
        </div>
      </div>
      <div v-if="currentStep == 6">
        <div class="flex flex-col gap-6">
          <h4 class="text-secondary-100 text-lg font-bold">
            Select a budget range
          </h4>
          <InputOutline v-model="form.budget" placeholder="Choose your budget" type="select"
            :options="budgets.map((item) => ({ label: item, value: item }))" />
        </div>
      </div>
      <div v-if="currentStep == 7">
        <div class="flex flex-col gap-6">
          <h4 class="text-secondary-100 text-lg font-bold">
            Choose the City Where You Want to Get Your Tattoo
          </h4>
          <InputOutline v-model="form.city" placeholder="Choose your city" type="select" :options="cities" />
        </div>
      </div>
      <div v-if="currentStep == 8">
        <div class="flex flex-col gap-6">
          <h4 class="text-secondary-100 text-lg font-bold text-center">
            Estimated Price Range
          </h4>
          <div class="bg-secondary-400/50 rounded-2xl p-4 text-center min-w-[25.75rem]">
            <p class="text-2xl font-semibold text-dark-100 mb-3">400 - 500 <span class="text-lg font-bold">CHF</span>
            </p>
            <p class="text-sm text-secondary-90">For a flower tattoo on the arm, fineline style</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-6 w-full">
      <button @click="handleChangeStep(-1)" type="button"
        class="btn border border-primary-yellow rounded-full flex-grow font-semibold">
        <span v-if="currentStep <= 7">Back</span>
        <span v-else>re-calculate</span>
      </button>
      <button @click="handleChangeStep(1)" type="button"
        class="btn bg-primary-yellow text-black rounded-full flex-grow font-semibold border-0">
        <span v-if="currentStep < 7">Next</span>
        <span v-else-if="currentStep == 7">Calculate</span>
        <span v-else>Find suitable artist</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { CircleHelp, SquareUserRound } from 'lucide-vue-next';

const router = useRouter();
const colours = ['Colour', 'Blank-Grey', 'Blank-Grey with Color accents'];
const levels = [
  {
    label: 'Low',
    value: 'Low',
  },
  {
    label: 'Medium',
    value: 'Medium',
  },
  {
    label: 'High',
    value: 'High',
  },
];
const styles = [
  {
    label: 'Comic',
    value: 'Comic',
  },
  {
    label: 'Oldschool',
    value: 'Oldschool',
  },
  {
    label: 'Tribal',
    value: 'Tribal',
  },
  {
    label: 'Watercolour',
    value: 'Watercolour',
  },
  {
    label: 'Linework',
    value: 'Linework',
  },
  {
    label: 'Neotraditional',
    value: 'Neotraditional',
  },
  {
    label: 'Anime',
    value: 'Anime',
  },
  {
    label: 'Japanase',
    value: 'Japanase',
  },
  {
    label: 'Geometric',
    value: 'Geometric',
  },
  {
    label: 'Maori',
    value: 'Maori',
  },
  {
    label: 'Heavy Blackwork',
    value: 'Heavy Blackwork',
  },
  {
    label: 'Realistic',
    value: 'Realistic',
  },
  {
    label: 'Blackwork',
    value: 'Blackwork',
  },
  {
    label: 'Botanical / Floral',
    value: 'Botanical / Floral',
  },
  {
    label: 'Fineline',
    value: 'Fineline',
  },
  {
    label: 'Surreal Blackwork',
    value: 'Surreal Blackwork',
  },
  {
    label: 'Conceptual Tattoos',
    value: 'Conceptual Tattoos',
  },
  {
    label: 'Dotwork',
    value: 'Dotwork',
  },
  {
    label: 'Etching (Engraving)',
    value: 'Etching (Engraving)',
  },
  {
    label: 'Ignorant',
    value: 'Ignorant',
  },
  {
    label: 'Cosmetic',
    value: 'Cosmetic',
  },
  {
    label: 'Bold Lettering',
    value: 'Bold Lettering',
  },
  {
    label: 'Cyber Sigilism',
    value: 'Cyber Sigilism',
  },
  {
    label: 'Ornamental',
    value: 'Ornamental',
  },
  {
    label: 'Small Lettering',
    value: 'Small Lettering',
  },
  {
    label: 'Portait',
    value: 'Portait',
  },
  {
    label: 'Microrealistic',
    value: 'Microrealistic',
  },
  {
    label: 'Chicano',
    value: 'Chicano',
  },
  {
    label: 'Small Lettering',
    value: 'Small Lettering',
  },
  {
    label: 'Mandala',
    value: 'Mandala',
  },
  {
    label: 'Abstract',
    value: 'Abstract',
  },
  {
    label: 'Coverup',
    value: 'Coverup',
  },
];
const cities = [
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
];
const bodyParts = [
  "Arm",
  "Chest",
  "Hip",
  "Back",
  "Ribs",
  "Underboob",
  "Belly",
  "Leg",
  "Hand",
  "Finger",
  "Palm",
  "Back of knee",
  "Foot",
  "Toe",
  "Head",
  "Face",
  "Intim",
  "Neck",
  "Ear",
  "Behind the ear",
  "Eyes",
  "Eyelids",
  "Tongue",
  "Lips",
  "Foot sole",
  "Armpit",
  "Inner tip"
];
const budgets = [
  'SmallLow Budget',
  'Normal Budget',
  'Large Budget',
];
const steps = [1, 2, 3, 4, 5, 6, 7];
const currentStep = ref(1);
const form = reactive({
  style: '',
  levelDetail: '',
  budget: '',
  city: '',
});

const handleChangeStep = (step) => {
  // step 8 finish
  if (currentStep.value == 8) {
    if (step == -1) {
      // re-calculate
      currentStep.value = 1;
    } else {
      // find suitiable artist
      router.push('/');
    }
    return;
  }
  currentStep.value = Math.min(Math.max(currentStep.value + step, 1), 8);
}
</script>