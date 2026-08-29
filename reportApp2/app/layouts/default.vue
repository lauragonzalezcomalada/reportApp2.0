<script setup>
const route = useRoute()

const pageTitle = computed(() => {
  return route.meta.title || ''
})
</script>
<template>
  <div class="min-h-screen flex flex-col items-center">
    <main class="grow">
      <UContainer class="py-10">
        <h1 v-if="pageTitle" class="text-center text-xl font-medium mb-5">
          {{ pageTitle }}
        </h1>
        <slot></slot>
      </UContainer>
    </main>
  </div>
</template>
