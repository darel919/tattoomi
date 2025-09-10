interface ArtistDashboardResponse {
  message: string
  data: {
    user: {
      userId: string
      email: string
      fullName: string | null
      role: string
      isVerifiedEmail: boolean
      alive: boolean
      joinDate: string
      lastLogin: string
      accountStatus: string
      phoneNumber?: string
    }
    artist: {
      artistId: string
      userId: string
      bio: string
      specialties: string[]
      profileImage: string | null
      coverImage: string | null
      introductionVideo: string | null
      bannedPlacement: string | null
      startYear: number | null
      spokenLanguage: string | null
      rate: number | null
      waitTime: number | null
      isVerified: boolean
      createdAt: string
      updatedAt: string
    }
    studio: {
      studioId?: string
      name?: string
      address?: string
      city?: string
      state?: string
      country?: string
      latitude?: number
      longitude?: number
    } | null
    statistics: {
      worksCount: string
      favoritesCount: string
    }
    recentWorks: any[]
  }
}

import { shallowRef, watchEffect } from 'vue'

export const useArtistDashboard = () => {
  const authStore = useMyAuthStore()
  const config = useRuntimeConfig()

  const dashboardData = ref<ArtistDashboardResponse['data'] | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchDashboardData = async () => {
    if (!authStore.token) {
      error.value = 'No authentication token found'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<ArtistDashboardResponse>(`${config.public.baseURL}/api/artist/artistDashboard`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      })

      if (response && response.data) {
        dashboardData.value = response.data
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data'
      error.value = errorMessage
      console.error('Dashboard fetch error:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Expose raw API data directly. Components expect `artistInfo` prop but should accept raw structure.
  // To preserve the original export shape, provide `artistInfo` as a shallowRef pointing to the same data.
  // This avoids transforming/mapping fields which caused missing data in the UI.
  const artistInfo = shallowRef<ArtistDashboardResponse['data'] | null>(null)

  // Keep artistInfo in sync with dashboardData
  watchEffect(() => {
    artistInfo.value = dashboardData.value
  })

  return {
    dashboardData,
    artistInfo,
    isLoading,
    error,
    fetchDashboardData
  }
}
