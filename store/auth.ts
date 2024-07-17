import { authService } from '~/api/auth'
import type { User } from '~/types/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)

  const saveTokens = (tokens: { accessToken: string, refreshToken?: string }) => {
    accessToken.value = tokens.accessToken
    useCookie('access-token').value = tokens.accessToken

    if (tokens.refreshToken) {
      refreshToken.value = tokens.refreshToken
      useCookie('refresh-token').value = tokens.refreshToken
    }
  }

  const logout = () => {
    user.value = null
    accessToken.value = null

    useCookie('access-token').value = null
    useCookie('refresh-token').value = null
  }

  const fetchUser = async () => {
    user.value = await authService().currentUser()
  }

  return {
    user,
    accessToken,
    refreshToken,
    saveTokens,
    fetchUser,
    logout
  }
})
