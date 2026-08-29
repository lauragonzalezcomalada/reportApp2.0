<script setup>
const props = defineProps({
  tipologia: {
    type: String,
    required: true,
  },
})

const model = defineModel({
  required: true,
})

const dispositiusOptions = ref([
  { label: 'Telèfon Mòbil', value: 'telefon_mobil' },
  { label: 'Ordinador', value: 'ordinador' },
  { label: 'Rellotge Intel·ligent', value: 'rellotge_inteligent' },
  { label: 'Tauleta', value: 'tauleta' },
  { label: 'Patinet Elèctric', value: 'patinet_electric' },
])

model.value.tipusDispositiu = props.tipologia === 'mobil' ? 'telefon_mobil' : 'patinet_electric'
</script>
<template>
  <div class="flex flex-col gap-4">
    <UFormField label="Observacions">
      <UTextarea v-model="model.observacions" class="w-full" :rows="5" />
    </UFormField>
    <USeparator />
    <UFormField label="Tipus dispositiu">
      <USelect v-model="model.tipusDispositiu" :items="dispositiusOptions" class="w-full"
        placeholder="Selecciona un tipus de dispositiu" />
    </UFormField>
    <UFormField label="Marca Dispositiu">
      <UInput v-model="model.marcaDispositiu" type="text" class="w-full" />
    </UFormField>
    <UFormField label="Model Dispositiu">
      <UInput v-model="model.modelDispositiu" type="text" class="w-full" />
    </UFormField>
    <UFormField label="Número de Sèrie">
      <UInput v-model="model.numeroSerieDispositiu" type="text" class="w-full" />
    </UFormField>
    <UFormField label="Data de llançament">
      <UInput v-model="model.dataLlancamentDispositiu" type="date" class="w-full" />
    </UFormField>
    <UFormField label="Preu de llançament">
      <UInput v-model="model.preuLlancamentDispositiu" type="number" class="w-full" />
    </UFormField>
    <UFormField label="Sistema Operatiu">
      <UInput v-model="model.sistemaOperatiuDispositiu" type="text" class="w-full" />
    </UFormField>
  </div>
</template>