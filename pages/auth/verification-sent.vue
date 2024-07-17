<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})

useSeoMeta({
  title: 'Verify your email'
})

const route = useRoute('auth-verification-sent')

const email = computed(() => route.query.email as string)
</script>

<template>
  <div class="flex flex-grow items-center justify-center">
    <AuthVerificationSent
      :email="email"
      class="mx-6 w-[450px] bg-zinc-50"
    />
  </div>
</template>
