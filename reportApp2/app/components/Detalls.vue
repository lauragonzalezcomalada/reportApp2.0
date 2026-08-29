<script setup>
import { z } from 'zod'

const props = defineProps({
  tipologia: {
    type: String,
    required: true,
  },
})
const model = defineModel({
  required: true,
})

const mainDataFormSchema = z.object({
  // Dades generals
  tipusActa: z.string().min(1),
  tipusActaAltra: z.string().min(1).optional(),
  diligencies: z.string().min(1),
  dataDiligencies: z.string().min(1),
  observacions: z.string().optional(),
  // Dades immobles
  tipusImmoble: z.string().min(1),
  adressa: z.string().min(1),
  // Mat+Mo
  material: z.number().min(0),
  maObra: z.number().min(0),
  // Dades vehicles + Venal
  tipusVehicle: z.string().optional(),
  marcaVehicle: z.string().optional(),
  modelVehicle: z.string().optional(),
  matriculaVehicle: z.string().optional(),
  altresDadesVehicle: z.string().optional(),
  valorEstimatVehicle: z.number().min(0).optional(),
  // Dades objectes
  objectes: z.array().optional(),
  // Dades dispositius
  tipusDispositiu: z.string().optional(),
  marcaDispositiu: z.string().optional(),
  modelDispositiu: z.string().optional(),
  numeroSerieDispositiu: z.string().optional(),
  dataLlancamentDispositiu: z.string().optional(),
  preuLlancamentDispositiu: z.number().min(0).optional(),
  sistemaOperatiuDispositiu: z.string().optional(),
  dataCompraDispositiu: z.string().optional(),
})

const tipusActaOptions = ref([
  { label: 'Acta de comprovació de danys a immobles', value: 'danys_immobles' },
  { label: 'Acta de comprovació de danys a vehicles', value: 'danys_vehicles' },
  { label: 'Acta de comprovació ocular', value: 'comprovacio_ocular' },
  { label: 'Acta de Manifestació', value: 'manifestacio' },
  { label: 'Diligències', value: 'diligencies' },
  { label: 'Llista d’objectes sostrets/perduts ', value: 'llista_sostrets_perduts' },
  { label: 'Altres', value: 'altres' }
])

const filterTipuActaOptions = computed(() => {
  switch (props.tipologia) {
    case 'Immobles':
      return tipusActaOptions.value.filter(
        item => item !== 'Acta de comprovació de danys a vehicles'
      )
    case 'Vehícles':
      return tipusActaOptions.value.filter(
        item => item !== 'Acta de comprovació de danys a immobles'
      )
    default:
      return tipusActaOptions.value
  }
})

const addObject = (object) => {
  model.value.objectes.push(object)
}
</script>
<template>
  <UForm :state="model" :schema="mainDataFormSchema">
    <UCard class="w-96">
      <div class="flex flex-col gap-4">
        <div v-if="props.tipologia !== 'venal'" class="flex flex-col gap-4">
          <UFormField label="Tipus d'Acta">
            <USelect v-model="model.tipusActa" :items="filterTipuActaOptions" class="w-full"
              placeholder="Selecciona un tipus d'acta" />
          </UFormField>
          <UFormField v-if="model.tipusActa === 'altres'">
            <UInput v-model="model.tipusActaAltra" type="text" class="w-full" />
          </UFormField>
          <UFormField label="Diligències">
            <UInput v-model="model.diligencies" type="text" class="w-full" />
          </UFormField>
          <UFormField label="Data de les diligències">
            <UInput v-model="model.dataDiligencies" type="date" class="w-full" />
          </UFormField>
        </div>
        <Immobles v-if="props.tipologia === 'immobles'" v-model="model" />
        <Vehicles v-if="props.tipologia === 'vehicles'" v-model="model" />
        <Venal v-if="props.tipologia === 'venal'" v-model="model" />
        <Objectes v-if="props.tipologia === 'objectes'" @addObject="addObject" v-model="model" />
        <DispositiusItems v-if="props.tipologia === 'mobil' || props.tipologia === 'patinet'" v-model="model"
          :tipologia="props.tipologia" />
      </div>
    </UCard>
  </UForm>
</template>