<template>
  <div class="my-8 mx-auto max-w-5xl px-4">
    <section>
      <!-- Profile -->
      <section class="flex flex-col items-center gap-4 my-16">
        <img class="w-32 h-32 rounded-full" v-if="mockupData.img" :src="`${mockupData.img}`"/>
        <section v-if="mockupData.title && mockupData.timestamp" class="flex flex-col justify-center">
          <h1 class="text-2xl font-bold">{{ mockupData.title }}</h1>
          <p>Created on: {{ formattedDate }}</p>
        </section>
      </section>
      <!-- Price calc budget -->
      <p class="my-4 text-2xl"><strong>Price Calculator Budget:</strong><span class="ml-2 text-hero font-bold">{{ mockupPriceCalc }}</span></p>
      <!-- Project details -->
      <section>
        <section class="flex items-center justify-between my-8">
          <h2 class="font-bold text-2xl">Project Details</h2>
          <button class="flex flex-row items-center px-4 py-2 gap-4 rounded-full border-1 border-hero">
            <Pencil />
            <p>Add Notes</p>
          </button>
        </section>
        <h3 class="text-xl font-bold" v-if="mockupData.title">{{ mockupData.title }}</h3>
        <p v-if="mockupData.description" class="mt-2">{{ mockupData.description }}</p>
        <ul class="mt-4 space-y-2">
          <li><strong>Color:</strong> <span>{{ mockupData.isColor ? 'Yes' : 'No' }}</span></li>
          <li><strong>Style:</strong> <span>{{ mockupData.style }}</span></li>
          <li><strong>Size:</strong> <span>{{ mockupData.size }}</span></li>
          <li><strong>Placement:</strong> <span>{{ mockupData.placement }}</span></li>
          <li><strong>Level of detail:</strong> <span>{{ mockupData.levelOfDetail }}</span></li>
          <li><strong>Budget:</strong> <span>{{ mockupData.budget }}</span></li>
          <li><strong>City:</strong> <span>{{ mockupData.location }}</span></li>
        </ul>
      </section>
      <section>
        <section class="flex items-center justify-between my-8">
          <h2 class="font-bold text-2xl">Add artist to this wishlist</h2>
          <button class="flex flex-row items-center px-4 py-2 gap-4 rounded-full border-1 border-hero">
            <PenTool />
            <p>Add Artists</p>
          </button>
        </section>
        <ArtistInfoCard :item="mockupArtistWishlist"/>
      </section>
    </section>
  </div>
</template>

<script setup>
import { Pencil, PenTool } from 'lucide-vue-next'
const mockupPriceCalc = "400-500 CHF"
const mockupData = {
  id: 1,
  title: 'Flower with sword',
  description: 'Flower with sword — a detailed design featuring a rose entwined around a medieval-style sword, symbolizing beauty and strength.',
  isColor: true,
  style: 'Microrealistic',
  size: '20 cm x 10 cm',
  placement: 'Arm',
  levelOfDetail: 'Medium',
  budget: 'Normal',
  location: 'Berlin',
  timestamp: '2023-10-01T10:00:00Z',
  img: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
}
const mockupArtistWishlist = [
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
    works: []
  }
];

function formatToLongDate(isoString) {
  if (!isoString) return ''
  try {
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    return formatter.format(date)
  } catch (e) {
    return isoString
  }
}

const formattedDate = computed(() => formatToLongDate(mockupData.timestamp))
useHead({
  title: 'Request Details | tattoomii',
})
</script>

<style>

</style>