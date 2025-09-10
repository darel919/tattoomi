// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // THIS SHOULD BE REMOVED ON PROD!
      baseURL: 'https://tattoomii-f43c06650d05.herokuapp.com',
      // baseURL: 'https://tattoomiibe.darelisme.my.id',
    }
  },
  modules: ['@nuxtjs/color-mode', '@nuxtjs/leaflet', '@pinia/nuxt'],
  colorMode: {
    classSuffix: '',
    dataValue: 'theme',
    fallback: 'light',
    preference: 'light'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})