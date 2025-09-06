<template>
  <div class="mx-8">
    <section class="mb-8">
      <p>All Artists</p>
      <h1 class="text-3xl font-bold">Find the perfect Tattoo Artist for your idea</h1>
    </section>
    <section class="my-8">
      <ArtistInfoCard :item="mockupData" />
    </section>
  </div>
</template>

<script setup>

const mockupData = [
  { id: 1, name: 'Stephen C', verified: true, hygiene_cert: true, location: 'San Francisco', rating: 4.9, lang: [{lang_id: 1, lang_name: 'German'}, {lang_id: 2, lang_name: 'English'}], years_experience: 2.5, waitingTime: 14, price: 3, category: [{cat_id: 1, cat_name: 'Ornamental'}, {cat_id: 2, cat_name: 'Heavy Blackwork'}, {cat_id: 3, cat_name: 'Comic'}, {cat_id: 4, cat_name: 'Tribal'}, {cat_id: 5, cat_name: 'Watercolor'}] },
  { id: 2, name: 'Anna K', verified: true, hygiene_cert: true, location: 'Los Angeles', rating: 4.8, lang: [{lang_id: 1, lang_name: 'Spanish'}, {lang_id: 2, lang_name: 'English'}], years_experience: 3, waitingTime: 10, price: 4, category: [{cat_id: 1, cat_name: 'Portrait'}, {cat_id: 2, cat_name: 'Minimalist'}, {cat_id: 3, cat_name: 'Dotwork'}, {cat_id: 4, cat_name: 'Fineline'}, {cat_id: 5, cat_name: 'Geometric'}] },
  { id: 3, name: 'Michael B', verified: true, hygiene_cert: true, location: 'New York', rating: 4.7, lang: [{lang_id: 1, lang_name: 'French'}, {lang_id: 2, lang_name: 'English'}], years_experience: 5, waitingTime: 20, price: 5, category: [{cat_id: 1, cat_name: 'Oldschool'}, {cat_id: 2, cat_name: 'Neotraditional'}, {cat_id: 3, cat_name: 'Realistic'}, {cat_id: 4, cat_name: 'Microrealistic'}, {cat_id: 5, cat_name: 'Fineline'}] },
  { id: 4, name: 'Sofia L', verified: true, hygiene_cert: true, location: 'Miami', rating: 4.6, lang: [{lang_id: 1, lang_name: 'Italian'}, {lang_id: 2, lang_name: 'English'}], years_experience: 4, waitingTime: 15, price: 3, category: [{cat_id: 1, cat_name: 'Japanese'}, {cat_id: 2, cat_name: 'Geometric'}, {cat_id: 3, cat_name: 'Mandala'}, {cat_id: 4, cat_name: 'Botanical / Floral'}, {cat_id: 5, cat_name: 'Coverup'}] },
  { id: 5, name: 'David R', verified: true, hygiene_cert: true, location: 'Chicago', rating: 4.5, lang: [{lang_id: 1, lang_name: 'Portuguese'}, {lang_id: 2, lang_name: 'English'}], years_experience: 6, waitingTime: 25, price: 4, category: [{cat_id: 1, cat_name: 'Blackwork'}, {cat_id: 2, cat_name: 'Dotwork'}, {cat_id: 3, cat_name: 'Surreal Blackwork'}, {cat_id: 4, cat_name: 'Etching (Engraving)'}, {cat_id: 5, cat_name: 'Abstract'}] }
];

</script>
