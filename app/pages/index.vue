<template>
  <div class="mx-8">
    <section class="mb-8">
      <p>All Artists</p>
      <h1 class="text-3xl font-bold">Find the perfect Tattoo Artist for your idea</h1>
    </section>
    <section class="my-8">
      <LandingPageCard :item="mockupData" />
    </section>
  </div>
</template>

<script setup>

const mockupData = [
  { id: 1, name: 'Stephen C', location: 'San Francisco', rating: 4.9, lang: [{lang_id: 1, lang_name: 'German'}, {lang_id: 2, lang_name: 'English'}], years_experience: 2.5, waitingTime: 14, price: 3, category: [{cat_id: 1, cat_name: 'Ornamental'}, {cat_id: 2, cat_name: 'Heavy Blackwork'}, {cat_id: 3, cat_name: 'Comic'}] },
  { id: 2, name: 'Anna K', location: 'Los Angeles', rating: 4.8, lang: [{lang_id: 1, lang_name: 'Spanish'}, {lang_id: 2, lang_name: 'English'}], years_experience: 3, waitingTime: 10, price: 4, category: [{cat_id: 1, cat_name: 'Realism'}, {cat_id: 2, cat_name: 'Watercolor'}] },
  { id: 3, name: 'Michael B', location: 'New York', rating: 4.7, lang: [{lang_id: 1, lang_name: 'French'}, {lang_id: 2, lang_name: 'English'}], years_experience: 5, waitingTime: 20, price: 5, category: [{cat_id: 1, cat_name: 'Traditional'}, {cat_id: 2, cat_name: 'Neo-Traditional'}] },
  { id: 4, name: 'Sofia L', location: 'Miami', rating: 4.6, lang: [{lang_id: 1, lang_name: 'Italian'}, {lang_id: 2, lang_name: 'English'}], years_experience: 4, waitingTime: 15, price: 3, category: [{cat_id: 1, cat_name: 'Japanese'}, {cat_id: 2, cat_name: 'Geometric'}] },
  { id: 5, name: 'David R', location: 'Chicago', rating: 4.5, lang: [{lang_id: 1, lang_name: 'Portuguese'}, {lang_id: 2, lang_name: 'English'}], years_experience: 6, waitingTime: 25, price: 4, category: [{cat_id: 1, cat_name: 'Black and Grey'}, {cat_id: 2, cat_name: 'Surrealism'}] }
];

</script>
