<template>
  <section v-if="props.data">
    <section class="flex flex-row items-center">
      <!-- ARTIST AVATAR  -->
      <div v-if="props.data.profileImage" class="avatar mr-4">
        <div class="w-24 rounded-full">
          <img :src="`${props.data.profileImage}`" />
        </div>
      </div>
      <!-- ARTIST NAME AND RATE -->
      <section>
        <!-- NAME -->
        <section class="flex flex-row items-center mb-2">
          <h2 v-if="props.data.fullName" class="text-2xl font-bold mr-2">{{ props.data.fullName}}</h2>
          <section class="flex flex-row items-center">
            <div v-if="props.data.isVerified" class="tooltip" data-tip="This artist has been verified by Tattoomii team.">
              <button type="button" class="btn btn-ghost p-0 w-6 h-6 flex items-center justify-center"
                aria-label="Verified artist">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0291F0" stroke="#fff"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                  <path
                    d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </button>
            </div>

            <div v-if="hasHygieneCertificate(props.data)" class="tooltip ml-2" data-tip="This artist has uploaded a hygiene certificate">
              <button type="button" class="btn btn-ghost p-0 w-5 h-5 flex items-center justify-center"
                aria-label="Hygiene certificate">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                  <path
                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="M9 12h6" />
                  <path d="M12 9v6" />
                </svg>
              </button>
            </div>
          </section>
        </section>
        <!-- LOCATION -->
        <section v-if="props.data.studio" class="flex flex-row items-center gap-2 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-map-pin-icon lucide-map-pin">
            <path
              d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p class="text-gray-600">{{ `${props.data.studio.city}, ${props.data.studio.state}` }}</p>
        </section>
        <!-- RATING -->
        <section v-if="props.data.isVerified !== undefined" class="flex flex-row items-center gap-2 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-star">
            <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" />
          </svg>
          <p class="text-gray-600">{{ props.data.isVerified ? 'Verified Artist' : 'Unverified' }}</p>
        </section>
      </section>
    </section>
   
    <!-- ARTIST CONTACT -->
    <section class="flex gap-3 py-4 pb-4">
      <a v-if="props.data.phoneNumber" :href="`tel:${props.data.phoneNumber}`" target="_blank"
        class="btn btn-circle btn-outline border-primary-yellow hover:bg-primary-yellow">
        <Phone :size="16" />
      </a>
      <a v-if="props.data.instagram" :href="`https://instagram.com/${props.data.instagram}`" target="_blank"
        class="btn btn-circle btn-outline border-primary-yellow hover:bg-primary-yellow">
        <Instagram :size="16"/>
      </a>
      <a v-if="props.data.facebook" :href="`https://facebook.com/${props.data.facebook}`" target="_blank"
        class="btn btn-circle btn-outline border-primary-yellow hover:bg-primary-yellow">
        <Facebook :size="16"/>
      </a>
      <a v-if="props.data.websiteLink" :href="`${props.data.websiteLink}`" target="_blank"
        class="btn btn-circle btn-outline border-primary-yellow hover:bg-primary-yellow">
        <<Globe :size="16"/>
      </a>
    </section>
    <!-- ARTIST ACTION -->
    <section v-if="!props.readonly">
      <div class="flex gap-6 w-full">
        <NuxtLink :to="`/artist/${props.data.artistId}`" class="btn border border-primary-yellow rounded-full flex-grow font-semibold">
          See Public View
        </NuxtLink>
        <button type="button" class="btn bg-primary-yellow text-black rounded-full flex-grow font-semibold border-0">
          Profile Settings
        </button>
      </div>
      <div class="divider before:bg-secondary-400 after:bg-secondary-400 py-8"></div>
    </section>
    <!-- ARTIST DETAILS -->
    <section>
      <div class="w-full bg-base-100 p-3 rounded-lg">
        <ul class="space-y-4">
          <li class="flex items-center">
            <div class="w-10 -mt-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div class="flex-1 pl-3 flex flex-col justify-center">
              <div class="text-sm font-medium">Years' experiences</div>
              <div class="h-px bg-base-200 mt-2"></div>
            </div>
              <div class="ml-4 text-sm text-gray-500 whitespace-nowrap flex items-center">{{ computeYears(props.data.startYear) }} years
            </div>
            <button v-if="!props.readonly" onclick="modal_edit_profile_experience.show()"
              class="ml-2.5 btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
              <Pencil :size="20" />
            </button>
          </li>

          <li class="flex items-center">
            <div class="w-10 -mt-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div class="flex-1 pl-3 flex flex-col justify-center">
              <div class="text-sm font-medium">Language</div>
              <div class="h-px bg-base-200 mt-2"></div>
            </div>
            <div class="ml-4 text-sm text-gray-500 whitespace-nowrap flex items-center">{{ formatSpokenLanguage(props.data.spokenLanguage) }}</div>
            <button v-if="!props.readonly" onclick="modal_edit_profile_language.show()"
              class="ml-2.5 btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
              <Pencil :size="20" />
            </button>
          </li>

          <li class="flex items-center">
            <div class="w-10 -mt-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div class="flex-1 pl-3 flex flex-col justify-center">
              <div class="text-sm font-medium">Rate</div>
              <div class="h-px bg-base-200 mt-2"></div>
            </div>
            <div class="ml-4 text-sm text-gray-500 whitespace-nowrap flex items-center">${{ props.data.rate }}
            </div>
            <button v-if="!props.readonly" onclick="modal_edit_profile_rate.show()"
              class="ml-2.5 btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
              <Pencil :size="20" />
            </button>
          </li>

          <li class="flex items-center">
            <div class="w-10 -mt-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 1v22" />
                <path d="M17 5H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H7" />
              </svg>
            </div>
            <div class="flex-1 pl-3 flex flex-col justify-center">
              <div class="text-sm font-medium">Avg. Waiting Time</div>
              <div class="h-px bg-base-200 mt-2"></div>
            </div>
            <div class="ml-4 text-sm text-gray-500 whitespace-nowrap flex items-center">{{ formatWaiting(props.data.waitTime) }}</div>
            <button v-if="!props.readonly" onclick="modal_edit_profile_waiting_time.show()"
              class="ml-2.5 btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
              <Pencil :size="20" />
            </button>
          </li>

          <li class="flex items-center">
            <div class="w-10 -mt-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 7h18" />
                <path d="M3 12h18" />
                <path d="M3 17h18" />
              </svg>
            </div>
            <div class="flex-1 pl-3 flex flex-col justify-center">
              <div class="text-sm font-medium">Styles</div>
              <div class="h-px bg-base-200 mt-2"></div>
            </div>
            <div class="ml-4 text-sm text-gray-500 whitespace-nowrap flex items-center">
              <span v-for="style in props.data.specialties" :key="style" class="badge badge-sm badge-outline mr-1">{{
                style }}</span>
            </div>
            <button v-if="!props.readonly" onclick="modal_edit_profile_art_style.show()"
              class="ml-2.5 btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
              <Pencil :size="20" />
            </button>
          </li>
        </ul>
      </div>
    </section>
    <ModalEditProfileArtStyle />
    <ModalEditProfileExperience />
    <ModalEditProfileLanguage />
    <ModalEditProfileWaitingTime />
    <ModalEditProfileRate />
  </section>
</template>

<script setup>
import { Pencil, Phone, Instagram, Facebook, Globe } from 'lucide-vue-next';

/**
 * @typedef {Object} ArtistData
 * @property {number} [id] - The artist's unique identifier
 * @property {string} [name] - The artist's name
 * @property {string} [artistAvatar] - The artist's avatar image URL
 * @property {string} [location] - The artist's location
 * @property {number} [rating] - The artist's rating out of 5
 * @property {number} [followerCount] - Number of followers
 * @property {boolean} [verified] - Whether the artist is verified
 * @property {boolean} [hygiene_cert] - Whether the artist has a hygiene certificate
 * @property {Object} [contact] - Contact information
 * @property {string} [contact.instagram] - Instagram handle
 * @property {string} [contact.facebook] - Facebook handle
 * @property {string} [contact.twitter] - Twitter handle
 * @property {string} [contact.tel] - Phone number
 * @property {number} years_experience - Years of experience
 * @property {number} waitingTime - Average waiting time in days
 * @property {number} price - Price level (number of $ signs)
 * @property {Array<{lang_id: number, lang_name: string}>} lang - Languages spoken
 * @property {Array<{cat_id: number, cat_name: string}>} category - Tattoo categories/styles
 * @example
 * {
 *   id: 17792719862,
 *   artistAvatar: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
 *   followerCount: 521,
 *   verified: true,
 *   hygiene_cert: true,
 *   location: 'San Francisco',
 *   rating: 4.9,
 *   years_experience: 2.5,
 *   waitingTime: 14,
 *   price: 3,
 *   lang: [
 *     {lang_id: 1, lang_name: 'German'},
 *     {lang_id: 2, lang_name: 'English'}
 *   ],
 *   category: [
 *     {cat_id: 1, cat_name: 'Ornamental'},
 *     {cat_id: 2, cat_name: 'Heavy Blackwork'},
 *     {cat_id: 3, cat_name: 'Comic'},
 *     {cat_id: 4, cat_name: 'Tribal'},
 *     {cat_id: 5, cat_name: 'Watercolor'}
 *   ],
 *   contact: {
 *     instagram: 'tattoomii.official',
 *     facebook: 'tattoomii.official',
 *     twitter: 'tattoomii.official',
 *     tel: '+62822000000'
 *   }
 * }
 */

/**
 * ArtistInfo component props
 * @type {ArtistData}
 */
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  readonly: { type: Boolean, default: false },
})
onMounted(() => {
  if (!props.data) return console.warn('[DashboardArtistInfo] ArtistInfo component mounted but has invalid data prop. We require data prop!');
});

function formatSpokenLanguage(lang) {
  if (!lang) return 'Not specified'
  if (!Array.isArray(lang)) {
    // maybe it's a comma separated string
    if (typeof lang === 'string') return lang
    return String(lang)
  }
  return lang
    .map(l => {
      if (!l && l !== 0) return null
      if (typeof l === 'string') return l
      if (typeof l === 'object') return l.label || l.value || String(l)
      return String(l)
    })
    .filter(Boolean)
    .join(', ') || 'Not specified'
}

function computeYears(startYear) {
  if (!startYear && startYear !== 0) return 'N/A'
  const yearNum = Number(startYear)
  if (Number.isNaN(yearNum) || yearNum <= 0) return 'N/A'
  const diff = new Date().getFullYear() - Math.floor(yearNum)
  return diff >= 0 ? diff : 'N/A'
}

function formatWaiting(days) {
  if (days == null) return 'No waiting time'
  const n = Number(days)
  if (Number.isNaN(n) || n <= 0) return 'No waiting time'
  if (n === 1) return '1 day'
  if (n <= 7) return `${n} days`
  const weeks = Math.floor(n / 7)
  const rem = n % 7
  return rem === 0 ? `${weeks} week${weeks > 1 ? 's' : ''}` : `${weeks} week${weeks > 1 ? 's' : ''} ${rem} day${rem > 1 ? 's' : ''}`
}

function hasHygieneCertificate(data) {
  if (!data) return false
  // Some APIs provide hygiene certificate as a boolean or provide a diploma/certificate with certificateUrl
  if (data.hygiene_cert === true) return true
  // check diplomas for hygiene or certificateUrl presence
  if (Array.isArray(data.diplomas) && data.diplomas.some(d => d && (d.certificateUrl || (d.title && d.title.toLowerCase().includes('hygiene'))))) return true
  // also check for a top level certificateUrl field
  if (data.certificateUrl) return true
  return false
}

</script>