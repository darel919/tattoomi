<template>
    <div>
    <teleport to="body">
        <div v-if="visible" class="fixed inset-0 z-[9999]">
            <div class="absolute inset-0 bg-black/70" @click="close" aria-hidden="true"></div>
            <div class="relative z-[10000] min-h-screen flex items-center justify-center p-4 pointer-events-none">
                <div class="modal-box relative max-w-[1200px] w-[calc(100%-32px)] p-0  pointer-events-auto backdrop-blur-sm shadow-2xl z-[100]" :class="{ 'force-show': visible }" role="dialog" aria-modal="true" aria-label="Style detail">
                    <div class="flex flex-col md:flex-row rounded-xl overflow-hidden" style="background: transparent;">
                        <!-- Left image column (60%) -->
                        <div class="md:w-1/2 w-full bg-black/5" style="min-height:480px; max-height:760px;">
                            <img :src="styleData.image" :alt="styleData.name" class="w-full h-full object-cover block" />
                        </div>

                        <!-- Right content column (50%) -->
                        <div class="md:w-1/2 w-full py-12 px-8 md:px-14" style="background: #0f0f10; color: #ffffff; position:relative;">
                            <button aria-label="close" class="absolute right-6 top-6 btn btn-ghost btn-square text-white" @click="close">✕</button>
                            <h2 class="font-grift font-bold" style="font-size:28px;line-height:36px;margin-bottom:12px;color:#FFFFFF;">{{ styleData.name }} Tattoo</h2>
                            <p style="color:rgba(255,255,255,0.85);max-width:420px;margin-bottom:18px;font-size:15px;line-height:22px;">{{ styleData.description }}</p>
                            <h4 style="color:#FFFFFF;font-weight:600;margin-bottom:8px">Main features:</h4>
                            <ul style="color:rgba(255,255,255,0.9);margin-left:18px;margin-bottom:20px;">
                                <li v-for="(f, i) in styleData.features || defaultFeatures" :key="i" style="margin-bottom:8px;font-size:14px;line-height:20px;">{{ f }}</li>
                            </ul>
                            <div style="max-width:360px;">
                                <button class="w-full py-3 rounded-full bg-hero text-black font-semibold flex items-center justify-between px-4">Use for Calculator <span class="opacity-80">→</span></button>
                                <button class="w-full mt-3 py-3 rounded-full border border-hero text-hero font-semibold flex items-center justify-between px-4">Discover artists with this style <span class="opacity-80">→</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
    </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  styleData: { type: Object, default: () => ({ name: '', description: '', image: '' }) }
})
const emit = defineEmits(['update:modelValue'])

const visible = ref(props.modelValue)
watch(() => props.modelValue, v => visible.value = v)
watch(visible, v => emit('update:modelValue', v))

function close() { visible.value = false }

function onKey(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

const defaultFeatures = [
  'Thin, precise lines',
  'Minimal use of shading',
  'Often black ink, but can also contain color',
  'Suitable for small to medium-sized tattoos',
  'Clean and elegant appearance'
]
</script>

<style scoped>
.modal-box { border-radius: 8px; overflow: hidden; }
@media (min-width: 768px) {
  .modal-box { display: flex; }
}

.force-show {
  position: fixed !important;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 35000 !important;
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}
</style>
