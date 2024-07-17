<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})

useSeoMeta({
  title: 'Forgot password'
})

const route = useRoute('auth-reset-sent')

const email = computed(() => route.query.email as string)
</script>

<template>
  <div class="flex items-center justify-center mx-auto">
    <div class="mx-6 flex w-[450px] flex-col items-stretch gap-8 bg-zinc-50 p-6 shadow-layer">
    <h1 class="text-3xl font-medium">
      Confirm your email
    </h1>

    <AuthResetSentForm
      :email="email"
    />
  </div>
  </div>
</template>