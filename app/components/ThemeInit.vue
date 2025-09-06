<template>
  <div/>
</template>

<script setup>
const colorMode = useColorMode()

onMounted(() => {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null
  if (stored === 'dark' || stored === 'light') {
    colorMode.preference = stored
  } else {
    // default to light if nothing stored
    colorMode.preference = 'light'
    try { localStorage.setItem('theme', 'light') } catch (e) { /* ignore */ }
  }

  const applyVisuals = (pref) => {
    const bgColor = pref === 'dark' ? 'white' : '#003'
    document.documentElement.style.setProperty('--bg', bgColor)
    if (pref === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  applyVisuals(colorMode.preference)
  watch(() => colorMode.preference, (newPref) => {
    try { localStorage.setItem('theme', newPref) } catch (e) { /* ignore */ }
    applyVisuals(newPref)
  })
})
</script>
