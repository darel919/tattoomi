<template>
  <div class="p-6">
    <DashboardPortfolio />
    <div class="max-w-[45rem] flex flex-col gap-10">
      <DashboardArtistInfo :data="artistInfo" />
      <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
      <DashboardIntroductionVideo />
      <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
      <DashboardProfileBio />
      <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
      <DashboardSpeciality />
      <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
      <DashboardStudio />
      <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
      <DashboardWontDo />
      <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
      <DashboardCertificateDiploma />
    </div>
    <div class="divider before:bg-secondary-400 after:bg-secondary-400 py-10"></div>
    <div class="flex flex-col gap-10">
      <DashboardCustomerReview />
      <div>
        <div class="flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <h4 class="text-2xl font-semibold">Location</h4>
            <button onclick="modal_edit_map_view.show()"
              class="btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
              <Pencil :size="20" />
            </button>
          </div>
          <DashboardMapView :location="{ lat: 37.7749, lng: -122.4194 }" />
        </div>
        <EditMapView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { BookPlus, Eye, Pencil } from 'lucide-vue-next';
import EditMapView from '~/components/Modal/EditMapView.vue';

const artistInfo = {
  id: 17792719862,
  artistAvatar: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
  followerCount: 521,
  verified: true,
  hygiene_cert: true,
  location: "San Francisco",
  rating: 4.9,
  years_experience: 2.5,
  waitingTime: 14,
  price: 3,
  lang: [
    { lang_id: 1, lang_name: "German" },
    { lang_id: 2, lang_name: "English" },
  ],
  category: [
    { cat_id: 1, cat_name: "Ornamental" },
    { cat_id: 2, cat_name: "Heavy Blackwork" },
    { cat_id: 3, cat_name: "Comic" },
    { cat_id: 4, cat_name: "Tribal" },
    { cat_id: 5, cat_name: "Watercolor" },
  ],
  contact: {
    instagram: "tattoomii.official",
    facebook: "tattoomii.official",
    twitter: "tattoomii.official",
    tel: "+62822000000",
  },
};
</script>