<script setup lang="ts">
import { authService } from '~/api/auth'

definePageMeta({
  middleware: 'guest'
})
const params = useRoute('auth-google-callback').query
if (params.code) {
  try {
    const credentials = await authService().googleLogin({
      body: {
        token: params.code as string,
        redirect_uri: `${window.location.origin}/auth/google/callback`
      }
    })
    const authStore = useAuthStore()
    authStore.saveTokens({
      accessToken: credentials.access_token,
      refreshToken: credentials.refresh_token
    })
    await authStore.fetchUser()
    useRouter().push({
      name: 'index'
    })
  }
  catch (e) {
    handleErrorMessage(e, 'Failed to log in with Google. Please try again.')
    useRouter().push({ name: 'auth-login' })
  }
}
</script>

<template>
  <div class="flex h-full items-center justify-center">
    <DLoader
      class="size-10"
    />
  </div>
</template>
