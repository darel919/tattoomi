<template>
  <div class="shadow flex flex-col justify-between gap-4 border border-secondary-400 rounded-3xl p-6">
    <div class="flex items-center justify-between">
      <div class="flex gap-2">
        <div>
          <div class="avatar">
            <div class="w-7 rounded-full">
              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
            </div>
          </div>
        </div>
        <div>
          <p class="font-semibold text-secondary-100">{{ name }}</p>
          <p class="text-sm text-secondary-200">
            {{ country }} · {{ timeAgo }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex">
          <Star v-for="(filled, i) in getStars(rating)" :key="i"
            :class="filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'" class="w-4 h-4" />
        </div>
        <span class="text-xs font-semibold text-secondary-100">{{ rating.toFixed(1) }}</span>
        <button class="btn btn-outline border-primary-yellow rounded-full btn-circle hover:bg-primary-yellow">
          <Flag :size="20" />
        </button>
      </div>
    </div>
    <p class="text-secondary-100 text-sm leading-relaxed">
      {{ review }}
    </p>
    <div class="grid grid-cols-5 justify-center text-center">
      <div>
        <p class="font-semibold">Body Part</p>
        <p>{{ bodyPart }}</p>
      </div>
      <div class="flex justify-center items-center">
        <div class="divider lg:divider-horizontal before:bg-secondary-400 after:bg-secondary-400"></div>
      </div>
      <div>
        <p class="font-semibold">Detail</p>
        <p>{{ detail }}</p>
      </div>
      <div class="flex justify-center items-center">
        <div class="divider lg:divider-horizontal before:bg-secondary-400 after:bg-secondary-400"></div>
      </div>
      <div>
        <p class="font-semibold">Budget</p>
        <p>{{ budget }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Star, Flag } from "lucide-vue-next";

defineProps({
  name: { type: String, required: true },
  country: { type: String, required: true },
  timeAgo: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  bodyPart: { type: String, required: true },
  detail: { type: String, required: true },
  budget: { type: String, required: true }
});

// Helper: Generate stars array
const getStars = (rating) => {
  const full = Math.floor(rating);
  return Array.from({ length: 5 }, (_, i) => i < full);
};
</script>