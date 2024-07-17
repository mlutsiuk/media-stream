// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/ui'
  ],
  runtimeConfig: {
    public: {
      apiBase: 'https://admin.project.neuraldynamics.online',
      frontendBase: 'https://project.neuraldynamics.online',
      google: {
        clientId: ''
      },
      sentry: {
        dsn: '',
        environment: '',
        release: ''
      }
    }
  },
  imports: {
    dirs: [
      'store'
    ]
  },
  devtools: { enabled: true },
  typescript: {
    strict: true
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },
  experimental: {
    typedPages: true
  },
  ssr: false,

  features: {
    // TODO: Remove this when https://github.com/nuxt/nuxt/issues/27130#issuecomment-2102505401 is fixed
    devLogs: false
  },
  sourcemap: {
    client: true
  }
})
