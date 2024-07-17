export default defineNuxtPlugin(() => {
  const { $colorMode } = useNuxtApp()
  $colorMode.preference = 'light'
})
