<script setup lang="ts">
import { z } from 'zod'
import type { FetchError } from 'ofetch'
import type { TForm } from '#components'
import { authService } from '~/api/auth'

const state = reactive({
  email: ''
})

const isLoading = ref(false)
const form = ref<InstanceType<typeof TForm> | null>(null)
const { schema, onSubmit, setErrors } = useForm({
  form,
  schema: z.object({
    email: z.string().email('Invalid email format')
  }),
  async onSubmit({ data }) {
    isLoading.value = true

    try {
      await authService().sendPasswordResetEmail({
        body: {
          email: data.email
        }
      })

      useRouter().push({
        name: 'auth-reset-sent',
        query: {
          email: data.email
        }
      })
    }
    catch (e) {
      const { data, statusCode } = e as FetchError

      if (statusCode === 400 && data.detail === 'Account with this email address doesn\'t exist')
        setErrors([{ message: data.detail, path: 'email' }])
    }

    isLoading.value = false
  }
})
</script>

<template>
  <TForm
    ref="form"
    :schema="schema"
    :state="state"
    class="flex flex-col items-stretch gap-8 bg-zinc-50 p-6 shadow-layer"
    @submit="onSubmit"
  >
    <h1 class="text-3xl font-medium">
      Reset password
    </h1>

    <div class="flex flex-col gap-2">
      <p class="text-base">
        Please enter your E-mail and we will send you further instructions for resetting your password
      </p>

      <UFormGroup label="Email" name="email">
        <TInput v-model="state.email" />
      </UFormGroup>
    </div>

    <div class="flex flex-col gap-2">
      <TButton
        type="submit"
        block
      >
        Send instructions
      </TButton>

      <TButton
        :to="{
          name: 'auth-login',
        }"
        variant="secondary"
        block
      >
        Back to log in
      </TButton>
    </div>
  </TForm>
</template>