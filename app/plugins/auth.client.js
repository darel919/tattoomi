export default defineNuxtPlugin(async () => {
  const authStore = useMyAuthStore()
  await authStore.initializeAuth()
})
