import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const { public: { sentry, frontendBase } } = useRuntimeConfig()
  const router = useRouter()

  if (!sentry.dsn)
    return

  Sentry.init({
    release: sentry.release,

    app: nuxtApp.vueApp,
    dsn: sentry.dsn,
    environment: sentry.environment,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration(),
      Sentry.captureConsoleIntegration({ levels: ['error'] }),
      Sentry.httpClientIntegration()
    ],

    // Configure this whole part as you need it!

    tracesSampleRate: 0.2, // Change in prod

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', frontendBase],

    replaysSessionSampleRate: 1.0, // Change in prod
    replaysOnErrorSampleRate: 1.0 // Change in prod if necessary
  })
})
