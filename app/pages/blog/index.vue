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
            v-model="searchQuery"
            @keyup.enter="searchBlogs"
          />
          <button class="btn btn-sm bg-hero hover:bg-hero/90 border-none rounded-full" @click="searchBlogs">
            <svg class="w-5 h-5 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Blog Posts List -->
    <div class="max-w-4xl mx-auto px-4 pb-12">
      <div v-if="error" class="text-center py-8">
        <ErrorState 
          title="Failed to load blogs" 
          recommendations="Please try again later." 
          @retry="retryFetch" 
        />
      </div>
      <div v-else-if="isLoading" class="text-center py-8">
        <p class="text-base-content">Loading blogs...</p>
      </div>
      <div v-else-if="blogs.length === 0" class="text-center py-8">
        <p class="text-base-content">No blogs available.</p>
      </div>
      <div v-else class="space-y-8">
        <article v-for="blog in blogs" :key="blog.id" class="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
          <!-- Image Container -->
          <div class="relative p-6 pb-0">
            <div class="relative">
              <img
                :src="blog.headImageSrc"
                :alt="blog.title"
                class="w-full h-64 object-cover rounded-xl"
              />
              <!-- Badge -->
              <div class="absolute top-3 right-3">
                <span class="badge bg-neutral text-neutral-content">
                  {{ blog.authorRole }}
                </span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 pt-4">
            <!-- Title -->
            <NuxtLink :to="'/blog/' + blog.id" class="block">
              <h2 class="text-xl font-bold text-base-content mb-3 font-grift leading-tight hover:text-base-content/80 transition-colors cursor-pointer">
                {{ blog.title }}
              </h2>
            </NuxtLink>

            <!-- Author and Meta Info -->
            <div class="flex items-center gap-2 mb-4 text-sm">
              <!-- Author -->
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 bg-base-300 rounded-full flex-shrink-0"></div>
                <span class="text-base-content font-bold font-grift">{{ blog.authorName }}</span>
              </div>
              
              <!-- Dot Separator -->
              <div class="w-1 h-1 bg-base-content rounded-full"></div>
              
              <!-- Reading Time -->
              <div class="flex items-center gap-1 text-base-content/60">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
                <span>{{ blog.readTime }} min read</span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-base-content/80 mb-4 text-sm leading-relaxed">
              {{ blog.content.split('\n\n')[0] }}
            </p>

            <!-- Read More Button -->
            <NuxtLink :to="'/blog/' + blog.id" class="inline-flex items-center gap-2 text-base-content font-bold font-grift hover:gap-3 transition-all duration-200 text-sm">
              <span>Read More</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <!-- <div class="flex items-center justify-center gap-1 mt-8">
        <button class="btn btn-sm btn-outline btn-square">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button class="btn btn-sm btn-outline font-grift">
          1
        </button>
        
        <button class="btn btn-sm bg-hero hover:bg-hero/90 border-hero text-base-content font-grift">
          2
        </button>
        
        <button class="btn btn-sm btn-outline font-grift">
          3
        </button>

        <button class="btn btn-sm btn-outline btn-square">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div> -->
    </div>
  </div>
</template>
   
<script setup>
useHead({
  title: 'Blog | tattooMii',
})

const searchQuery = ref('')
const blogs = ref([])
const isLoading = ref(false)
const error = ref(null)

const config = useRuntimeConfig()

const fetchBlogs = async (query = '') => {
  isLoading.value = true
  error.value = null
  try {
    const url = query ? config.public.baseURL + '/api/blog/searchBlogs' : config.public.baseURL + '/api/blog/getAllBlog'
    const body = query ? { query } : {}
    const response = await $fetch(url, { method: 'POST', body })
    blogs.value = response.blogs || []
  } catch (err) {
    error.value = err
  } finally {
    isLoading.value = false
  }
}

const searchBlogs = () => {
  fetchBlogs(searchQuery.value)
}

const retryFetch = () => {
  fetchBlogs(searchQuery.value)
}

// Initial load
onMounted(() => {
  fetchBlogs()
})
</script>