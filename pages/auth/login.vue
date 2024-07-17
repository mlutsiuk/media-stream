<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})
useSeoMeta({
  title: 'Log in'
})
</script>

<template>
  <div class="mx-auto flex min-h-full flex-col gap-4 p-4">
    <div class="flex grow flex-col items-center justify-center">
      <AuthLoginForm class="mx-6 w-[450px]" />
    </div>

    <div class="flex flex-row items-center justify-center gap-2">
      <div>
        Don’t have an account?
      </div>

      <TLink
        :to="{
          name: 'auth-signup',
        }"
        variant="link"
      >
        Sign up
      </TLink>
    </div>
  </div>
</template>
