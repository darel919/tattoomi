interface Artist {
  artistId: string
  userId: string
  bio: string
  specialties: string[]
  profileImage: string | null
  coverImage: string | null
  rate: string | null
  waitTime: number | null
  isVerified: boolean
  userEmail: string
  userFullName: string | null
  studioName: string | null
  studioAddress: string | null
  studioCity: string | null
  studioState: string | null
  studioCountry: string | null
  studioLatitude: string | null
  studioLongitude: string | null
  styles: string[]
  spoken_lang: string[]
  years_experience: string
  works: {
    workId: string
    artistId: string
    title: string
    description: string
    imageUrl: string
    style: string
    category: string
    createdAt: string
  }[]
}

interface ArtistsFinderResponse {
  message: string
  data: Artist[]
}

export const useArtistsFinder = () => {
  const config = useRuntimeConfig()
  const authStore = useMyAuthStore()

  const artists = ref<Artist[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  let currentFetchPromise: Promise<ArtistsFinderResponse> | null = null
  let lastFiltersKey: string | null = null

  const fetchArtists = async (filters?: any) => {
    const filtersKey = filters ? JSON.stringify(filters) : '{}'
    if (currentFetchPromise && lastFiltersKey === filtersKey) {
      return currentFetchPromise
    }

    isLoading.value = true
    error.value = null

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }
      
      if (authStore.token) {
        headers.Authorization = `Bearer ${authStore.token}`
      }
      currentFetchPromise = $fetch<ArtistsFinderResponse>(`${config.public.baseURL}/api/artist/artistsFinder`, {
        method: 'POST',
        headers,
        body: filters || {}
      })
      lastFiltersKey = filtersKey
      const response = await currentFetchPromise

      if (response && response.data) {
        artists.value = response.data
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch artists'
      error.value = errorMessage
      console.error('Artists fetch error:', err)
    } finally {
      isLoading.value = false
      currentFetchPromise = null
    }
  }

  return {
    artists: readonly(artists),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchArtists
  }
}
