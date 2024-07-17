import { createService } from '~/api'
import type { EndpointOptions } from '~/api'
import type { User } from '~/types/user'

type LoginRequest = {
  email: string
  password: string
}

type GoogleLoginRequest = {
  token: string
  redirect_uri: string
}

type SignupRequest = {
  email: string
  password: string
  confirm_password: string
}

type ChangePasswordRequest = {
  current_password: string
  new_password: string
  confirm_new_password: string
}

export type AuthTokenResponse = {
  access_token: string
  refresh_token: string
  token_type: 'bearer'
}
export type UpdateUserRequest = Partial<
  Pick<User, 'first_name' | 'last_name' | 'email'>
>

export const authService = createService(({ $api, $apiUnauthenticated }) => ({
  login: (options: EndpointOptions<LoginRequest>) => {
    const { body, ...rest } = options

    const formData = new FormData()
    formData.append('username', body.email)
    formData.append('password', body.password)

    return $apiUnauthenticated<AuthTokenResponse>('/api/frontend/user/token', {
      method: 'POST',
      body: formData,
      ...rest
    })
  },
  googleLogin: (options: EndpointOptions<GoogleLoginRequest>) => {
    return $apiUnauthenticated<AuthTokenResponse>('/api/frontend/user/google', {
      method: 'POST',
      ...options
    })
  },
  signup: (options: EndpointOptions<SignupRequest>) => {
    return $apiUnauthenticated<User>('/api/frontend/user/', {
      method: 'POST',
      ...options
    })
  },
  currentUser: (options?: EndpointOptions) => {
    return $api<User>('/api/frontend/user/', options)
  },
  changePassword: (options: EndpointOptions<ChangePasswordRequest>) => {
    return $api<string>('/api/frontend/user/change_password', {
      method: 'POST',
      ...options
    })
  },

  sendPasswordResetEmail: (options: EndpointOptions<{ email: string }>) => {
    return $apiUnauthenticated<string>('/api/frontend/user/confirm_reset_password', {
      method: 'POST',
      ...options
    })
  },
  sendAccountConfirmEmail: (options: EndpointOptions<{ email: string }>) => {
    return $apiUnauthenticated<string>('/api/frontend/user/confirm_email', {
      method: 'POST',
      ...options
    })
  },

  verifyEmail: (options: EndpointOptions) => {
    return $apiUnauthenticated<User>('/api/frontend/user/', {
      method: 'PATCH',
      ...options,
      body: {
        email_verified: true
      }
    })
  },

  updateUser: (options: EndpointOptions<UpdateUserRequest>) => {
    return $api<User>('/api/frontend/user/', {
      method: 'PATCH',
      ...options
    })
  },
  updateAvatar: (options: EndpointOptions<{ avatar: File }>) => {
    const { body, ...rest } = options

    const formData = new FormData()
    formData.append('avatar', body.avatar)

    return $api<User>('/api/frontend/user/avatar', {
      method: 'POST',
      body: formData,
      ...rest
    })
  },
  changeEmail: (options: EndpointOptions<{ email: string }>) => {
    const { body, ...rest } = options

    return $api<string>('/api/frontend/user/confirm_change_email', {
      method: 'POST',
      ...rest,
      query: {
        new_email: body.email
      }
    })
  },
  confirmNewEmail: (options: EndpointOptions<{ token: string }>) => {
    const { body, ...rest } = options

    return $apiUnauthenticated<string>('/api/frontend/user/change_email', {
      method: 'POST',
      ...rest,
      query: {
        token: body.token
      }
    })
  }
}))
