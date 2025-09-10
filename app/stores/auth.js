import { defineStore } from 'pinia'

export const useMyAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    role: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(email, password) {
      try {
        const config = useRuntimeConfig()
        const response = await $fetch(config.public.baseURL + '/api/user/login', {
          method: 'POST',
          body: { email, password }
        })
        // If backend returns a token, treat login as successful
        if (response && response.token) {
          this.token = response.token
          // fetch user in background but don't await here to keep behavior similar
          this.fetchUser()
          this.isAuthenticated = true
          if (process.client) {
            localStorage.setItem('authToken', response.token)
          }
          return response
        }

        // No token -> treat as login failure. Use backend message if present.
        this.isAuthenticated = false
        console.warn('Login failed: no token in response', response)
        const msg = response && response.message ? response.message : 'Login failed: missing token from server'
        throw new Error(msg)
      } catch (error) {
        this.isAuthenticated = false
        throw error
      }
    },
    async logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      if (process.client) {
        localStorage.removeItem('authToken')
      }
    },
    async fetchUser() {
      try {
        const config = useRuntimeConfig()
        const response = await $fetch(config.public.baseURL + '/api/user/userDashboard', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        this.user = response.data
        this.role = response.data.role
        return response
      } catch (error) {
        this.user = null
        this.role = null
        this.isAuthenticated = false
        throw error
      }
    },
    async initializeAuth() {
      if (process.client) {
        const token = localStorage.getItem('authToken')
        if (token) {
          this.token = token
          try {
            await this.fetchUser()
            this.isAuthenticated = true
          } catch (error) {
            this.token = null
            this.user = null
            this.isAuthenticated = false
            localStorage.removeItem('authToken')
          }
        }
      }
    },
    async register(email, password, fullName) {
      try {
        const config = useRuntimeConfig()
        const response = await $fetch(config.public.baseURL + '/api/user/registerUser', {
          method: 'POST',
          body: { email, password, fullName }
        })
        if (response && response.token) {
          this.token = response.token
          this.fetchUser()
          this.isAuthenticated = true
          if (process.client) {
            localStorage.setItem('authToken', response.token)
          }
          return response
        }

        this.isAuthenticated = false
        const msg = response && response.message ? response.message : 'Registration failed: missing token from server'
        throw new Error(msg)
      } catch (error) {
        this.isAuthenticated = false
        throw error
      }
    },
    async registerArtist(email, password, phoneNumber) {
      throw "Not Implemented"
      try {
        const config = useRuntimeConfig()
        const response = await $fetch(config.public.baseURL + '/api/artist/registerArtist', {
          method: 'POST',
          body: { email, password, phoneNumber }
        })
        if (response.token) {
          this.token = response.token
          this.isAuthenticated = true
          if (process.client) {
            localStorage.setItem('authToken', response.token)
          }
        }
        return response
      } catch (error) {
        this.isAuthenticated = false
        throw error
      }
    },
  }
})
