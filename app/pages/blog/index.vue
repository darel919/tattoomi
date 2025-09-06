<template>
  <div class="min-h-screen bg-base-200">
    <!-- Page Header -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="flex justify-between items-center pb-8 border-b border-base-300">
        <div>
          <h1 class="text-4xl font-bold font-grift text-base-content">Blog</h1>
        </div>
        
        <!-- Search Bar -->
        <div class="flex items-center bg-base-100 rounded-full border border-base-300 p-2 w-80">
          <input 
            type="text" 
            placeholder="Search for article..." 
            class="flex-1 bg-transparent border-none outline-none px-3 text-base-content placeholder:text-base-content/60"
          />
          <button class="btn btn-sm bg-hero hover:bg-hero/90 border-none rounded-full">
            <svg class="w-5 h-5 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Blog Posts List -->
    <div class="max-w-4xl mx-auto px-4 pb-12">
      <div class="space-y-8">
        <!-- Blog Post Card 1 -->
        <article class="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
          <!-- Image Container -->
          <div class="relative p-6 pb-0">
            <div class="relative">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/080b7e82753c42df73811c9f3fe0a791c26198c7?width=1472"
                alt="Tattoo collaboration"
                class="w-full h-64 object-cover rounded-xl"
              />
              <!-- Badge -->
              <div class="absolute top-3 right-3">
                <span class="badge bg-neutral text-neutral-content">
                  Collaboration
                </span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 pt-4">
            <!-- Title -->
            <NuxtLink :to="'/blog/' + 'collaborating-with-your-tattoo-artist'" class="block">
              <h2 class="text-xl font-bold text-base-content mb-3 font-grift leading-tight hover:text-base-content/80 transition-colors cursor-pointer">
                From Concept to Skin: Collaborating with Your Tattoo Artist to Craft a One-of-a-Kind Design
              </h2>
            </NuxtLink>

            <!-- Author and Meta Info -->
            <div class="flex items-center gap-2 mb-4 text-sm">
              <!-- Author -->
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 bg-base-300 rounded-full flex-shrink-0"></div>
                <span class="text-base-content font-bold font-grift">Mathew Whyte</span>
              </div>
              
              <!-- Dot Separator -->
              <div class="w-1 h-1 bg-base-content rounded-full"></div>
              
              <!-- Reading Time -->
              <div class="flex items-center gap-1 text-base-content/60">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
                <span>8 min read</span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-base-content/80 mb-4 text-sm leading-relaxed">
              When a client brings only a loose idea—or a Pinterest board full of them—great artists know how to translate scattered inspiration into cohesive, living art.
            </p>

            <!-- Read More Button -->
            <NuxtLink to="/blogdetail" class="inline-flex items-center gap-2 text-base-content font-bold font-grift hover:gap-3 transition-all duration-200 text-sm">
              <span>Read More</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </article>

        <!-- Blog Post Card 2 -->
        <article class="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
          <!-- Image Container -->
          <div class="relative p-6 pb-0">
            <div class="relative">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/08a25bec611f386bb1b066f25c9b3e4fdbdf9ad7?width=1472"
                alt="Tattoo collaboration"
                class="w-full h-64 object-cover rounded-xl"
              />
              <!-- Badge -->
              <div class="absolute top-3 right-3">
                <span class="badge bg-neutral text-neutral-content">
                  Collaboration
                </span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 pt-4">
            <!-- Title -->
            <NuxtLink :to="'/blog/' + 'collaborating-with-your-tattoo-artist'" class="block">
              <h2 class="text-xl font-bold text-base-content mb-3 font-grift leading-tight hover:text-base-content/80 transition-colors cursor-pointer">
                From Concept to Skin: Collaborating with Your Tattoo Artist to Craft a One-of-a-Kind Design
              </h2>
            </NuxtLink>

            <!-- Author and Meta Info -->
            <div class="flex items-center gap-2 mb-4 text-sm">
              <!-- Author -->
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 bg-base-300 rounded-full flex-shrink-0"></div>
                <span class="text-base-content font-bold font-grift">Mathew Whyte</span>
              </div>
              
              <!-- Dot Separator -->
              <div class="w-1 h-1 bg-base-content rounded-full"></div>
              
              <!-- Reading Time -->
              <div class="flex items-center gap-1 text-base-content/60">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
                <span>8 min read</span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-base-content/80 mb-4 text-sm leading-relaxed">
              When a client brings only a loose idea—or a Pinterest board full of them—great artists know how to translate scattered inspiration into cohesive, living art.
            </p>

            <!-- Read More Button -->
            <NuxtLink to="/blogdetail" class="inline-flex items-center gap-2 text-base-content font-bold font-grift hover:gap-3 transition-all duration-200 text-sm">
              <span>Read More</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </article>

        <!-- Blog Post Card 3 -->
        <article class="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
          <!-- Image Container -->
          <div class="relative p-6 pb-0">
            <div class="relative">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/294199835a23e5f68f5e06d09ee4fa914ae3c1ee?width=1472"
                alt="Tattoo collaboration"
                class="w-full h-64 object-cover rounded-xl"
              />
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 pt-4">
            <!-- Title -->
            <NuxtLink :to="'/blog/' + 'collaborating-with-your-tattoo-artist'" class="block">
              <h2 class="text-xl font-bold text-base-content mb-3 font-grift leading-tight hover:text-base-content/80 transition-colors cursor-pointer">
                From Concept to Skin: Collaborating with Your Tattoo Artist to Craft a One-of-a-Kind Design
              </h2>
            </NuxtLink>

            <!-- Author and Meta Info -->
            <div class="flex items-center gap-2 mb-4 text-sm">
              <!-- Author -->
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 bg-base-300 rounded-full flex-shrink-0"></div>
                <span class="text-base-content font-bold font-grift">Mathew Whyte</span>
              </div>
              
              <!-- Dot Separator -->
              <div class="w-1 h-1 bg-base-content rounded-full"></div>
              
              <!-- Reading Time -->
              <div class="flex items-center gap-1 text-base-content/60">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
                <span>8 min read</span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-base-content/80 mb-4 text-sm leading-relaxed">
              When a client brings only a loose idea—or a Pinterest board full of them—great artists know how to translate scattered inspiration into cohesive, living art.
            </p>

            <!-- Read More Button -->
            <NuxtLink to="/blogdetail" class="inline-flex items-center gap-2 text-base-content font-bold font-grift hover:gap-3 transition-all duration-200 text-sm">
              <span>Read More</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center gap-1 mt-8">
        <!-- Previous Button -->
        <button class="btn btn-sm btn-outline btn-square">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <!-- Page Numbers -->
        <button class="btn btn-sm btn-outline font-grift">
          1
        </button>
        
        <button class="btn btn-sm bg-hero hover:bg-hero/90 border-hero text-base-content font-grift">
          2
        </button>
        
        <button class="btn btn-sm btn-outline font-grift">
          3
        </button>

        <!-- Next Button -->
        <button class="btn btn-sm btn-outline btn-square">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
   