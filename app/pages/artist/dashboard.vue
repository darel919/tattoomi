<template>
  <div class="mx-12 my-8 min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="loading loading-spinner loading-lg text-primary-yellow"></div>
      <span class="ml-4 text-lg">Loading dashboard...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error">
      <ErrorState
        :state="'error'"
        title="Failed to load dashboard"
        :details="error"
        recommendations="Please try again or check your network"
        @retry="fetchDashboardData"
      />
    </div>

    <!-- Dashboard Content -->
    <div v-else-if="dashboardData">
      <DashboardPortfolio :data="dashboardData.recentWorks" />
      <div class="flex gap-10">
      <div class="grow flex flex-col gap-10">
        <DashboardArtistInfo :data="artistInfoFlat" />
          <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
        <DashboardIntroductionVideo :videoUrl="artistInfoFlat?.introductionVideo || ''" />
          <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
        <DashboardProfileBio :bio="artistInfoFlat?.bio || ''" />
          <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
        <DashboardSpeciality :specialties="artistInfoFlat?.specialties || []" />
          <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
          <DashboardStudio :studio="dashboardData.studio || {}" />
          <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
        <DashboardWontDo :bannedPlacements="artistInfoFlat?.bannedPlacement || []" />
          <div class="divider before:bg-secondary-400 after:bg-secondary-400"></div>
          <DashboardCertificateDiploma :diplomas="[]" />
        </div>
        <div class="min-w-[25rem]"></div>
      </div>
      <div class="divider before:bg-secondary-400 after:bg-secondary-400 py-10"></div>
      <div class="flex flex-col gap-10">
        <DashboardCustomerReview />
        <DashboardLocation :studio="dashboardData.studio || {}" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { dashboardData, artistInfo, isLoading, error, fetchDashboardData } = useArtistDashboard()
const authStore = useMyAuthStore()

// Don't perform role check during SSR; run it on the client when mounted.
onMounted(async () => {
  // Ensure client-only auth initialization has run (plugin `auth.client.js` will call initializeAuth on app start)
  // Wait a tick so stores and localStorage are available on client
  await nextTick()

  // If not authenticated or not an artist, navigate away or show an error on the client instead of throwing during SSR
  if (!authStore.isAuthenticated || authStore.role !== 'artist') {
    // If on client, redirect to home or a safe page. Use full client navigation to avoid SSR throw.
    if (process.client) {
      // you may choose to redirect to homepage or login
      const router = useRouter()
      router.push('/')
      return
    }
  }

  // Only fetch data after auth is initialized and role check passed
  await fetchDashboardData()
})

// Local page-level mapping: compose a flattened artistInfo from the raw dashboardData
const artistInfoFlat = computed(() => {
  if (!dashboardData.value) return null

  const { user, artist, studio, statistics, recentWorks } = dashboardData.value
  const currentYear = new Date().getFullYear()

  // normalize spokenLanguage to an array when possible
  let spokenLanguage = []
  if (Array.isArray(artist.spokenLanguage)) spokenLanguage = artist.spokenLanguage
  else if (typeof artist.spokenLanguage === 'string' && artist.spokenLanguage) spokenLanguage = [artist.spokenLanguage]

  return {
    profileImage: artist.profileImage,
    fullName: user.fullName,
    isVerified: artist.isVerified,
    studio: studio,
    startYear: artist.startYear,
    phoneNumber: user.phoneNumber || null,
    bio: artist.bio,
    specialties: artist.specialties || [],
    spokenLanguage: spokenLanguage,
    rate: artist.rate,
    waitTime: artist.waitTime,
    bannedPlacement: artist.bannedPlacement,
    introductionVideo: artist.introductionVideo,
    worksCount: parseInt(statistics.worksCount) || 0,
    favoritesCount: parseInt(statistics.favoritesCount) || 0,
    recentWorks: recentWorks || [],
    yearsOfExperience: artist.startYear ? currentYear - artist.startYear : 0,
    artistId: artist.artistId
  }
})
</script>