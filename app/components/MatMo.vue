<script setup>
const model = defineModel({
  required: true,
})
</script>
<template>
  <div class="flex flex-col gap-4">
    <UFormField label="Material">
      <UInput v-model="model.material" type="number" class="w-full" />
    </UFormField>
    <UFormField label="Mà d'obra">
      <UInput v-model="model.maObra" type="number" class="w-full" />
    </UFormField>
  </div>
</template>