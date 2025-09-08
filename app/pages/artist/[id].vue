<template>
    <div class="p-6">
        <DashboardPortfolio :readonly="true" />
        <div class="flex gap-10">
            <div class="grow flex flex-col gap-10">
                <DashboardArtistInfo :data="artistInfo" :readonly="true" />
                <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
                <DashboardIntroductionVideo :readonly="true" />
                <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
                <DashboardProfileBio :readonly="true" />
                <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
                <DashboardSpeciality :readonly="true" />
                <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
                <DashboardStudio :readonly="true" />
                <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
                <DashboardWontDo :readonly="true" />
                <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
                <DashboardCertificateDiploma :readonly="true" />
            </div>
            <div class="max-w-[25rem]">
                <div class="card bg-secondary-500 border-secondary-400 shadow-md w-full mb-8">
                    <div class="card-body items-center text-center">
                        <div class="flex items-center gap-2">
                            <Calculator class="text-primary-yellow" />
                            <h2 class="card-title text-2xl font-semibold">Price Calculator</h2>
                        </div>
                        <p class="text-sm text-secondary-100">
                            Calculate your price . You don’t have to pay yet.
                        </p>

                        <div class="card-actions flex flex-col w-full gap-4 mt-3">
                            <button type="button"
                                class="w-full btn border border-primary-yellow text-secondary-100 rounded-full flex-grow font-semibold">
                                Try our Price Calculator
                            </button>
                            <button type="button"
                                class="w-full btn bg-primary-yellow text-secondary-100 rounded-full flex-grow font-semibold border-0">
                                Send Request
                            </button>
                        </div>
                        <div class="divider before:bg-secondary-400 after:bg-secondary-400 py-4"></div>
                        <div class="grid grid-cols-2 gap-6 w-full">
                            <div class="bg-secondary-400 rounded-md p-3">
                                <p class="text-sm text-secondary-100">Hourly Rate</p>
                                <p class="text-sm font-bold">On Request</p>
                            </div>
                            <div class="bg-secondary-400 rounded-md p-3">
                                <p class="text-sm text-secondary-100">Daily Rate</p>
                                <p class="text-sm font-bold">On Request</p>
                            </div>
                        </div>
                    </div>
                </div>
                <NuxtLink to="/artist/dashboard"
                    class="w-full btn border border-primary-yellow text-secondary-100 rounded-full flex-grow font-semibold">
                    Edit your profile
                </NuxtLink>
            </div>
        </div>
        <div class="divider before:bg-secondary-400 after:bg-secondary-400 py-10"></div>
        <div class="flex flex-col gap-10">
            <DashboardCustomerReview />
            <DashboardLocation :readonly="true" />
        </div>
    </div>
</template>

<script setup>
import { Calculator } from 'lucide-vue-next';

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