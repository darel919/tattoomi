<template>
  <div class="mx-12">
    <section v-if="viewMode === 'list'" class="mb-16">
      <p>All Artists</p>
      <h1 class="text-3xl font-bold">Find the perfect Tattoo Artist for your idea</h1>
    </section>
    <ArtistInfoCard v-if="viewMode === 'list'" :item="mockupData" />
    <ArtistMapView v-if="viewMode === 'map'" />
   <section class="my-4">
      <button v-if="viewMode === 'list'"  @click="viewMode = 'map'; scrollToTop()" class="flex flex-row items-center gap-1 bg-hero text-black rounded-full px-6 py-4 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-icon lucide-map mr-2"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>
        <p class="font-bold">Go to Map View</p>
      </button>
      <button v-if="viewMode === 'map'" @click="viewMode = 'list'; scrollToTop()" class="flex flex-row items-center gap-1 bg-hero text-black rounded-full px-6 py-4 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-icon lucide-map mr-2"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>
        <p class="font-bold">Go to Card View</p>
      </button>
   </section>
  </div>
</template>

<script setup>
const viewMode = ref('list');
const mockupData = [
  { id: 1, name: 'Stephen C', verified: true, hygiene_cert: true, location: 'San Francisco', rating: 4.9, lang: [{lang_id: 1, lang_name: 'German'}, {lang_id: 2, lang_name: 'English'}], years_experience: 2.5, waitingTime: 14, price: 3, category: [{cat_id: 1, cat_name: 'Ornamental'}, {cat_id: 2, cat_name: 'Heavy Blackwork'}, {cat_id: 3, cat_name: 'Comic'}, {cat_id: 4, cat_name: 'Tribal'}, {cat_id: 5, cat_name: 'Watercolor'}] },
  { id: 2, name: 'Anna K', verified: true, hygiene_cert: true, location: 'Los Angeles', rating: 4.8, lang: [{lang_id: 1, lang_name: 'Spanish'}, {lang_id: 2, lang_name: 'English'}], years_experience: 3, waitingTime: 10, price: 4, category: [{cat_id: 1, cat_name: 'Portrait'}, {cat_id: 2, cat_name: 'Minimalist'}, {cat_id: 3, cat_name: 'Dotwork'}, {cat_id: 4, cat_name: 'Fineline'}, {cat_id: 5, cat_name: 'Geometric'}] },
  { id: 3, name: 'Michael B', verified: true, hygiene_cert: true, location: 'New York', rating: 4.7, lang: [{lang_id: 1, lang_name: 'French'}, {lang_id: 2, lang_name: 'English'}], years_experience: 5, waitingTime: 20, price: 5, category: [{cat_id: 1, cat_name: 'Oldschool'}, {cat_id: 2, cat_name: 'Neotraditional'}, {cat_id: 3, cat_name: 'Realistic'}, {cat_id: 4, cat_name: 'Microrealistic'}, {cat_id: 5, cat_name: 'Fineline'}] },
  { id: 4, name: 'Sofia L', verified: true, hygiene_cert: true, location: 'Miami', rating: 4.6, lang: [{lang_id: 1, lang_name: 'Italian'}, {lang_id: 2, lang_name: 'English'}], years_experience: 4, waitingTime: 15, price: 3, category: [{cat_id: 1, cat_name: 'Japanese'}, {cat_id: 2, cat_name: 'Geometric'}, {cat_id: 3, cat_name: 'Mandala'}, {cat_id: 4, cat_name: 'Botanical / Floral'}, {cat_id: 5, cat_name: 'Coverup'}] },
  { id: 5, name: 'David R', verified: true, hygiene_cert: true, location: 'Chicago', rating: 4.5, lang: [{lang_id: 1, lang_name: 'Portuguese'}, {lang_id: 2, lang_name: 'English'}], years_experience: 6, waitingTime: 25, price: 4, category: [{cat_id: 1, cat_name: 'Blackwork'}, {cat_id: 2, cat_name: 'Dotwork'}, {cat_id: 3, cat_name: 'Surreal Blackwork'}, {cat_id: 4, cat_name: 'Etching (Engraving)'}, {cat_id: 5, cat_name: 'Abstract'}] }
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

useHead({
  title: 'Home | tattooMii',
})

</script>
