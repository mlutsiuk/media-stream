<script setup lang="ts">
import { z } from 'zod'
import { TForm } from '#components'
import { authService } from '~/api/auth'

const state = reactive({
  email: '',
  password: ''
})
const authStore = useAuthStore()
const isLoading = ref(false)
const form = ref<InstanceType<typeof TForm> | null>(null)
const { schema, onSubmit, setErrors } = useForm({
  form,
  schema: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Must be at least 8 characters')
  }),
  async onSubmit({ data }) {
    isLoading.value = true
    try {
      const credentials = await authService().login({
        body: data
      })
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
      if (!isFetchError(e))
        return
      const { statusCode, data } = e
      if (statusCode === 401) {
        if (data.detail === 'Account with this email address doesn\'t exist')
          setErrors([{ message: data.detail, path: 'email' }])
        else if (data.detail === 'Wrong password')
          setErrors([{ message: data.detail, path: 'password' }])
        else if (data.detail === 'You haven\'t verified your email')
          setErrors([{ message: data.detail, path: 'email' }])
      }
    }
    isLoading.value = false
  }
})
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <TForm
      ref="form"
      :state="state"
      :schema="schema"
      class="shadow-layer flex flex-col items-stretch gap-8 self-stretch bg-zinc-50 p-6"
      @submit="onSubmit"
    >
      <h1 class="text-3xl font-medium">
        Log in
      </h1>

      <div class="flex flex-grow flex-col gap-4">
        <UFormGroup
          name="email"
          label="Email"
        >
          <TInput
            v-model="state.email"
            placeholder="john.smith@mail.com"
          />
        </UFormGroup>

        <div class="flex flex-col gap-2">
          <UFormGroup
            name="password"
            label="Password"
          >
            <AuthInputPassword
              v-model="state.password"
            />
          </UFormGroup>

          <TLink
            class="self-start"
            :to="{
              name: 'auth-forgot-password',
            }"
          >
            Forgot password?
          </TLink>
        </div>
      </div>

      <TButton
        :loading="isLoading"
        type="submit"
        block
      >
        Login
      </TButton>

      <TDivider label="or" />

      <AuthGoogleButton />
    </TForm>
  </div>
</template>
