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
                  <img :src="`${profileMockData.avatarUrl}`" alt="avatar" />
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold">{{profileMockData.name}}</h3>
                <p class="text-sm text-gray-500 flex items-center gap-2">
                  <MapPin class="w-4 h-4" />{{profileMockData.location}}</p>
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
                class="rounded-lg shadow-xl p-6 flex flex-col gap-4"
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
                    @click="openChat(item)"
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

const router = useRouter();
const route = useRoute();
const likedArtistMockData = [
  { id: 1, name: 'Stephen C', verified: true, hygiene_cert: true, location: 'San Francisco', rating: 4.9, lang: [{lang_id: 1, lang_name: 'German'}, {lang_id: 2, lang_name: 'English'}], years_experience: 2.5, waitingTime: 14, price: 3, category: [{cat_id: 1, cat_name: 'Ornamental'}, {cat_id: 2, cat_name: 'Heavy Blackwork'}, {cat_id: 3, cat_name: 'Comic'}, {cat_id: 4, cat_name: 'Tribal'}, {cat_id: 5, cat_name: 'Watercolor'}] },
  { id: 2, name: 'Anna K', verified: true, hygiene_cert: true, location: 'Los Angeles', rating: 4.8, lang: [{lang_id: 1, lang_name: 'Spanish'}, {lang_id: 2, lang_name: 'English'}], years_experience: 3, waitingTime: 10, price: 4, category: [{cat_id: 1, cat_name: 'Portrait'}, {cat_id: 2, cat_name: 'Minimalist'}, {cat_id: 3, cat_name: 'Dotwork'}, {cat_id: 4, cat_name: 'Fineline'}, {cat_id: 5, cat_name: 'Geometric'}] },
  { id: 3, name: 'Michael B', verified: true, hygiene_cert: true, location: 'New York', rating: 4.7, lang: [{lang_id: 1, lang_name: 'French'}, {lang_id: 2, lang_name: 'English'}], years_experience: 5, waitingTime: 20, price: 5, category: [{cat_id: 1, cat_name: 'Oldschool'}, {cat_id: 2, cat_name: 'Neotraditional'}, {cat_id: 3, cat_name: 'Realistic'}, {cat_id: 4, cat_name: 'Microrealistic'}, {cat_id: 5, cat_name: 'Fineline'}] },
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
const profileMockData = {
  name: 'Jeremy Clarkson',
  location: 'San Francisco',
  avatarUrl: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
};

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