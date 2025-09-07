<template>
<section v-if="props.data">
    <section class="flex flex-row items-center">
        <!-- ARTIST AVATAR  -->
        <div v-if="props.data.artistAvatar" class="avatar mr-4">
            <div class="w-24 rounded-full">
                <img :src="`${props.data.artistAvatar}`" />
            </div>    
        </div>
        <!-- ARTIST NAME AND RATE -->
        <section>
            <!-- NAME -->
            <section class="flex flex-row items-center mb-2">
                <h2 class="text-2xl font-bold mr-2">Stephen A.</h2>
                <section class="flex flex-row items-center">
                      <div class="tooltip" data-tip="This artist has been verified by Tattoomii team.">
                        <button
                          type="button"
                          class="btn btn-ghost p-0 w-6 h-6 flex items-center justify-center"
                          aria-label="Verified artist"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0291F0" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                            <path d="m9 12 2 2 4-4"/>
                          </svg>
                        </button>
                      </div>

                      <div class="tooltip ml-2" data-tip="This artist has uploaded a hygiene certificate">
                        <button
                          type="button"
                          class="btn btn-ghost p-0 w-5 h-5 flex items-center justify-center"
                          aria-label="Hygiene certificate"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                            <path d="M9 12h6"/>
                            <path d="M12 9v6"/>
                          </svg>
                        </button>
                      </div>
                </section>
            </section>
            <!-- LOCATION -->
            <section v-if="props.data.location" class="flex flex-row items-center gap-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                <p class="text-gray-600">{{props.data.location}}</p>
            </section>
            <!-- RATING -->
           <section v-if="props.data.rating" class="flex flex-row items-center gap-2 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
                <p class="text-gray-600">{{props.data.rating}}/5 (14 ratings)</p>
           </section>
        </section>
    </section>
    <!-- ARTIST FOLLOWER COUNT -->
    <section v-if="props.data.followerCount" class="flex flex-row items-center gap-3 mt-4 mb-6">
        <div class="avatar-group -space-x-3">
            <div class="avatar">
                <div class="w-7">
                <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                </div>
            </div>
            <div class="avatar">
                <div class="w-7">
                <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                </div>
            </div>
            <div class="avatar">
                <div class="w-7">
                <img src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp" />
                </div>
            </div>
            <div class="avatar avatar-placeholder">
                <div class="bg-neutral text-neutral-content w-7">
                <span class="text-xs mt-1">+99</span>
                </div>
            </div>
        </div>
        <p>{{props.data.followerCount}} followers</p>
        <button class="rounded-full border-hero border-2 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FBBF13" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
        </button>
    </section>
    <!-- ARTIST CONTACT -->
    <section v-if="props.data.contact" class="flex gap-3 pb-4">
        <a v-if="props.data.contact.instagram" :href="`https://instagram.com/${props.data.contact.instagram}`" target="_blank" class="p-2 rounded-full border-hero hover:bg-hero border-2 transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
        </a>
        <a  v-if="props.data.contact.facebook" :href="`https://facebook.com/${props.data.contact.facebook}`" target="_blank" class="p-2 rounded-full border-hero hover:bg-hero border-2 transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.659 9.119 8.444 9.95v-7.05H8.54v-2.9h1.904V9.41c0-1.88 1.12-2.91 2.85-2.91.827 0 1.694.148 1.694.148v1.865h-1.05c-1.035 0-1.356.642-1.356 1.3v1.56h2.31l-.37 2.9h-1.94V22C18.341 21.119 22 16.99 22 12z"/>
            </svg>
        </a>
        <a  v-if="props.data.contact.twitter" :href="`https://x.com/${props.data.contact.twitter}`" target="_blank" class="p-2 rounded-full border-hero hover:bg-hero border-2 transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
        </a>
        <a  v-if="props.data.contact.tel" :href="`tel:${props.data.contact.tel}`" target="_blank" class="p-2 rounded-full border-hero hover:bg-hero border-2 transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone w-4 h-4"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
        </a>
    </section>
    <!-- ARTIST DETAILS -->
    <section>
      <div class="w-full bg-base-100 p-3 rounded-lg">
        <ul class="space-y-4">
          <li class="flex items-center">
            <div class="w-10 -mt-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <div class="flex-1 pl-3 flex flex-col justify-center">
              <div class="text-sm font-medium">Years' experiences</div>
              <div class="h-px bg-base-200 mt-2"></div>
            </div>
            <div class="ml-4 text-sm text-gray-500 whitespace-nowrap flex items-center">{{ props.data.years_experience }} Years</div>
          </li>

          <li class="flex items-center">
            <div class="w-10 -mt-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <div class="flex-1 pl-3 flex flex-col justify-center">
              <div class="text-sm font-medium">Language</div>
              <div class="h-px bg-base-200 mt-2"></div>
            </div>
            <div class="ml-4 text-sm text-gray-500 whitespace-nowrap flex items-center">{{ props.data.lang.map(l => l.lang_name).join(', ') }}</div>
          </li>

          <li class="flex items-center">
            <div class="w-10 -mt-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22"/><path d="M17 5H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H7"/></svg>
            </div>
            <div class="flex-1 pl-3 flex flex-col justify-center">
              <div class="text-sm font-medium">Rate</div>
              <div class="h-px bg-base-200 mt-2"></div>
            </div>
            <div class="ml-4 text-sm text-gray-500 whitespace-nowrap flex items-center">{{ '$'.repeat(props.data.price) }}</div>
          </li>

          <li class="flex items-center">
            <div class="w-10 -mt-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <div class="flex-1 pl-3 flex flex-col justify-center">
              <div class="text-sm font-medium">Avg. Waiting Time</div>
              <div class="h-px bg-base-200 mt-2"></div>
            </div>
            <div class="ml-4 text-sm text-gray-500 whitespace-nowrap flex items-center">{{ props.data.waitingTime }} days</div>
          </li>

          <li class="flex items-center">
            <div class="w-10 -mt-2 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18"/><path d="M3 12h18"/><path d="M3 17h18"/></svg>
            </div>
            <div class="flex-1 pl-3 flex flex-col justify-center">
              <div class="text-sm font-medium">Styles</div>
              <div class="h-px bg-base-200 mt-2"></div>
            </div>
            <div class="ml-4 text-sm text-gray-500 whitespace-nowrap flex items-center">
              <span v-for="cat in props.data.category" :key="cat.cat_id" class="badge badge-sm badge-outline mr-1">{{ cat.cat_name }}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </section>
  </template>

<script setup>
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
  }
})
onMounted(() => {
  if(!props.data) return console.warn('[DashboardArtistInfo] ArtistInfo component mounted but has invalid data prop. We require data prop!');
});
</script>