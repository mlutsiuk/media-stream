<script setup lang="ts">
import { authService } from '~/api/auth'

const props = withDefaults(defineProps<{
  email: string
  sendOnMounted?: boolean
}>(), {
  sendOnMounted: false
})

const timeout = ref(60)

const { pause, resume } = useIntervalFn(() => {
  timeout.value -= 1

  if (timeout.value <= 0)
    pause()
}, 1000)

const resendEmail = async (ignoreTime: boolean = false) => {
  if (timeout.value > 0 && !ignoreTime)
    return

  try {
    await authService().sendPasswordResetEmail({
      body: {
        email: props.email
      }
    })

    useToast().add({
      title: 'Email sent',
      description: 'We have sent a confirmation letter to your email address'
    })
    timeout.value = 60
    resume()
  }
  catch (e) {
    handleErrorMessage(e, 'Failed to send email. Please try again.')
  }
}

onMounted(() => {
  if (props.sendOnMounted)
    resendEmail(true)
})
</script>

<template>
  <div class="flex flex-col items-stretch gap-8">
    <div class="flex flex-col gap-2">
      <p>
        We have sent a letter to this e-mail address:
      </p>

      <p class="text-tamer-blue-100 font-medium">
        {{ email }}
      </p>

      <p class="text-tamer-grey-80">
        Check your messages and follow the instructions.
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <UButton
        block
        :disabled="timeout > 0"
        @click="resendEmail"
      >
        {{ timeout > 0 ? `Send again ${timeout}s` : 'Send again' }}
      </UButton>

      <div class="text-xs text-zinc-400">
        If you have not received the email, be sure to check your Spam folder. If you still cannot find our email, please click the “Send again” button.
      </div>
    </div>
  </div>
</template>
