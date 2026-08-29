<script setup>
import { z } from 'zod'

const model = defineModel({
  required: true,
})

const provissioFormSchema = z.object({
  tipusProvissio: z.string().min(1),
  altreTipus: z.string().min(1).optional(),
  dataProvissio: z.string().min(1),
  observacions: z.string().min(1),
})

const tipusProvissioOptions = ref([
  'Fiscal',
  'Jutge/essa',
  'Altres',
])

</script>
<template>
  <UForm :state="model" :schema="provissioFormSchema">
    <UCard key="provissioForm" class="w-96">
      <div class="flex flex-col gap-4">
        <UFormField label="Tipus de provissio">
          <USelect v-model="model.tipusProvissio" :items="tipusProvissioOptions" class="w-full"
            placeholder="Selecciona un tipus de provissio" />
        </UFormField>
        <UFormField v-if="model.tipusProvissio === 'Altres'">
          <UInput v-model="model.altreTipus" type="text" class="w-full" />
        </UFormField>
        <UFormField label="Data de provissio">
          <UInput v-model="model.dataProvissio" type="date" class="w-full" />
        </UFormField>
        <UFormField label="Observacions">
          <UTextarea v-model="model.observacions" class="w-full" :rows="5" />
        </UFormField>
      </div>
    </UCard>
  </UForm>
</template>