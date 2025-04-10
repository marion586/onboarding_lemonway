<template>
  <div v-if="!hydrated" class="fixed inset-0 flex items-center justify-center bg-white z-50">
    <img src="/image.png" alt="Loading..." width="200" />
  </div>
</template>

<script setup>
const hydrated = ref(false)

onMounted(() => {
  hydrated.value = true
})
</script>

<style scoped>
/* Optional: add some fade-out transition */
</style>
