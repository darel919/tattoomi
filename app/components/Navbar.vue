<template>
    <!-- THIS NAVBAR IS NOT RESPONSIVE! (yet). minimum width should be atleast 1024px. -->
    <nav class="navbar py-8 px-8 flex flex-col">
        <section class="relative flex flex-row justify-between w-full items-center">
            <div class="navbar-branding-start w-40">
                <NuxtLink to="/">
                    <img src="/assets/images/logo_light.png" alt="Logo">
                </NuxtLink>
            </div>
            <div class="navbar-navigation gap-8 flex flex-row font-bold absolute left-1/2 transform -translate-x-1/2">
                <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path" :class="getNavLinkClasses(item.path)">
                    {{ item.name }}
                </NuxtLink>
            </div>
            <div class="navbar-action-end">
                <div>
                    <div class="buttons gap-8 flex items-center">
                        <NuxtLink class="button is-primary text-sm" to="/">
                            <strong>Register as Artist</strong>
                        </NuxtLink>
                        <NuxtLink class="button bg-hero text-black px-4 py-2 rounded-full text-sm" to="/login">
                            Log in / Register
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <NavbarFields/>
        </section>
    </nav>
</template>

<script setup>
const route = useRoute()

const navItems = [
  { name: 'Price Calculator', path: '/pricecalculator' },
  { name: 'Artist Finder', path: '/' },
  { name: 'Style Guide', path: '/styleguide' }
]

const isActive = (path) => {
  return route.path === path
}

const getNavLinkClasses = (path) => {
  const baseClasses = 'text-sm px-2 py-1 transition-colors duration-200'
  const activeClasses = isActive(path) ? 'border-b-2 border-hero' : 'border-b-2 border-transparent hover:border-gray-300'
  return `${baseClasses} ${activeClasses}`
}
</script>