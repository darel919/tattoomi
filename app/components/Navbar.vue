<template>
    <!-- THIS NAVBAR IS NOT RESPONSIVE! (yet). minimum width should be atleast 1024px. -->
    <nav class="navbar py-8 px-12 flex flex-col">
        <section class="relative flex flex-row justify-between w-full items-center">
            <div class="navbar-branding-start w-40">
                <NuxtLink to="/">
                    <ClientOnly>
                        <img v-if="effectiveTheme === 'dark'" src="/assets/images/logo_light.png" alt="Logo">
                        <img v-else src="/assets/images/logo_dark.png" alt="Logo">
                    </ClientOnly>
                </NuxtLink>
            </div>
            <div class="navbar-navigation gap-8 flex flex-row font-bold absolute left-1/2 transform -translate-x-1/2">
                <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path"
                    :class="getNavLinkClasses(item.path)">
                    {{ item.name }}
                </NuxtLink>
            </div>
            <div class="navbar-action-end relative">
                <div>
                    <div class="buttons gap-8 flex items-center">
                        <NuxtLink class="button is-primary text-sm" to="/register">
                            <strong>Register as Artist</strong>
                        </NuxtLink>
                        <div class="relative">
                            <NuxtLink class="button bg-hero font-bold text-black px-4 py-2 rounded-full text-sm"
                                to="/login">
                                Log in / Register
                            </NuxtLink>
                            <div class="absolute right-0 top-full mt-8">
                                <ThemeToggleSwitch />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="relative">
            <div class="w-full max-w-3xl mx-auto relative">
                <NavbarFields />
            </div>
        </section>
    </nav>
</template>

<script setup>
const route = useRoute()
const colorMode = useColorMode()
const effectiveTheme = computed(() => {
    if (!colorMode || !colorMode.preference) return 'light'
    return colorMode.preference === 'dark' ? 'dark' : 'light'
})

const isThemeReady = computed(() => {
    return !!(colorMode && (colorMode.preference === 'dark' || colorMode.preference === 'light'))
})

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