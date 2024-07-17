<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router'

withDefaults(defineProps<{
  to?: RouteLocationRaw
  size?: 'base' | 'xs'
}>(), {
  size: 'base'
})
const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="text-medium cursor-pointer text-red-400 hover:underline"
    :class="{
      'text-xs': size === 'xs',
      'text-base': size === 'base',
    }"
    @click="emit('click')"
  >
    <slot />
  </NuxtLink>
</template>
