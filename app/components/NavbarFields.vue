<template>
    <div class="w-full max-w-3xl mx-auto relative">
        <section class="rounded-full border border-hero overflow-hidden my-6 p-2 flex items-center">
            <span class="inline-flex items-center rounded-full px-3 py-1 font-grift text-sm mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wand-sparkles-icon lucide-wand-sparkles h-4 w-4 mr-2"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>
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

        <div class="absolute right-0 top-full transform translate-y-2">
            <slot name="toggle" />
        </div>
    </div>
</template>