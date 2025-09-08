<template>
    <!-- THIS NAVBAR IS NOT RESPONSIVE! (yet). minimum width should be atleast 1024px. -->
    <nav class="navbar pt-8 px-12 -mb-2 flex flex-col">
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
                <ClientOnly>
                    <div class="buttons gap-6 flex items-center">
                        <template v-if="auth?.isAuthenticated">
                            <ClientOnly>
                                <MessageCircle @click="navigateTo('/chat/1')"/>
                                <div class="relative" ref="dropdownRoot">
                                    <button @click="toggleDropdown" class="flex items-center gap-3 border-1 border-hero py-1 pl-1 pr-4 rounded-full focus:outline-none">
                                        <div class="w-8 h-8 rounded-full overflow-hidden">
                                            <img v-if="auth.user?.nickPhotoSrc" :src="auth.user.nickPhotoSrc" class="w-full h-full object-cover" alt="Avatar">
                                            <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-100">
                                                {{ avatarInitials }}
                                            </div>
                                        </div>
                                        <div class="text-sm font-semibold">{{ displayName }}</div>
                                    </button>

                                    <transition name="fade">
                                        <div v-if="isOpen" :class="auth.role === 'artist' ? 'absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-hero p-4 z-50 overflow-hidden' : 'absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-hero p-4 z-50 overflow-hidden'">
                                            <!-- Artist dropdown -->
                                            <template v-if="auth.role === 'artist'">
                                                <div class="flex items-center gap-3 mb-4">
                                                    <div class="w-12 h-12 rounded-full overflow-hidden">
                                                        <img v-if="auth.user?.nickPhotoSrc" :src="auth.user.nickPhotoSrc" class="w-full h-full object-cover" alt="Avatar">
                                                        <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-100">
                                                            {{ avatarInitials }}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="font-semibold">{{ displayName }}</div>
                                                        <div class="text-xs text-gray-500">Tattoomii Artist</div>
                                                    </div>
                                                </div>
                                                <ul class="divide-y divide-gray-100 dark:divide-gray-700">
                                                    <li class="py-3">
                                                        <NuxtLink to="/profile" @click.native="closeDropdown">My Profile</NuxtLink>
                                                    </li>
                                                    <li class="py-3">
                                                        <NuxtLink to="/profile?tabView=requests" @click.native="closeDropdown">Requests</NuxtLink>
                                                    </li>
                                                    <li class="py-3">About</li>
                                                    <li class="py-3">Help</li>
                                                    <li class="py-3 flex items-center gap-2" @click="doLogout" role="button">
                                                        <LogOut />
                                                        <span>Log out</span>
                                                    </li>
                                                </ul>
                                            </template>

                                            <!-- User dropdown -->
                                            <template v-else>
                                                <section class="p-3">
                                                    <div class="flex items-center gap-3 mb-4">
                                                        <div class="w-12 h-12 rounded-full overflow-hidden">
                                                            <img v-if="auth.user?.nickPhotoSrc" :src="auth.user.nickPhotoSrc" class="w-full h-full object-cover" alt="Avatar">
                                                                <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-100">
                                                                    {{ avatarInitials }}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div class="font-semibold">{{ displayName }}</div>
                                                                <div class="text-xs text-gray-500">Tattoomii User</div>
                                                            </div>
                                                        </div>
                                                        <ul class="">
                                                            <li class="py-3 border-b border-gray-200 dark:border-gray-700">
                                                                <NuxtLink to="/profile" @click.native="closeDropdown">My Profile</NuxtLink>
                                                            </li>
                                                            <section class="py-3 border-b border-gray-200 dark:border-gray-700">
                                                                <li class="py-2">
                                                                    <NuxtLink to="/profile" @click.native="closeDropdown">Projects</NuxtLink>
                                                                </li>
                                                                <li class="py-2">
                                                                    <NuxtLink to="/profile?tabView=requests" @click.native="closeDropdown">Request</NuxtLink>
                                                                </li>
                                                                <li class="py-2">
                                                                    <NuxtLink to="/profile?tabView=likedArtist" @click.native="closeDropdown">Liked artists</NuxtLink>
                                                                </li>
                                                            </section>
                                                            <section class="py-3 border-b border-gray-200 dark:border-gray-700">
                                                                <li class="py-2">About</li>
                                                                <li class="py-2">Help</li>
                                                            </section>
                                                            <li class="mt-6 flex items-center gap-2" @click="doLogout" role="button">
                                                                <LogOut />
                                                                <span>Log out</span>
                                                            </li>
                                                        </ul>
                                                    </section>
                                                </template>
                                            </div>
                                        </transition>
                                    </div>
                                </ClientOnly>
                            </template>
                        <template v-else>
                            <NuxtLink class="button is-primary text-sm" to="/register">
                                <strong>Register as Artist</strong>
                            </NuxtLink>
                            <div class="relative">
                                <NuxtLink class="button bg-hero font-bold text-black px-4 py-2 rounded-full text-sm"
                                    to="/login">
                                    Log in / Register
                                </NuxtLink>
                                
                            </div>
                        </template>
                        <div class="absolute right-0 top-full mt-8 z-2">
                            <ThemeToggleSwitch />
                        </div>
                    </div>
                </ClientOnly>
            </div>
        </section>
        <section class="relative">
            <div class="w-full max-w-3xl mx-auto relative">
                <NavbarFields />
            </div>
        </section>
        <div class="border-b border-gray-300 dark:border-gray-700 w-full"></div>
    </nav>
</template>

<script setup>
import { MessageCircle, LogOut } from 'lucide-vue-next'
const route = useRoute()
const colorMode = useColorMode()
const effectiveTheme = computed(() => {
    if (!colorMode || !colorMode.preference) return 'light'
    return colorMode.preference === 'dark' ? 'dark' : 'light'
})

const auth = useMyAuthStore()
const isOpen = ref(false)
const dropdownRoot = ref(null)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const closeDropdown = () => {
    isOpen.value = false
}

const handleOutsideClick = (e) => {
    if (!dropdownRoot.value) return
    if (!dropdownRoot.value.contains(e.target)) {
        closeDropdown()
    }
}

onMounted(() => {
    window.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
    window.removeEventListener('click', handleOutsideClick)
})

const displayName = computed(() => {
    return auth.user?.fullName || 'User'
})

const avatarInitials = computed(() => {
    if (!auth.user) return 'U'
    const fullName = auth.user.fullName || auth.user.name || ''
    const first = (fullName || '').trim().charAt(0).toUpperCase()
    return first || 'U'
})

const doLogout = async () => {
    await auth.logout()
    closeDropdown()
    navigateTo('/')
}

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