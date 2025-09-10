<template>
  <div class="min-h-screen mx-12 py-4">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Left profile column -->
      <aside class="lg:col-span-3">
        <div class="card py-6 top-6">
          <div class="flex flex-col items-start gap-4">
            <div class="flex items-center gap-4 w-full mb-4">
              <div class="avatar">
                <div class="w-20 rounded-full">
                  <img :src="profileData?.avatarUrl || 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp'" alt="avatar" />
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold">{{ profileData?.name || 'Loading...' }}</h3>
                <p class="text-sm text-gray-500 flex items-center gap-2">
                  <MapPin class="w-4 h-4" />{{ profileData?.location || 'Location not set' }}</p>
              </div>
            </div>

            <button class="btn btn-warning bg-hero rounded-full w-full text-black">Profile Settings</button>

          </div>
        </div>
      </aside>

      <!-- Right content column -->
      <main class="lg:col-span-9">
        <div role="tablist" class="tabs tabs-border border-b-1 border-gray-200 dark:border-gray-700" aria-label="Profile tabs">
          <a
            v-for="t in tabs"
            :key="t.id"
            href="#"
            role="tab"
            :tabindex="currentTab === t.id ? 0 : -1"
            class="tab mb-0.5 text-xl"
            :class="{ 'border-b-2 border-hero font-bold': currentTab === t.id }"
            @click.prevent="setTab(t.id)"
          >
            {{ t.label }}
          </a>
        </div>

        <div class="mt-6">
          <!-- Wishlist content -->
          <div v-if="currentTab === 'wishlist'">
           <section v-for="item in wishlistMockData" :key="item.id" class="card card-compact p-4 mb-6">
              <!-- HARD CODED VALUES! CHANGE AT PROD -->
              <img v-if="item.image" :src="item.image" class="w-96"/>
              <img v-else src='~/assets/images/sample_card.png' class="w-96"/>
              <section class="mt-4">
                <h2 class="text-xl mb-2">{{item.title}}</h2>
                <p>Created: {{ new Date(item.timestamp * 1000).toLocaleDateString() }}</p>
              </section>
           </section>
          </div>

          <!-- Requests content -->
          <div v-else-if="currentTab === 'requests'">
            <section class="space-y-4">
              <article
                v-for="item in requestsMockData"
                :key="item.id"
                class="rounded-lg shadow-xl p-6 flex flex-col gap-4 cursor-pointer"
                @click="goToRequestDetail(item)"
              >
                <!-- Content -->
                <div>
                  <h3 class="text-xl font-semibold my-2">{{ item.title }}</h3>
                  <p class="text-sm text-gray-500 my-2">Sent: {{ new Date(item.timestamp * 1000).toLocaleDateString() }} · Artist: {{ item.artist.name }}</p>
                  <p class="text-lg mt-3">{{ item.content }}</p>
                </div>

                <!-- CTA Button to open in Chat -->
                <div>
                  <button
                    class="px-4 py-2 border border-hero text-black dark:text-white rounded-full hover:bg-hero hover:text-white"
                    @click.stop="openChat(item)"
                  >
                    <p class="text-lg">Open in Chat</p>
                  </button>
                </div>
              </article>
              
            </section>
          </div>

          <!-- Liked Artists content -->
          <div v-else-if="currentTab === 'likedArtist'">
            <div v-if="favoriteArtistsLoading" class="text-center py-8">
              <div class="loading loading-spinner loading-lg"></div>
              <p class="mt-4 text-gray-500">Loading your favorite artists...</p>
            </div>
            <div v-else-if="favoriteArtistsError" class="text-center py-8">
              <p class="text-red-500">{{ favoriteArtistsError }}</p>
              <button @click="refetchFavoriteArtists" class="btn btn-primary mt-4">Try Again</button>
            </div>
            <ArtistInfoCard v-else :item="favoriteArtists" :error="!!favoriteArtistsError" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { MapPin } from 'lucide-vue-next';
import { useMyAuthStore } from '~/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useMyAuthStore();

// Favorite Artists logic
const favoriteArtists = ref([])
const favoriteArtistsLoading = ref(false)
const favoriteArtistsError = ref(null)

const refetchFavoriteArtists = async () => {
  if (!authStore.isAuthenticated || !authStore.token) {
    favoriteArtistsError.value = 'User not authenticated'
    return
  }

  try {
    favoriteArtistsLoading.value = true
    favoriteArtistsError.value = null

    const config = useRuntimeConfig()
    const response = await $fetch(config.public.baseURL + '/api/customer/favoriteArtists/getFavoriteArtists', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })

    if (response && response.data) {
      favoriteArtists.value = response.data
    } else {
      favoriteArtists.value = []
    }
  } catch (err) {
    console.error('Error fetching favorite artists:', err)
    favoriteArtistsError.value = err?.message || 'Failed to fetch favorite artists'
    favoriteArtists.value = []
  } finally {
    favoriteArtistsLoading.value = false
  }
}

const profileData = computed(() => {
  if (!authStore.user) return null;
  return {
    name: authStore.user.fullName || authStore.user.name || 'User',
    location: authStore.user.location || 'Location not set',
    avatarUrl: authStore.user.nickPhotoSrc || 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
  };
});

const wishlistMockData = [
  {
    id: 1,
    title: 'Flowers with Sword', 
    // image: '~/assets/images/sample_card.png',
    timestamp: 1757243373
  },
]
const requestsMockData = [
  {
    id: 1,
    title: 'Flowers with Sword', 
    content:'Flowers with sword - a detailed design featuring a rose entwined around a medieval-style sword, symbolizing beauty and strength', 
    artist: {name: 'Stephen C.', artist_id: 1}, 
    timestamp: 1757243373
  },
  {
    id: 2,
    title: 'Flowers with Sword', 
    content:'Flowers with sword - a detailed design featuring a rose entwined around a medieval-style sword, symbolizing beauty and strength', 
    artist: {name: 'Alice E.', artist_id: 2}, 
    timestamp: 1757243483
  }
]
const tabs = [
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'requests', label: 'Requests' },
  { id: 'likedArtist', label: 'Liked Artists' },
];

const currentTab = ref('wishlist');

function syncTabFromQuery() {
  const q = route.query;
  const param = Array.isArray(q.tabView) ? q.tabView[0] : (q.tabView || '');
  const valid = ['wishlist', 'requests', 'likedArtist'];
  if (valid.includes(param)) {
    currentTab.value = param;
    return;
  }
  currentTab.value = 'wishlist';
}

function setTab(tab) {
  currentTab.value = tab;
  const nextQuery = { ...route.query };
  nextQuery.tabView = tab;
  router.replace({ query: nextQuery }).catch(() => {});
}

function openChat(item) {
  if (item && item.artist && item.artist.artist_id) {
    const id = String(item.artist.artist_id);
    router.push({ path: `/chat/${id}` }).catch(() => {});
    return;
  }
  router.push({ path: '/chat' }).catch(() => {});
}

function goToRequestDetail(item) {
  if (!item || !item.id) return;
  const id = String(item.id);
  router.push({ path: `/request/detail/${id}` }).catch(() => {});
}

onMounted(() => {
  syncTabFromQuery();
  if (authStore.isAuthenticated) {
    refetchFavoriteArtists()
  }
})

// Watch for authentication changes
watch(() => authStore.isAuthenticated, (isAuth) => {
  if (isAuth) {
    refetchFavoriteArtists()
  } else {
    favoriteArtists.value = []
    favoriteArtistsError.value = null
  }
})

useHead({
  title: 'Profile | tattooMii',
})

watch(
  () => route.query,
  () => {
    syncTabFromQuery();
  }
);
</script>