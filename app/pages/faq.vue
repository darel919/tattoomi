<template>
    <div class="flex justify-center">
        <section class="w-full max-w-3xl mx-auto p-6 bg-white/0">
            <header class="text-center mb-8">
                <h1 class="text-3xl font-semibold">Frequently Asked Questions (FAQs)</h1>
                <h6 class="text-sm opacity-80">Version 1.0 - Status: April 2025</h6>
            </header>
            
            <section class="gap-4 flex flex-col items-center">
                <div class="w-full flex justify-center">
                    <div role="tablist" class="tabs tabs-border mx-auto" aria-label="FAQ sections">
                        <a
                            role="tab"
                            id="tab-lover"
                            :class="{ tab: true, 'tab-active': activeTab === 'lover' }"
                            @click.prevent="activeTab = 'lover'"
                            :aria-selected="activeTab === 'lover'"
                            :tabindex="activeTab === 'lover' ? 0 : -1"
                            :aria-controls="'panel-lover'"
                        >
                            Tattoo Lover
                        </a>

                        <a
                            role="tab"
                            id="tab-artist"
                            :class="{ tab: true, 'tab-active': activeTab === 'artist' }"
                            @click.prevent="activeTab = 'artist'"
                            :aria-selected="activeTab === 'artist'"
                            :tabindex="activeTab === 'artist' ? 0 : -1"
                            :aria-controls="'panel-artist'"
                        >
                            Tattoo Artist
                        </a>

                        <a
                            role="tab"
                            id="tab-company"
                            :class="{ tab: true, 'tab-active': activeTab === 'company' }"
                            @click.prevent="activeTab = 'company'"
                            :aria-selected="activeTab === 'company'"
                            :tabindex="activeTab === 'company' ? 0 : -1"
                            :aria-controls="'panel-company'"
                        >
                            Company
                        </a>
                    </div>
                </div>

                <div class="w-full max-w-3xl">
                    <div v-if="activeTab === 'lover'" role="tabpanel" id="panel-lover" :aria-labelledby="'tab-lover'" class="tab-panel">
                        <div class="collapse bg-base-100 border-base-300 border collapse-arrow">
                            <input type="radio" name="my-accordion-2" :checked="true" />
                            <div class="collapse-title font-semibold">FAQ 1</div>
                            <div class="collapse-content text-sm">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quod, voluptates et dignissimos provident eius? Labore quod magni maiores veritatis accusantium necessitatibus voluptas alias, optio nisi adipisci rem dicta assumenda?
                            </div>
                        </div>
                        <div class="collapse bg-base-100 border-base-300 border collapse-arrow">
                            <input type="radio" name="my-accordion-2" />
                            <div class="collapse-title font-semibold">FAQ 2</div>
                            <div class="collapse-content text-sm">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quod, voluptates et dignissimos provident eius? Labore quod magni maiores veritatis accusantium necessitatibus voluptas alias, optio nisi adipisci rem dicta assumenda?
                            </div>
                        </div>
                         <div class="collapse bg-base-100 border-base-300 border collapse-arrow">
                            <input type="radio" name="my-accordion-2" />
                            <div class="collapse-title font-semibold">FAQ 3</div>
                            <div class="collapse-content text-sm">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quod, voluptates et dignissimos provident eius? Labore quod magni maiores veritatis accusantium necessitatibus voluptas alias, optio nisi adipisci rem dicta assumenda?
                            </div>
                        </div>
                         <div class="collapse bg-base-100 border-base-300 border collapse-arrow">
                            <input type="radio" name="my-accordion-2" />
                            <div class="collapse-title font-semibold">FAQ 4</div>
                            <div class="collapse-content text-sm">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quod, voluptates et dignissimos provident eius? Labore quod magni maiores veritatis accusantium necessitatibus voluptas alias, optio nisi adipisci rem dicta assumenda?
                            </div>
                        </div>
                         <div class="collapse bg-base-100 border-base-300 border collapse-arrow">
                            <input type="radio" name="my-accordion-2" />
                            <div class="collapse-title font-semibold">FAQ 5</div>
                            <div class="collapse-content text-sm">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quod, voluptates et dignissimos provident eius? Labore quod magni maiores veritatis accusantium necessitatibus voluptas alias, optio nisi adipisci rem dicta assumenda?
                            </div>
                        </div>
                    </div>

                    <div v-if="activeTab === 'artist'" role="tabpanel" id="panel-artist" :aria-labelledby="'tab-artist'" class="tab-panel">
                        <div class="collapse bg-base-100 border-base-300 border collapse-arrow">
                            <input type="radio" name="my-accordion-3" />
                            <div class="collapse-title font-semibold">FAQ 1</div>
                            <div class="collapse-content text-sm">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quod, voluptates et dignissimos provident eius? Labore quod magni maiores veritatis accusantium necessitatibus voluptas alias, optio nisi adipisci rem dicta assumenda?
                            </div>
                        </div>
                        <div class="collapse bg-base-100 border-base-300 border collapse-arrow">
                            <input type="radio" name="my-accordion-3" />
                            <div class="collapse-title font-semibold">FAQ 2</div>
                            <div class="collapse-content text-sm">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quod, voluptates et dignissimos provident eius? Labore quod magni maiores veritatis accusantium necessitatibus voluptas alias, optio nisi adipisci rem dicta assumenda?
                            </div>
                        </div>
                    </div>

                    <div v-if="activeTab === 'company'" role="tabpanel" id="panel-company" :aria-labelledby="'tab-company'" class="tab-panel">
                        <div class="collapse bg-base-100 border-base-300 border collapse-arrow">
                            <input type="radio" name="my-accordion-4" />
                            <div class="collapse-title font-semibold">FAQ 1</div>
                            <div class="collapse-content text-sm">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quod, voluptates et dignissimos provident eius? Labore quod magni maiores veritatis accusantium necessitatibus voluptas alias, optio nisi adipisci rem dicta assumenda?
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>

<script setup>
const activeTab = ref('')
onMounted(() => {
    activeTab.value = 'lover'
})
</script>