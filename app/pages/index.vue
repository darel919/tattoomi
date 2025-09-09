<template>
  <div class="mx-12 my-8">
    <section v-if="viewMode === 'list'">
      <p>All Artists</p>
      <h1 class="text-3xl font-bold">Find the perfect Tattoo Artist for your idea</h1>
    </section>
    <section class="mt-7 mb-16 relative">
      <div class="border border-secondary-400 rounded-2xl px-5 py-2 shadow-md flex gap-4 justify-between items-center">
        <div class="flex flex-col justify-center items-center gap-4">
          <div class="grow bg-base-200 rounded-2xl px-2 py-2">
            <div ref="specialityGrid" class="grid grid-cols-8 w-full gap-4 overflow-hidden speciality-grid"
              :class="{ 'collapsed': modeSpeciality == 'less' }">
              <button @click="handleToggleSelectedSpesiciality(speciality)"
                class="flex flex-col items-center gap-1 text-secondary-90 dark:text-white px-2 py-1.5 cursor-pointer"
                :class="{ 'border border-primary-yellow rounded-2xl bg-primary-yellow/10': selectedSpecialities.includes(speciality.id) }"
                v-for="(speciality, index) in specialities" :key="index">
                <component v-if="speciality.icon" :is="speciality.icon" :size="28" />
                <p class="text-xs text-center">{{ speciality.text }}</p>
              </button>
            </div>
          </div>
          <!-- removed duplicate button; single toggle below -->
        </div>
        <button @click="handleToggleModeSpeciality" type="button"
          class="btn border border-secondary-90 rounded-full font-medium px-2.5 py-1.5 text-sm flex justify-center items-center gap-1.5">
          <template v-if="modeSpeciality === 'more'">
            <ArrowUp :size="20" />
            view less
          </template>
          <template v-else>
            <ArrowDown :size="20" />
            view more
          </template>
        </button>
        <button @click="handleToggleFilter" type="button"
          class="btn border border-secondary-90 rounded-full font-medium px-2.5 py-1.5 text-sm flex justify-center items-center gap-1.5">
          <ListFilter :size="20" />
          filters
        </button>
      </div>
      <Transition>
        <div v-if="filterIsOpen"
          class="z-[999] absolute bg-white p-4 bottom-0 right-0 translate-y-full rounded-2xl shadow-md ">
          <h3 class="text-dark-100 font-bold text-xl">Filters</h3>
          <div class="divider before:bg-secondary-400 after:bg-secondary-400 py-4"></div>
          <div class="flex gap-6">
            <div class="flex flex-col gap-4 w-[14.625rem]">
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Budget
                </label>
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <div class="flex gap-2 items-center" v-for="item in budgets">
                    <input type="radio" class="radio checked:bg-dark-100 checked:text-white" />
                    <p class="text-sm font-medium text-secondary-200">{{ item }}</p>
                  </div>
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Sex
                </label>
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <div class="flex gap-2 items-center" v-for="item in sexs">
                    <input type="radio" class="radio checked:bg-dark-100 checked:text-white" />
                    <p class="text-sm font-medium text-secondary-200">{{ item }}</p>
                  </div>
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Language
                </label>
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <div class="flex gap-2 items-center" v-for="item in languages">
                    <input type="radio" class="radio checked:bg-dark-100 checked:text-white" />
                    <p class="text-sm font-medium text-secondary-200">{{ item }}</p>
                  </div>
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Colours
                </label>
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <div class="flex gap-2 items-center" v-for="item in colours">
                    <input type="radio" class="radio checked:bg-dark-100 checked:text-white" />
                    <p class="text-sm font-medium text-secondary-200">{{ item }}</p>
                  </div>
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Hygiene Certificate
                </label>
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <div class="flex gap-2 items-center" v-for="item in hygieneCertificate">
                    <input type="radio" class="radio checked:bg-dark-100 checked:text-white" />
                    <p class="text-sm font-medium text-secondary-200">{{ item }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="divider lg:divider-horizontal before:bg-secondary-400 after:bg-secondary-400"></div>
            <div class="flex flex-col gap-4 w-[14.625rem]">
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Min. Rating
                </label>
                <div class="mt-2">
                  <InputSlider />
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Min. Price
                </label>
                <div class="mt-2">
                  <InputSlider />
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Min. Experience
                </label>
                <div class="mt-2">
                  <InputStep />
                </div>
              </div>
              <div class="px-3 py-2">
                <label class="text-secondary-90 text-sm font-bold">
                  Avg. waiting time (weeks)
                </label>
                <div class="mt-2">
                  <InputSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </section>
    <ArtistInfoCard v-if="viewMode === 'list'" :item="mockupData" />
    <ArtistMapView v-if="viewMode === 'map'" />
    <section class="my-4">
      <button v-if="viewMode === 'list'" @click="viewMode = 'map'; scrollToTop()"
        class="flex flex-row items-center gap-1 bg-hero text-black rounded-full px-6 py-4 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-map-icon lucide-map mr-2">
          <path
            d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
          <path d="M15 5.764v15" />
          <path d="M9 3.236v15" />
        </svg>
        <p class="font-bold">Go to Map View</p>
      </button>
      <button v-if="viewMode === 'map'" @click="viewMode = 'list'; scrollToTop()"
        class="flex flex-row items-center gap-1 bg-hero text-black rounded-full px-6 py-4 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-map-icon lucide-map mr-2">
          <path
            d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
          <path d="M15 5.764v15" />
          <path d="M9 3.236v15" />
        </svg>
        <p class="font-bold">Go to Card View</p>
      </button>
    </section>
  </div>
</template>

<script setup>
import { ArrowDown, ArrowUp, CircleParking, CirclePlus, CloudLightning, Hand, Heart, ListFilter, LockKeyhole, Pin, Rainbow, Star, TrainFront } from 'lucide-vue-next';
import CustomIconVeganColours from "@/components/CustomIcon/VeganColours";
import CustomIconSavespace from "@/components/CustomIcon/Savespace";
import CustomIconCoverups from "@/components/CustomIcon/Coverups";
import CustomIconWheelchair from "@/components/CustomIcon/Wheelchair";

import { nextTick } from 'vue'

const modeSpeciality = ref('less');
const selectedSpecialities = reactive([]);
const specialities = [
  {
    id: 1,
    icon: CustomIconVeganColours,
    text: 'Vegan Colours',
  },
  {
    id: 2,
    icon: CustomIconSavespace,
    text: 'Savespace',
  },
  {
    id: 3,
    icon: Rainbow,
    text: 'LGBTQ+ friendly',
  },
  {
    id: 4,
    icon: CustomIconCoverups,
    text: 'Coverups',
  },
  {
    id: 5,
    icon: LockKeyhole,
    text: 'High Privacy',
  },
  {
    id: 6,
    icon: CircleParking,
    text: 'Client Parking',
  },
  {
    id: 7,
    icon: Heart,
    text: 'Sacred Tattooing',
  },
  {
    id: 8,
    icon: Star,
    text: 'Luxury experience',
  },
  {
    id: 9,
    icon: Hand,
    text: 'Handpoke',
  },
  {
    id: 10,
    icon: CustomIconWheelchair,
    text: 'Wheelchair accessible',
  },
  {
    id: 11,
    icon: CloudLightning,
    text: 'Scar Coverups',
  },
  {
    id: 12,
    icon: Pin,
    text: 'Unique location',
  },
  {
    id: 13,
    icon: CirclePlus,
    text: 'Regular Customers Advantages',
  },
  {
    id: 14,
    icon: TrainFront,
    text: 'Well-Served by Public Transport',
  },
];

const handleToggleSelectedSpesiciality = (speciality) => {
  if (selectedSpecialities.includes(speciality.id)) {
    selectedSpecialities.splice(selectedSpecialities.indexOf(speciality.id), 1);
  } else {
    selectedSpecialities.push(speciality.id);
  }
}

const specialityGrid = ref(null)

const handleToggleModeSpeciality = async () => {
  const el = specialityGrid.value
  const collapsedHeight = 70
  if (!el) {
    modeSpeciality.value = modeSpeciality.value === 'less' ? 'more' : 'less'
    return
  }

  // Ensure DOM updated
  await nextTick()

  // Measure full height
  const fullHeight = el.scrollHeight

  // Prepare transition
  el.style.transition = 'height 350ms ease-in-out'

  if (modeSpeciality.value === 'less') {
    // expand from collapsed to full
    el.style.height = `${collapsedHeight}px`
    // force reflow
    el.getBoundingClientRect()
    el.style.height = `${fullHeight}px`
    modeSpeciality.value = 'more'
    // clear inline height after transition so content can flow naturally
    setTimeout(() => { el.style.height = '' }, 360)
  } else {
    // collapse from full to collapsed
    el.style.height = `${el.scrollHeight}px`
    el.getBoundingClientRect()
    el.style.height = `${collapsedHeight}px`
    modeSpeciality.value = 'less'
    setTimeout(() => { el.style.height = '' }, 360)
  }
}

const viewMode = ref('list');
const mockupData = [
  { id: 1, name: 'Stephen C', verified: true, hygiene_cert: true, location: 'San Francisco', rating: 4.9, lang: [{ lang_id: 1, lang_name: 'German' }, { lang_id: 2, lang_name: 'English' }], years_experience: 2.5, waitingTime: 14, price: 3, category: [{ cat_id: 1, cat_name: 'Ornamental' }, { cat_id: 2, cat_name: 'Heavy Blackwork' }, { cat_id: 3, cat_name: 'Comic' }, { cat_id: 4, cat_name: 'Tribal' }, { cat_id: 5, cat_name: 'Watercolor' }] },
  { id: 2, name: 'Anna K', verified: true, hygiene_cert: true, location: 'Los Angeles', rating: 4.8, lang: [{ lang_id: 1, lang_name: 'Spanish' }, { lang_id: 2, lang_name: 'English' }], years_experience: 3, waitingTime: 10, price: 4, category: [{ cat_id: 1, cat_name: 'Portrait' }, { cat_id: 2, cat_name: 'Minimalist' }, { cat_id: 3, cat_name: 'Dotwork' }, { cat_id: 4, cat_name: 'Fineline' }, { cat_id: 5, cat_name: 'Geometric' }] },
  { id: 3, name: 'Michael B', verified: true, hygiene_cert: true, location: 'New York', rating: 4.7, lang: [{ lang_id: 1, lang_name: 'French' }, { lang_id: 2, lang_name: 'English' }], years_experience: 5, waitingTime: 20, price: 5, category: [{ cat_id: 1, cat_name: 'Oldschool' }, { cat_id: 2, cat_name: 'Neotraditional' }, { cat_id: 3, cat_name: 'Realistic' }, { cat_id: 4, cat_name: 'Microrealistic' }, { cat_id: 5, cat_name: 'Fineline' }] },
  { id: 4, name: 'Sofia L', verified: true, hygiene_cert: true, location: 'Miami', rating: 4.6, lang: [{ lang_id: 1, lang_name: 'Italian' }, { lang_id: 2, lang_name: 'English' }], years_experience: 4, waitingTime: 15, price: 3, category: [{ cat_id: 1, cat_name: 'Japanese' }, { cat_id: 2, cat_name: 'Geometric' }, { cat_id: 3, cat_name: 'Mandala' }, { cat_id: 4, cat_name: 'Botanical / Floral' }, { cat_id: 5, cat_name: 'Coverup' }] },
  { id: 5, name: 'David R', verified: true, hygiene_cert: true, location: 'Chicago', rating: 4.5, lang: [{ lang_id: 1, lang_name: 'Portuguese' }, { lang_id: 2, lang_name: 'English' }], years_experience: 6, waitingTime: 25, price: 4, category: [{ cat_id: 1, cat_name: 'Blackwork' }, { cat_id: 2, cat_name: 'Dotwork' }, { cat_id: 3, cat_name: 'Surreal Blackwork' }, { cat_id: 4, cat_name: 'Etching (Engraving)' }, { cat_id: 5, cat_name: 'Abstract' }] }
];

const filterIsOpen = ref(false);
const budgets = ['Small', 'Medium', 'Large'];
const sexs = ['Female', 'Male', 'Non-Binary', 'Other'];
const languages = ['German', 'English', 'Italian', 'French'];
const colours = ['Blank n Grey', 'Colour', 'Blank n Grey with Color'];
const hygieneCertificate = ['Yes', 'No'];

const handleToggleFilter = () => {
  filterIsOpen.value = !filterIsOpen.value;
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

useHead({
  title: 'Home | tattooMii',
})
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* Smooth expand/collapse for specialties */
.speciality-grid {
  transition: height 350ms ease-in-out, opacity 200ms ease-in-out;
  height: auto;
  opacity: 1;
  overflow: hidden;
}
.speciality-grid.collapsed {
  opacity: 0.95;
  height: 70px;
}
</style>
