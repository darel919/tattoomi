<template>
  <div class="min-h-screen bg-base-200">
    <!-- Back to Blog Header -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="pb-6 border-b border-base-300">
        <NuxtLink to="/blog" class="inline-flex items-center gap-2 text-base-content hover:text-base-content/80 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span class="text-sm font-medium">Back to blog</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Article Header -->
    <div v-if="blog" class="max-w-4xl mx-auto px-4 pb-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold font-grift text-base-content mb-4 leading-tight">
          {{ blog.title }}
        </h1>
        
        <div class="text-lg font-grift text-base-content/80 mb-8">
          <div>{{ new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
          <div>{{ blog.readTime }} min read</div>
        </div>
        
        <!-- Hero Image -->
        <img 
          :src="blog.headImageSrc"
          :alt="blog.title" 
          class="w-full h-80 object-cover rounded-2xl shadow-sm"
        />
      </div>
    </div>

    <!-- Article Content -->
    <div v-if="blog" class="max-w-4xl mx-auto px-4 pb-12">
      <div class="border-b border-base-300 pb-8 mb-8">
        <div class="prose prose-lg max-w-none font-grift text-base-content">
          <div class="text-xl leading-relaxed mb-6" v-html="blog.content.replace(/\n\n/g, '<br><br>')"></div>
        </div>
      </div>

      <!-- Author Credit -->
      <div class="text-center">
        <p class="text-xl font-grift text-base-content">
          Written By {{ blog.authorName }}
        </p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-4 py-8 text-center">
      <ErrorState 
        title="Failed to load the blog" 
        recommendations="Please try again later." 
        @retry="retryFetch" 
      />
    </div>

    <!-- Loading State -->
    <div v-else class="max-w-4xl mx-auto px-4 py-8 text-center">
      <p class="text-base-content">Loading...</p>
    </div>
  </div>
</template>

<script setup>
// Get the slug from the route
const route = useRoute()
const id = route.params.id
const config = useRuntimeConfig()
// Fetch the blog data
const { data: blogData, error, refresh } = await useFetch(`${config.public.baseURL}/api/blog/${id}`)

const blog = computed(() => blogData.value?.blog || null)

const retryFetch = () => {
  refresh()
}

// Set meta tags for SEO
useHead({
  title: blog.value ? `${blog.value.title} - Tattoomii` : 'Blog - Tattoomii',
  meta: [
    { name: 'description', content: blog.value ? blog.value.content.substring(0, 150) + '...' : 'Read our latest blog posts.' },
    { property: 'og:title', content: blog.value?.title || 'Blog' },
    { property: 'og:description', content: blog.value ? blog.value.content.substring(0, 150) + '...' : 'Read our latest blog posts.' },
    { property: 'og:image', content: blog.value?.headImageSrc || '' }
  ]
})
</script>
