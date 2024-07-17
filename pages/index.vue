<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const makeError = () => {
  console.error('Chiki-briki')
}

const counterStore = useCounterStore()
</script>

<template>
  <div class="flex flex-col gap-3 rounded border-2 border-gray-200 px-4 py-8">
    <h2 class="font-mono text-4xl">
      Its index page
    </h2>

    <hr>
    <h3 class="font-mono text-3xl">
      Router
    </h3>
    <NuxtLink
      :to="{
        name: 'welcome',
      }" class="text-indigo-600 underline"
    >
      Welcome
    </NuxtLink>

    <hr>
    <h3 class="font-mono text-3xl">
      Pinia
    </h3>
    <button
      class="mt-2 select-none rounded bg-gray-400 px-4 py-2 text-xl text-white transition-all hover:bg-gray-500 hover:shadow active:bg-gray-600"
      @click="counterStore.increment"
    >
      Counter store - {{ counterStore.count }}
    </button>

    <hr>
    <h3 class="font-mono text-3xl">
      Sentry
    </h3>
    <button
      class="mt-2 select-none rounded bg-red-400 px-4 py-2 text-xl text-white transition-all hover:bg-gray-500 hover:shadow active:bg-gray-600"
      @click="makeError"
    >
      Throw error
    </button>

    <hr>
    <h3 class="font-mono text-3xl">
      Iconify
    </h3>
    <div class="gap- flex flex-row">
      <Icon name="logos:nuxt-icon" color="black" size="36px" />
      <Icon name="logos:pinia" color="black" size="36px" />
      <Icon name="logos:vueuse" color="black" size="36px" />
    </div>
  </div>
</template>
