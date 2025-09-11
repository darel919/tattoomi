<template>
    <div>
        <div v-if="error" class="mx-12 my-8 min-h-screen">
        <ErrorState 
            :title="errorTitle" 
            :details="errorDetails" 
            @retry="retryFetch"
        />
    </div>
    <div v-else class="mx-12 my-8 min-h-screen">
            <DashboardPortfolio :readonly="true" :data="portfolioData" />
            <div class="flex gap-10">
                <div class="grow flex flex-col gap-10">
                    <DashboardArtistInfo :data="artistInfo" :readonly="true" />
                    <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
                    <DashboardIntroductionVideo :readonly="true" :videoUrl="introductionVideoData" />
                    <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
                    <DashboardProfileBio :readonly="true" :bio="bioData" />
                    <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
                    <DashboardSpeciality :readonly="true" :specialties="specialityData" />
                    <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
                    <DashboardStudio :readonly="true" :studio="studioData" />
                    <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
                    <DashboardWontDo :readonly="true" :bannedPlacements="wontDoData" />
                    <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
                    <DashboardCertificateDiploma :readonly="true" :diplomas="diplomasData" />
                </div>
                <ClientOnly>
                <div class="max-w-[25rem]">
                    <div class="card shadow-2xl w-full mb-8">
                        <div class="card-body items-center text-center">
                            <div class="flex items-center gap-2">
                                <Calculator class="text-primary-yellow" />
                                <h2 class="card-title text-2xl font-semibold">Price Calculator</h2>
                            </div>
                            <p class="text-sm">
                                Calculate your price . You don’t have to pay yet.
                            </p>

                            <div class="card-actions flex flex-col w-full gap-4 mt-3">
                                <button onclick="modal_calculator.show()" type="button"
                                    class="w-full btn border border-primary-yellow rounded-full flex-grow font-semibold">
                                    Try our Price Calculator
                                </button>
                                <button type="button"
                                    class="w-full btn bg-primary-yellow text-secondary-100 rounded-full flex-grow font-semibold border-0">
                                    Send Request
                                </button>
                            </div>
                            <div class="divider before:bg-secondary-400 after:bg-secondary-400 py-4"></div>
                            <div class="grid grid-cols-2 gap-6 w-full">
                                <div class="rounded-md p-3">
                                    <p class="text-sm text-secondary-100">Hourly Rate</p>
                                    <p class="text-sm font-bold">On Request</p>
                                </div>
                                <div class="rounded-md p-3">
                                    <p class="text-sm text-secondary-100">Daily Rate</p>
                                    <p class="text-sm font-bold">On Request</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <NuxtLink v-if="isOwner" to="/artist/dashboard"
                        class="w-full btn border border-primary-yellow text-secondary-100 rounded-full flex-grow font-semibold">
                        Edit your profile
                    </NuxtLink>
                </div>
                </ClientOnly>
            </div>
            <div class="divider before:bg-secondary-400 after:bg-secondary-400 py-10"></div>
            <div class="flex flex-col gap-10">
                <DashboardCustomerReview />
                <DashboardLocation :readonly="true" :studio="studioData" />
            </div>
        </div>
        <ModalCalculator />
    </div>
</template>

<script setup>
import { Calculator } from 'lucide-vue-next';
import ErrorState from '~/components/ErrorState.vue';

const route = useRoute();
const config = useRuntimeConfig();
const { data: artistData, error, refresh } = useAsyncData(
    () => `artist-${route.params.id}`,
    () => $fetch(`${config.public.baseURL}/api/artist/${route.params.id}`)
);

const retryFetch = () => {
    refresh();
};

const errorTitle = computed(() => {
    // if (error.value?.statusCode === 404) {
    //     return 'Artist not found';
    // }
    return 'An error occurred';
});

const errorDetails = computed(() => {
    if (error.value?.statusCode === 404) {
        return error.value.data?.message || "The artist you're looking for doesn't exist.";
    }
    return 'Sorry, something went wrong. Please try again later.';
});

const artistInfo = computed(() => {
    if (!artistData.value) return {};
    return artistData.value.data;
});

// Other data mappings
const portfolioData = computed(() => artistData.value?.data?.works || []);
const bioData = computed(() => artistData.value?.data?.bio || '');
const specialityData = computed(() => artistData.value?.data?.specialties || []);
const studioData = computed(() => artistData.value?.data?.studio || {});
const wontDoData = computed(() => artistData.value?.data?.bannedPlacement || []);
const diplomasData = computed(() => artistData.value?.data?.diplomas || []);
const introductionVideoData = computed(() => artistData.value?.data?.introductionVideo || '');

// Ownership check: only show "Edit your profile" when the viewed artist id matches the current logged-in artist id
import { useMyAuthStore } from '~/stores/auth';
const authStore = useMyAuthStore();

const isOwner = computed(() => {
    if (!authStore.isAuthenticated || !authStore.user) return false;
    const viewedId = String(route.params.id || '');

    // Try a set of likely fields where the backend might include the artist id for the logged-in user
    const candidates = [
        authStore.user?.artistId,
        authStore.user?.artist?.artistId,
        authStore.user?.artist_id,
        authStore.user?.artistId,
        authStore.user?.userId,
        authStore.user?.id,
        authStore.user?.data?.artistId
    ];

    for (const c of candidates) {
        if (c && String(c) === viewedId) return true;
    }

    return false;
});
</script>