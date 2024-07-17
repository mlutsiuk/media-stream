<script setup lang="ts">
import { z } from 'zod'
import { TForm } from '#components'
import { authService } from '~/api/auth'

const state = reactive({
  email: '',
  password: '',
  passwordRepeat: ''
})
const isLoading = ref(false)
const form = ref<InstanceType<typeof TForm> | null>(null)
const { schema, onSubmit, setErrors } = useForm({
  form,
  schema: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Must be at least 8 characters'),
    passwordRepeat: z.string().min(8, 'Must be at least 8 characters')
  }).refine(data => data.passwordRepeat === data.password, {
    message: 'Password\'s don\'t match',
    path: ['passwordRepeat']
  }),
  async onSubmit({ data }) {
    isLoading.value = true
    try {
      const user = await authService().signup({
        body: {
          email: data.email,
          password: data.password,
          confirm_password: data.passwordRepeat
        }
      })
      useRouter().push({
        name: 'auth-verification-sent',
        query: {
          email: user.email
        }
      })
    }
    catch (e) {
      if (!isFetchError(e))
        return
      const { statusCode, response } = e
      if (statusCode === 401) {
        if (response?._data.detail === 'Account with this email address doesn\'t exist')
          setErrors([{ message: response?._data.detail, path: 'email' }])
        else if (response?._data.detail === 'Wrong password')
          setErrors([{ message: response?._data.detail, path: 'password' }])
        else if (response?._data.detail === 'You haven\'t verified your email')
          setErrors([{ message: response?._data.detail, path: 'email' }])
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
        Sign Up
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

        <UFormGroup
          name="password"
          label="Password"
        >
          <AuthInputPassword
            v-model="state.password"
          />
        </UFormGroup>

        <UFormGroup
          name="passwordRepeat"
          label="Repeat password"
        >
          <AuthInputPassword
            v-model="state.passwordRepeat"
          />
        </UFormGroup>
      </div>

      <TButton
        :loading="isLoading"
        type="submit"
        block
      >
        Sign Up
      </TButton>

      <TDivider label="or" />

      <AuthGoogleButton />
    </TForm>
  </div>
</template>
