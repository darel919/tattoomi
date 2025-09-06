<template>
    <section class="w-full max-w-3xl mx-auto rounded-full border border-hero overflow-hidden my-6 p-2 flex items-center">
        <span class="inline-flex items-center rounded-full px-3 py-1 font-grift text-sm mr-2">
            <!-- <img src="/assets/images/logo_dark.png" alt="logo" class="h-4 w-4 mr-2" /> -->
            Tattoo Price Calculator
        </span>
        <span class="inline-flex items-center mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" fill="none" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2" />
            </svg>
            <input type="text" placeholder="Search" class="border-none outline-none bg-transparent text-sm w-24" />
        </span>
        <span class="inline-flex items-center ml-auto">
            <button class="flex items-center gap-1 text-sm px-3 py-1 rounded-full">
                Location
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </span>
    </section>
</template>