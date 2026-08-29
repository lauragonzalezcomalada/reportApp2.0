<script setup>
import MatMo from './MatMo.vue';

const model = defineModel({
  required: true,
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <UFormField label="Tipus immoble">
      <UInput v-model="model.tipusImmoble" type="text" class="w-full" />
    </UFormField>
    <UFormField label="Adressa">
      <UInput v-model="model.adressa" type="text" class="w-full" />
    </UFormField>
    <UFormField label="Observacions">
      <UTextarea v-model="model.observacions" class="w-full" :rows="5" />
    </UFormField>
    <USeparator />
    <MatMo v-model="model" />
  </div>
</template>