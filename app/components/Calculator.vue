<template>
  <ClientOnly>
    <div class="bg-white text-black border border-secondary-400 rounded-4xl px-20 py-12 shadow-sm flex flex-col justify-center">
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
              <div class="flex gap-2 items-center" v-for="item in colours" :key="item.value">
                <input type="radio" name="colour" v-model="form.color" :value="item.value" class="radio checked:bg-dark-100 checked:text-white" />
                <p class="text-sm font-medium text-secondary-200">{{ item.label }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentStep == 3">
          <div class="flex flex-col gap-6">
            <h4 class="text-secondary-100 text-lg font-bold">
              Choose the Placement for Your Tattoo.
            </h4>
            <InputOutline v-model="form.placement" placeholder="Choose your body part" type="select" :options="bodyParts" />
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
                <div>
                  <InputOutline
                    v-model="form.style"
                    :placeholder="stylesLoading ? 'Loading styles...' : 'Choose a style'"
                    type="select"
                    :options="styles"
                  />
                  <p v-if="stylesError" class="text-xs text-red-500 mt-2">Failed to load styles</p>
                </div>
              </div>
            </div>
            <h4 class="text-secondary-100 text-lg font-bold">
              Set the Level of Detail
            </h4>
            <InputOutline v-model="form.detailLevel" placeholder="Choose a level detail" type="select" :options="levels" />
          </div>
        </div>
        <div v-if="currentStep == 5">
          <div class="flex flex-col gap-6 mb-10">
            <h4 class="text-secondary-100 text-lg font-bold">
              Set the Size
            </h4>
            <div>
              <label class="text-secondary-90">
                Length in inches
              </label>
              <div class="mt-3">
                <InputSlider v-model="form.length" :max="20" labelValue="in" />
              </div>
            </div>
            <div>
              <label class="text-secondary-90">
                Width in inches
              </label>
              <div class="mt-3">
                <InputSlider v-model="form.width" :max="20" labelValue="in" />
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
            <InputOutline v-model="form.budget" placeholder="Choose your budget" type="select" :options="budgets" />
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
              <p class="text-2xl font-semibold text-dark-100 mb-3">{{ priceRange.min }} - {{ priceRange.max }} <span class="text-lg font-bold">{{ priceRange.currency }}</span>
              </p>
              <p class="text-sm text-secondary-90">For your customized tattoo</p>
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
          class="btn bg-primary-yellow text-black rounded-full flex-grow font-semibold border-0" :disabled="isCalculating">
          <span v-if="currentStep < 7">Next</span>
          <span v-else-if="currentStep == 7">{{ isCalculating ? 'Calculating...' : 'Calculate' }}</span>
          <span v-else>Find suitable artist</span>
        </button>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { CircleHelp, SquareUserRound } from 'lucide-vue-next';
import { useToast } from '~/composables/useToast';

const router = useRouter();
const colours = [
  {
    label: 'Colour',
    value: 'color',
  },
  {
    label: 'black - grey',
    value: 'black_and_grey',
  },
  {
    label: 'black-grey with color accents',
    value: 'black_and_grey_with_color',
  },
];
const levels = [
  {
    label: 'Simple',
    value: 'simple',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'Complex',
    value: 'complex',
  },
  {
    label: 'Very Complex',
    value: 'very_complex',
  },
];
const styles = ref([]);
const stylesLoading = ref(false);
const stylesError = ref(null);

const fetchStyles = async () => {
  try {
    stylesLoading.value = true;
    stylesError.value = null;
    const config = useRuntimeConfig();
      const res = await $fetch(config.public.baseURL + '/api/user/styleGuide', {
        method: 'POST',
      });
    if (res && Array.isArray(res.styleGuide)) {
  styles.value = res.styleGuide.map((s) => ({ label: s.styleName, value: s.styleName }));
    } else {
      styles.value = [];
      stylesError.value = 'Unexpected response shape';
    }
  } catch (err) {
    styles.value = [];
    stylesError.value = err?.message || String(err) || 'Failed to load styles';
    const { toast } = useToast();
    toast('error', 'Failed to load styles. Please try again.');
  } finally {
    stylesLoading.value = false;
  }
};
const cities = [
  {
    label: 'New York',
    value: 'new york',
  },
  {
    label: 'Los Angeles',
    value: 'los angeles',
  },
  {
    label: 'Chicago',
    value: 'chicago',
  },
  {
    label: 'Houston',
    value: 'houston',
  },
  {
    label: 'Phoenix',
    value: 'phoenix',
  },
];
const bodyParts = [
  {
    label: 'Arm',
    value: 'arm',
  },
  {
    label: 'Leg',
    value: 'leg',
  },
  {
    label: 'Back',
    value: 'back',
  },
  {
    label: 'Chest',
    value: 'chest',
  },
  {
    label: 'Ribs',
    value: 'ribs',
  },
  {
    label: 'Hand',
    value: 'hand',
  },
  {
    label: 'Foot',
    value: 'foot',
  },
  {
    label: 'Neck',
    value: 'neck',
  },
  {
    label: 'Face',
    value: 'face',
  },
];
const budgets = [
  {
    label: 'Basic',
    value: 'basic',
  },
  {
    label: 'Standard',
    value: 'standard',
  },
  {
    label: 'Premium',
    value: 'premium',
  },
];
const steps = [1, 2, 3, 4, 5, 6, 7];
const currentStep = ref(1);
const priceRange = ref({ min: 0, max: 0, currency: 'CHF' });
const isCalculating = ref(false);
const form = reactive({
  color: '',
  placement: '',
  style: '',
  length: 4,
  width: 4,
  detailLevel: '',
  budget: '',
  city: '',
});

const handleChangeStep = async (step) => {
  // step 8 finish
  if (currentStep.value == 8) {
    if (step == -1) {
      // re-calculate
      currentStep.value = 1;
      priceRange.value = { min: 0, max: 0, currency: 'CHF' };
    } else {
      
  const buildQuery = () => {
  const q = {};

        const maybeValue = (val) => {
          if (val == null) return null;
          if (typeof val === 'object' && 'value' in val) return val.value;
          return val;
        };
        const fields = ['color', 'placement', 'style', 'budget', 'city'];
        fields.forEach((f) => {
          const v = maybeValue(form[f]);
          if (v !== null && v !== undefined && v !== '') {
            q[f] = String(v);
          }
        });

        return q;
      };

      const query = buildQuery();
      router.push({ path: '/', query });
    }
    return;
  }

  // Calculate price when moving from step 7 to 8
  if (currentStep.value == 7 && step == 1) {
    await calculatePrice();
    return;
  }

  currentStep.value = Math.min(Math.max(currentStep.value + step, 1), 8);
}

const calculatePrice = async () => {
  try {
    isCalculating.value = true;
    localStorage.setItem('tattooCalculatorForm', JSON.stringify(form));
    const apiData = {
      color: form.color,
      placement: form.placement?.value || form.placement,
      style: form.style?.value || form.style,
      length: form.length.toString(),
      width: form.width.toString(),
      detailLevel: form.detailLevel?.value || form.detailLevel,
      budget: form.budget?.value || form.budget,
      city: form.city?.value || form.city,
    };
    const config = useRuntimeConfig();
    const response = await $fetch(config.public.baseURL+ '/api/user/priceCalculator', {
      method: 'POST',
      body: apiData,
    });

    // localStorage.removeItem('tattooCalculatorForm');
    priceRange.value = response.priceRange;
    currentStep.value = 8;

  } catch (error) {
    console.error('Price calculation failed:', error);
    const { toast } = useToast();
    toast('error', 'Failed to calculate price. Please try again.');
  } finally {
    isCalculating.value = false;
  }
}

onMounted(() => {
  localStorage.removeItem('tattooCalculatorForm');
  const savedForm = localStorage.getItem('tattooCalculatorForm');
  if (savedForm) {
    try {
      const parsedForm = JSON.parse(savedForm);
      Object.assign(form, parsedForm);
    } catch (error) {
      const { toast } = useToast();
      toast('error', 'Failed to load saved form data.');
    }
  }
  fetchStyles();
});

</script>