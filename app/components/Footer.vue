<template>
<footer class="footer p-16 bg-black text-white">
    <section class="flex flex-row justify-between w-full">
        <section class="flex flex-col items-start">
            <img src="/assets/images/logo_light.png" alt="Logo" class="w-48 mb-4"/>
            <p>We love all of you, thank you for being here!</p>
        </section>
        <section class="flex flex-row gap-16">
            <div class="flex flex-col">
                <h3 class="footer-title mb-2">Explore</h3>
                <NuxtLink class="link link-hover" to="/">Blog</NuxtLink>
                <NuxtLink class="link link-hover" to="/">Price Calculator</NuxtLink>
                <NuxtLink class="link link-hover" to="/">Artist Finder</NuxtLink>
                <NuxtLink class="link link-hover" to="/">Styleguide</NuxtLink>
            </div>

            <div class="flex flex-col">
                <h3 class="footer-title mb-2">Company</h3>
                <NuxtLink class="link link-hover" to="/">About us</NuxtLink>
                <NuxtLink class="link link-hover" to="/">FAQs</NuxtLink>
                <NuxtLink class="link link-hover" to="/contact">Contact Us</NuxtLink>
            </div>

            <div class="flex flex-col">
                <h3 class="footer-title mb-2">Legal</h3>
                <NuxtLink class="link link-hover" to="/tos">Terms and Conditions</NuxtLink>
                <NuxtLink class="link link-hover" to="/privacypolicy">Privacy Policy</NuxtLink>
                <NuxtLink class="link link-hover" to="/">Cookie Settings</NuxtLink>
            </div>
        </section>

    </section>
    <section class="w-full mt-6 text-center text-sm opacity-70">
        <p>© 2025 Tattoomi. All rights reserved.</p>
    </section>
</footer>
</template>