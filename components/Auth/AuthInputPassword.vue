<script setup lang="ts">
const model = defineModel<string>({ required: true })
const isPasswordVisible = ref(false)
</script>

<template>
  <TInput
    v-model="model"
    :type="isPasswordVisible ? 'text' : 'password'"
    :ui="{ icon: { trailing: { pointer: '' } } }"
  >
    <template #trailing>
      <UIcon
        :name="isPasswordVisible ? 'i-tabler-eye' : 'i-tabler-eye-off'"
        class="size-6 cursor-pointer select-none"
        @click="isPasswordVisible = !isPasswordVisible"
      />
    </template>
  </TInput>
</template>
