<script setup>
import { z } from 'zod'

const model = defineModel({
  required: true,
})

const basicFormSchema = z.object({
  jutjat: z.string().min(1).default('JUTJAT D\'INSTRUCCIÓ Nº X GIRONA'),
  tipus: z.string().min(1),
  identificador: z.string().min(1),
  perp: z.string().min(1),
  dataSolicitud: z.string().min(1),
  tipologia: z.string().min(1),
  provissio: z.boolean().default(false),
})


const tipusOptions = ref([{ label: 'Diligències Prèvies', value: 'diligencies_previes' }, { label: 'Procediment Abreujat', value: 'procediment_abreujat' }])
const tipologiaOptions = ref([{ label: 'Immobles', value: 'immobles' }, { label: 'Vehícles', value: 'vehicles' }, { label: 'Objectes', value: 'objectes' }, { label: 'Venal', value: 'venal' }, { label: 'Mòbil', value: 'mobil' }, { label: 'Patinet', value: 'patinet' }])



</script>

<template>
  <UForm :state="model" :schema="basicFormSchema">
    <UCard key="basicForm" class="w-96">
      <div class="flex flex-col gap-4">
        <div class="flex gap-2">
          <UFormField label="Jutjat">
            <UInput v-model="model.jutjat" class="w-full" />
          </UFormField>
          <UFormField label="Nº" class="w-10">
            <UInput v-model="model.numeroJutjat" class="w-full" />
          </UFormField>
          <UFormField label="Lloc" class="w-32">
            <UInput v-model="model.llocJutjat" class="w-full" />
          </UFormField>
        </div>
        <div class="flex gap-2">
          <UFormField label="Tipus">
            <USelect v-model="model.tipus" :items="tipusOptions" class="w-full" placeholder="Selecciona un tipus" />
          </UFormField>
          <UFormField label="Número">
            <UInput v-model="model.identificador" type="text" class="w-full" />
          </UFormField>
        </div>
        <UFormField label="PERP"> <!-- v-if formValue.tipus === 'Procediment Abreujat' -->
          <UInput v-model="model.perp" type="text" class="w-full" />
        </UFormField>
        <UFormField label="Data de Solicitud">
          <UInput v-model="model.dataSolicitud" type="date" class="w-full" />
        </UFormField>
        <UFormField label="Tipologia">
          <USelect v-model="model.tipologia" :items="tipologiaOptions" class="w-full"
            placeholder="Selecciona una tipologia" />
        </UFormField>
        <UFormField label="Hi ha provissió?">
          <UCheckbox v-model="model.provissio" />
        </UFormField>
      </div>
    </UCard>
  </UForm>
</template>