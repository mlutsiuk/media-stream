<script setup lang="ts">
import type { ButtonVariant } from '#ui/types'
import type { RouteLocationRaw } from '#vue-router'

type TButtonVariant = 'primary' | 'secondary' | 'link'

withDefaults(defineProps<{
  variant?: TButtonVariant
  disabled?: boolean
  loading?: boolean
  icon?: string
  trailing?: boolean
  iconOnly?: boolean
  block?: boolean
  to?: RouteLocationRaw
  type?: 'button' | 'submit'
}>(), {
  variant: 'primary',
  disabled: false,
  loading: false,
  trailing: false,
  iconOnly: false,
  block: false
})
const emit = defineEmits<{
  click: []
}>()
type VariantsMap = Record<TButtonVariant, { color: string, variant: ButtonVariant }>
const variantsMap: VariantsMap = {
  primary: { color: 'primary', variant: 'solid' },
  secondary: { color: 'red', variant: 'outline' },
  link: { color: 'primary', variant: 'link' }
}
</script>

<template>
  <UButton
    :color="variantsMap[variant].color"
    :variant="variantsMap[variant].variant"
    :disabled="disabled"
    :icon="icon"
    :trailing="trailing"
    :square="iconOnly"
    :to="to"
    size="md"
    class="relative"
    :class="{
      'pointer-events-none': loading,
    }"
    :block="block"
    :type="type"
    @click="emit('click')"
  >
    <UIcon
      v-if="loading"
      class="absolute left-1/2 top-1/2 size-5 shrink-0 -translate-x-1/2 -translate-y-1/2 transform"
      name="i-svg-spinners-ring-resize"
    />

    <div
      v-if="$slots.default && !iconOnly"
      class="text-nowrap"
      :class="{
        'opacity-0': loading,
      }"
    >
      <slot />
    </div>

    <template #leading>
      <UIcon
        v-if="icon && !trailing"
        :name="icon"
        class="shrink-0"
        :class="{
          'opacity-0': loading,
          'size-6': iconOnly,
          'size-5': !iconOnly,
        }"
      />
    </template>
    <template #trailing>
      <UIcon
        v-if="icon && trailing"
        :name="icon"
        class="shrink-0"
        :class="{
          'opacity-0': loading,
          'size-6': iconOnly,
          'size-5': !iconOnly,
        }"
      />
    </template>
  </UButton>
</template>
