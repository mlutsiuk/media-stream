<script setup lang="ts">
import { authService } from '~/api/auth'

const params = useRoute('auth-verify-email').query

onMounted(async () => {
  if (!params.token) {
    useToast().add({
      title: 'Wrong confirmation link, please try again.'
    })
    return navigateTo({ name: 'auth-login' })
  }

  try {
    await authService().verifyEmail({
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })

    useAuthStore().saveTokens({
      accessToken: params.token as string
    })
    await useAuthStore().fetchUser()

    useRouter().push({ name: 'index' })
  }
  catch (e) {
    useRouter().push({ name: 'auth-login' })

    handleErrorMessage(e, 'Failed to confirm email. Please try again.')
  }
})
</script>

<template>
  <div class="flex h-full items-center justify-center">
    <TLoader
      class="size-10"
    />
  </div>
</template>
