export default defineNuxtRouteMiddleware(async () => {
  if (!useAuthStore().user)
    return navigateTo({ name: 'auth-login' })
})