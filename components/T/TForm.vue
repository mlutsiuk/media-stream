<script setup lang="ts">
import { UForm } from '#components'
import type { FormError, FormSubmitEvent } from '#ui/types'

defineProps<{
  state: Record<string, any>
  schema: any
}>()
const emit = defineEmits<{
  submit: [e: FormSubmitEvent<any>]
}>()
const form = ref<InstanceType<typeof UForm> | null>(null)
const clear = () => {
  // @ts-expect-error - Types of exposed methods are not inferred correctly
  form.value?.clear()
}
const submit = () => {
  // @ts-expect-error - Types of exposed methods are not inferred correctly
  form.value?.submit()
}
const setErrors = (errors: FormError[], path?: string) => {
  // @ts-expect-error - Types of exposed methods are not inferred correctly
  form.value?.setErrors(errors, path)
}
const getErrors = (path?: string) => {
  // @ts-expect-error - Types of exposed methods are not inferred correctly
  return form.value?.getErrors(path)
}
defineExpose({
  clear,
  submit,
  setErrors,
  getErrors
})
</script>

<template>
  <UForm
    ref="form"
    :state="state"
    :schema="schema"
    :validate-on="['submit']"
    @submit="emit('submit', $event)"
  >
    <slot />
  </UForm>
</template>