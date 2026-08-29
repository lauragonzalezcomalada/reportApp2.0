<script setup>
import { TIPOLOGIA_OPTIONS, IMMOBLES_DADES, VEHICLES_DADES, OBJECTES_DADES, VENAL_DADES, MOBIL_DADES, PATINET_DADES } from '../constants'

definePageMeta({
  title: 'Nou informe de penal'
})

const previsualitzacio = ref(false)

const basicFormValue = ref({
  jutjat: 'Jutjat d\'Instrucció',
  numeroJutjat: 'X',
  llocJutjat: 'Girona',
  tipus: '',
  identificador: '',
  perp: '',
  dataSolicitud: '',
  tipologia: '',
  provissio: false,
})

const provissioFormValue = ref({
  tipusProvissio: '',
  altreTipus: '',
  dataProvissio: '',
  observacions: '',
})

const mainDataFormValue = ref({
  // Dades generals
  tipusActa: '',
  tipusActaAltra: '',
  diligencies: '',
  dataDiligencies: '',
  observacions: '',
  // Dades immobles
  tipusImmoble: '',
  adressa: '',
  // Mat+Mo
  material: '',
  maObra: '',
  // Dades vehicles + Venal
  tipusVehicle: '',
  marcaVehicle: '',
  modelVehicle: '',
  matriculaVehicle: '',
  altresDadesVehicle: '',
  valorEstimatVehicle: '',
  // Dades dispositius
  tipusDispositiu: '',
  marcaDispositiu: '',
  modelDispositiu: '',
  numeroSerieDispositiu: '',
  dataLlancamentDispositiu: '',
  preuLlancamentDispositiu: '',
  // Altres tipologies
  altresTipologies: [],
  //Objectes  
  objectes: [],
})

const tipologiaOptions = ref(TIPOLOGIA_OPTIONS)
const novaTipologia = ref('')
const novaTipologiaOpen = ref(false)

const afegirTipologia = () => {
  switch (novaTipologia.value) {
    case 'immobles':
      mainDataFormValue.value.altresTipologies.push({
        tipus: 'immobles', dades: IMMOBLES_DADES
      })
      break
    case 'vehicles':
      mainDataFormValue.value.altresTipologies.push({
        tipus: 'vehicles', dades: VEHICLES_DADES
      })
      break
    case 'objectes':
      mainDataFormValue.value.altresTipologies.push({
        tipus: 'objectes', dades: OBJECTES_DADES
      })
      break
    case 'venal':
      mainDataFormValue.value.altresTipologies.push({
        tipus: 'venal', dades: VENAL_DADES
      })
      break
    case 'mobil':
      mainDataFormValue.value.altresTipologies.push({
        tipus: 'mobil', dades: MOBIL_DADES
      })
      break
    case 'patinet':
      mainDataFormValue.value.altresTipologies.push({
        tipus: 'patinet', dades: PATINET_DADES
      })
      break
  }

  novaTipologiaOpen.value = false
  novaTipologia.value = ''

}
</script>
<template>
  <div class="flex gap-4 justify-center">
    <div class="flex flex-col gap-4 justify-center">
      <DadesPrincipals v-model="basicFormValue" />
      <DadesProvissio v-if="basicFormValue.provissio" v-model="provissioFormValue" />
      <Detalls v-if="basicFormValue.tipologia !== ''" v-model="mainDataFormValue"
        :tipologia="basicFormValue.tipologia" />
      <div v-for="tipologia in mainDataFormValue.altresTipologies" :key="tipologia.tipus">
        <Detalls v-model="tipologia.dades" :tipologia="tipologia.tipus" />
      </div>
      <UModal v-if="basicFormValue.tipologia !== ''" title="Afegeix una nova tipologia"
        v-model:open="novaTipologiaOpen">
        <UButton class="mt-4 mx-auto align-left" variant="outline" icon="i-heroicons-plus">
          Afegeix tipologia </UButton>
        <template #body>

          <div class="flex flex-col gap-4 items-center">
            <UFormField label="Tipologia">
              <USelect v-model="novaTipologia" :items="tipologiaOptions" class="w-96"
                placeholder="Selecciona una tipologia" />
            </UFormField>
            <UButton @click="afegirTipologia" class="w-fit">Afegeix</UButton>
          </div>

        </template>
      </UModal>
      <UButton class="mt-4 mx-auto align-left" @click="previsualitzacio = true"
        :disabled="basicFormValue.tipologia === ''">
        Previsualitza</UButton>


    </div>
    <div v-if="previsualitzacio" class="flex flex-col items-start gap-4">
      <Preview :basicFormValue="basicFormValue" :mainDataFormValue="mainDataFormValue"
        :provissioFormValue="provissioFormValue" @enrere="previsualitzacio = false" />
      <DOCXExporter :basicFormValue="basicFormValue" :mainDataFormValue="mainDataFormValue"
        :provissioFormValue="provissioFormValue" />
    </div>
  </div>
</template>