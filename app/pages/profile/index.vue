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
            <ArtistInfoCard :item="likedArtistMockData"/>
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

const profileData = computed(() => {
  if (!authStore.user) return null;
  return {
    name: authStore.user.fullName || authStore.user.name || 'User',
    location: authStore.user.location || 'Location not set',
    avatarUrl: authStore.user.nickPhotoSrc || 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
  };
});

const likedArtistMockData = [
  {
    artistId: "02015262-f9d7-40cd-8a4d-e5fcb09e5db4",
    userId: "cb55d494-a95a-4986-a0e8-15905619fddd",
    bio: "Passionate tattoo artist with 8+ years of experience specializing in realistic portraits and fine line work.",
    specialties: ["Traditional", "Neo-Traditional", "Realism"],
    profileImage: "https://images.unsplash.com/photo-1500000000?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1600000000?w=800&h=400&fit=crop",
    rate: "150",
    waitTime: 7,
    isVerified: true,
    userEmail: "sarah.ink@gmail.com",
    userFullName: "Stephen C",
    studioName: "Ink Paradise Studio",
    studioAddress: "123 Main Street, Suite 1",
    studioCity: "San Francisco",
    studioState: "CA",
    studioCountry: "USA",
    studioLatitude: "40.7128",
    studioLongitude: "-74.0060",
    styles: ["Dotwork", "Abstract", "Geometric"],
    works: [],
    rating: 4.8,
    lang: ["English", "Spanish"],
    years_experience: 8
  },
  {
    artistId: "5d225e55-00c0-4293-bfa8-bb58681c9c19",
    userId: "f36ddc8f-fbe3-476c-a904-4c764a09030a",
    bio: "Traditional tattoo specialist with a modern twist. I love creating bold, vibrant pieces that tell your story.",
    specialties: ["Black and Grey", "Watercolor", "Geometric"],
    profileImage: "https://images.unsplash.com/photo-1500000001?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1600000001?w=800&h=400&fit=crop",
    rate: "200",
    waitTime: 14,
    isVerified: true,
    userEmail: "mike.tattoo@outlook.com",
    userFullName: "Anna K",
    studioName: "Thunder Tattoo Collective",
    studioAddress: "246 Main Street, Suite 2",
    studioCity: "Los Angeles",
    studioState: "CA",
    studioCountry: "USA",
    studioLatitude: "34.0522",
    studioLongitude: "-118.2437",
    styles: ["Geometric", "Portrait", "Neo-Traditional", "Realism", "Black and Grey"],
    works: [],
    rating: 4.6,
    lang: ["English"],
    years_experience: 6
  },
  {
    artistId: "2fdfd07d-1653-4998-bfbd-9022fac2fb7c",
    userId: "27e33eb2-831f-47b8-a8f4-6451d8efc195",
    bio: "Watercolor and abstract tattoo artist. I bring your wildest dreams to life with splashes of color and creativity.",
    specialties: ["Minimalist", "Japanese", "Tribal"],
    profileImage: "https://images.unsplash.com/photo-1500000002?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1600000002?w=800&h=400&fit=crop",
    rate: "250",
    waitTime: 21,
    isVerified: false,
    userEmail: "emma.artworks@yahoo.com",
    userFullName: "Michael B",
    studioName: "Sacred Art Tattoo",
    studioAddress: "369 Main Street, Suite 3",
    studioCity: "New York",
    studioState: "NY",
    studioCountry: "USA",
    studioLatitude: "41.8781",
    studioLongitude: "-87.6298",
    styles: ["Realism", "Fine Line"],
    works: [],
    rating: 4.7,
    lang: ["English", "French"],
    years_experience: 5
  }
];
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
});

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