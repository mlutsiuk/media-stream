<script setup lang="ts">
withDefaults(defineProps<{
  placeholder?: string
  icon?: string
  trailing?: boolean
  disabled?: boolean
  type?: 'text' | 'password' | 'number'
  ui?: any
}>(), {
  trailing: false,
  disabled: false,
  type: 'text'
})
const emit = defineEmits<{
  change: []
}>()
const model = defineModel<string | number>({
  default: '',
  set: (value) => {
    emit('change')
    return value
  }
})
</script>

<template>
  <UInput
    v-model="model"
    :placeholder="placeholder"
    :icon="icon"
    :trailing="trailing"
    :disabled="disabled"
    :type="type"
    :ui="ui"
    size="md"
    autocomplete="off"
    color="blue"
    variant="outline"
  >
    <template
      v-if="$slots.trailing"
      #trailing
    >
      <slot name="trailing" />
    </template>
  </UInput>
</template>
