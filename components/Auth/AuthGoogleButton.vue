<script setup lang="ts">
withDefaults(defineProps<{
  loading?: boolean
}>(), {
  loading: false
})
const googleLoginUrl = computed(() => getAuthUrl())
</script>

<template>
  <TButton
    icon="i-simple-icons-google"
    :to="googleLoginUrl"
    variant="secondary"
    block
  >
    Login with Google
  </TButton>
</template>
