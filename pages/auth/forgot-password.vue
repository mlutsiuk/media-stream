<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})

useSeoMeta({
  title: 'Forgot password'
})
</script>

<template>
  <div class="flex flex-grow items-center justify-center">
    <AuthForgotForm class="mx-6 w-[450px]" />
  </div>
</template>
