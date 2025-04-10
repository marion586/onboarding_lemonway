export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@pinia/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.LEMONWAY_API_URL,
      apiKey: process.env.LEMONWAY_API_KEY,
      clientId: process.env.LEMONWAY_CLIENT_ID
    }
  },
  routeRules: {
    '/api/oauth/**': { 
      proxy: { to: 'https://sandbox-api.lemonway.fr/oauth/**' } 
    },
    '/api/business/**': { 
      proxy: { to: process.env.LEMONWAY_API_URL + '/**' } 
    }
},
  elementPlus: {
    importStyle: 'css',
    themes: ['dark']
  },

  typescript: {
    strict: true
  },

  devtools: {
    enabled: false
  },

  compatibilityDate: '2025-04-10',
  spaLoadingTemplate: './spa-loading-template.html' 
})
