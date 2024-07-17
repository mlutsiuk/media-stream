export default defineNuxtPlugin({
  parallel: true,
  async setup() {
    const accessTokenCookie = useCookie('access-token')
    const refreshTokenCookie = useCookie('refresh-token')

    if (accessTokenCookie.value) {
      const authStore = useAuthStore()

      authStore.accessToken = accessTokenCookie.value

      if (refreshTokenCookie.value)
        authStore.refreshToken = refreshTokenCookie.value

      try {
        await useAuthStore().fetchUser()
      }
      catch (e) {
        if (isFetchError(e) && e.response?.status === 401)
          useAuthStore().logout()
      }
    }
    else {
      // Clear the refresh token cookie in case if it is present without an access token
      refreshTokenCookie.value = null
    }
  }
})
