<template>
  <div class="flex gap-12">
    <div class="flex flex-col gap-6 max-w-[18.75rem]">
      <h4 class="text-2xl font-semibold">Customer Reviews</h4>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-1">
          <template v-for="i in 5" :key="i">
            <Star class="w-5 h-5 text-yellow-400" />
          </template>
          <span class="ml-2 text-gray-600 text-sm">0</span>
        </div>

        <div class="space-y-2">
          <div v-for="r in ratings" :key="r.stars" class="flex items-center gap-2 text-sm">
            <span class="w-4">{{ r.stars }}</span>
            <progress class="progress progress-primary w-full" :value="r.count" max="100" />
          </div>
        </div>
        <!-- <button
          class="btn btn-outline border-primary-yellow rounded-full btn-sm font-medium mt-2 hover:bg-primary-yellow">
          See all ratings
        </button> -->
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-10 gap-y-8">
      <ReviewCard name="Lindsey" country="Germany" timeAgo="13 hrs ago" :rating="4.9"
        review="Overall very good experience for my first tattoo very understanding to what I like." bodyPart="Arm"
        detail="Normal" budget="Normal" />
    </div>
  </div>
</template>

<script setup>
import { Star } from "lucide-vue-next"

const ratings = [
  { stars: 5, count: 0 },
  { stars: 4, count: 0 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
]
</script>