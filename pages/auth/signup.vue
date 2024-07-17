<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})

useSeoMeta({
  title: 'Sign Up'
})
</script>

<template>
  <div class="mx-auto flex min-h-full flex-col gap-6 p-4">
    <div class="flex grow flex-col items-center justify-center">
      <AuthSignupForm class="mx-6 w-[450px]" />
    </div>
    <div class="flex flex-row items-center justify-center gap-2">
      <div>
        Already have an account?
      </div>

      <TLink
        :to="{
          name: 'auth-login',
        }"
        variant="link"
      >
        Log In
      </TLink>
    </div>
  </div>
</template>
