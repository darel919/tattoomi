<template>
  <div class="theme-toggle">
    <div id="shape" class="changer" :class="{ change: isDark }"></div>

    <div id="toggle" class="changer" :class="{ change: isDark }" @click="onToggle" role="button" aria-label="Toggle theme">
      <span class="changer" :class="{ change: isDark }">
        <i class="moon changer" :class="{ change: isDark }" aria-hidden>
          <!-- moon SVG -->
          
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M4.93 19.07l1.41-1.41" />
              <path d="M17.66 6.34l1.41-1.41" />
            </g>
          </svg>
  </i>
  <i class="sun changer" :class="{ change: isDark }" aria-hidden>
          <!-- sun SVG -->
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
          </svg>
  </i>
      </span>
    </div>
  </div>
</template>

<script setup>

let colorMode
try {
  colorMode = useColorMode()
} catch (e) {
  colorMode = null
}

const isDark = ref(false)

onMounted(() => {
  if (colorMode) {
    isDark.value = colorMode.preference === 'dark'
  }
})

const toggleTheme = () => {
  // Toggle only between light and dark
  const next = isDark.value ? 'light' : 'dark'
  if (colorMode) colorMode.preference = next
  isDark.value = next === 'dark'
}

const onToggle = () => {
  // Mirror the simple click behavior from the original example (toggle classes) while keeping theme preference in sync
  toggleTheme()
}

// Keep in sync if colorMode.value changes
if (colorMode) {
  // keep in sync when colorMode value changes
  watch(() => colorMode.value, (v) => {
    isDark.value = colorMode.preference === 'dark'
  })

  watch(() => colorMode.preference, (p) => {
    isDark.value = p === 'dark'
  })
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  transition: 0.5s cubic-bezier(0.99, 1.56, 0.64, 1);
}

.theme-toggle {
  display: inline-block;
  position: relative;
}

/* Small toggle variant */
#toggle {
  width: 64px;
  height: 32px;
  background: #343d5b;
  box-shadow: inset 0 1px 4px 2px rgba(12, 12, 12, 0.2);
  display: block;
  border-radius: 20px;
  padding: 0.12rem 0.18rem;
  cursor: pointer;
  position: relative;
  z-index: 99;
}

span {
  width: 28px;
  height: 28px;
  background: #f1f1f1;
  border-radius: inherit;
  box-shadow: inset 0 1px 4px 2px rgba(13, 13, 13, 0.28),
    0 1px 4px 1px rgba(11, 11, 76, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

span i {
  font-size: 2rem;
  color: #263053;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s cubic-bezier(0.76, 0, 0.24, 1);
}

#shape {
  clip-path: circle(0% at 50% 50%);
  position: absolute;
  background: #1f1f1f;
  width: 100%;
  height: 100%;
  z-index: -1;
}

/* dark */

#toggle.change {
  background: #ffc727;
  box-shadow: inset 0 1px 6px 2px rgba(2, 2, 2, 0.6), 0 1px 6px 4px #1f1f1f;
}

#shape.change {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #1f1f1f;
  clip-path: circle(100% at 50% 50%);
  z-index: 1;
}

span.change {
  background: #f1f1f1;
  box-shadow: inset 0 1px 4px 2px rgba(23, 24, 23, 0.3),
    0 1px 4px 1px rgba(29, 29, 29, 0.9);
  transform: translateX(32px);
}

.moon {
  font-size: 1.2rem;
  opacity: 1;
}

.moon.change {
  font-size: 0;
  opacity: 0;
}

.sun {
  font-size: 0;
  opacity: 0;
}

.sun.change {
  font-size: 1.2rem;
  color: #ffa500;
  opacity: 1;
}
.moon svg,
.sun svg {
  width: 1.2rem;
  height: 1.2rem;
  color: inherit;
  display: block;
  margin: 0 auto;
  transition: transform 0.18s cubic-bezier(0.76, 0, 0.24, 1);
}

.moon svg {
  transform: translateX(10px);
}

.sun svg {
  transform: translateX(-9px);
}

</style>
