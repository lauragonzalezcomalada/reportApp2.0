<script setup>
import MatMo from './MatMo.vue';

const model = defineModel({
  required: true,
})
</script>
<template>
  <div class="flex flex-col gap-4">
    <UFormField label="Tipus vehicle">
      <UInput v-model="model.tipusVehicle" type="text" class="w-full" />
    </UFormField>
    <UFormField label="Marca">
      <UInput v-model="model.marcaVehicle" type="text" class="w-full" />
    </UFormField>
    <UFormField label="Model">
      <UInput v-model="model.modelVehicle" type="text" class="w-full" />
    </UFormField>
    <UFormField label="Matrícula">
      <UInput v-model="model.matriculaVehicle" type="text" class="w-full" />
    </UFormField>
    <UFormField label="Altres dades del vehicle">
      <UTextarea v-model="model.altresDadesVehicle" class="w-full" :rows="2" />
    </UFormField>
    <UFormField label="Observacions">
      <UTextarea v-model="model.observacions" class="w-full" :rows="5" />
    </UFormField>
    <USeparator />
    <MatMo v-model="model" />
  </div>
</template>