<script setup>
import { formatJutjatHeader, parseDate, tipusPeritatge, tipusPeritatgeHeader, formatJutjatBody, today } from '../constants'

const props = defineProps({
  basicFormValue: {
    type: Object,
    required: true
  },
  mainDataFormValue: {
    type: Object,
    required: true
  },
  provissioFormValue: {
    type: Object,
    required: true
  }
})

const basicFormValue = ref(props.basicFormValue)
const mainDataFormValue = ref(props.mainDataFormValue)
const provissioFormValue = ref(props.provissioFormValue)
const emit = defineEmits(['enrere'])


const totals = computed(() => {
  const material = mainDataFormValue.value.material || 0
  const maObra = mainDataFormValue.value.maObra || 0

  return {
    mat: material.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),
    matIva: (material * 0.21).toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),
    matTotal: (material * 1.21).toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),

    mo: maObra.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),
    moIva: (maObra * 0.21).toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),
    moTotal: (maObra * 1.21).toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),

    total: (material * 1.21 + maObra * 1.21).toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
})

const getHonoraris = () => {
  console.log('tipologia', basicFormValue.value.tipologia)
  let honoraris = 40.00
  switch (basicFormValue.value.tipologia) {
    case 'immobles':
      honoraris = 70.00
      break
    case 'vehicles':
      honoraris = 80.00
      break
    default:
      break
  }
  return honoraris.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

console.log('basicFormValue', basicFormValue.value)

</script>
<template>
  <!-- <div class="flex items-center justify-between">
    <UButton @click="emit('enrere')" variant="ghost" icon="i-heroicons-arrow-left">Torna enrere</UButton>
  </div> -->
  <UCard class="py-4">
    <div class="flex flex-col max-w-[55vw]">
      <div id="header" class="flex flex-col  justify-center items-center mt-4">
        <h1 class="font-bold">INFORME PERICIAL EMÈS PEL PERIT TAXADOR JUDICIAL</h1>
        <h1 class="font-bold">{{ formatJutjatHeader(basicFormValue.jutjat, basicFormValue.numeroJutjat,
          basicFormValue.llocJutjat) }}</h1>
        <div class="flex display-flex gap-2">
          <h1 class="font-bold">{{ basicFormValue.tipus.toUpperCase() }}</h1>
          <h1 class="font-bold">Nº {{ basicFormValue.identificador }}</h1>
        </div>
        <h1 class="font-bold">PERP Nº {{ basicFormValue.perp }}</h1>
        <h1>Girona, {{ today }}</h1>
      </div>

      <div id="informacio-basica">
        <p class="mt-8 text-justify">Davant el/la jutge/essa, i del/la secretari/ària judicial, compareix
          <span class="font-bold italic">SERVEIS
            PERICIALS COMALADA, S.L.</span>,
          entitat col·laboradora amb l’Administració de Justícia de la Generalitat de Catalunya, representada
          en
          aquets acte per la Sra. Pilar Comalada Muñoz, Perit Taxador Judicial nº 676, major d’edat i
          d’identificació
          coneguda, especialista en bens mobles, immobles, vehicles, danys diversos, “Especialista
          Universitari en
          Perit Taxador Judicial” per la “Universitat Alcalá de Henares”, “Perit Judicial d’Investigació
          Mercantil”,
          “Agent Immobiliari i Gestor de la Propietat”; membre de “L’Associació de Perits Judicials de
          Catalunya
          APEJUC”, associat nº 2; <span class="italic">EXPERTS INDEPENDENTS EN QUANTIFICACIÓ DE VALORS DE BÉNS
            I
            DANYS, PER A
            CONCILIACIONS
            I MEDIACIONS, D'ACORD A LA LLEI ORGÀNICA 1/2025</span>, i advertida pel Sr. Jutge de l’obligació
          que ha
          de
          dir la
          veritat i de les penes de les quals el Codi Penal castiga el delicte de fals testimoni en una causa
          criminal, se li fan les preguntes pertinents i MANIFESTA: Que assabentat del càrrec per al qual se
          l’ha
          nomenat, l’accepta i jura o promet exercir-lo bé i d’una manera fidel conforme al seu saber. Tot
          seguit,
          emet l’informe que es transcriu a continuació:
        </p>

        <h1 class="mt-8 font-bold text-justify"> Data de la sol·licitud per realització del dictamen pericial:
          {{
            parseDate(basicFormValue.dataSolicitud) }}</h1>
        <h1 class="mt-8 font-bold text-justify">"...Us comuniquem que heu estat designat/ada com a perit per
          al
          procediment
          {{ basicFormValue.tipus === 'diligencies_previes' ? 'Prèvies' : 'Abreujat' }} {{
            basicFormValue.identificador
          }}
          del {{ formatJutjatBody(basicFormValue.jutjat, basicFormValue.numeroJutjat,
            basicFormValue.llocJutjat)
          }}..."
        </h1>
        <h1 class="mt-8 font-bold text-justify">"...La referència de la designació és {{ basicFormValue.perp
        }}..."
        </h1>
        <h1 class="mt-8 font-bold text-justify">“...La tipologia del peritatge correspon a: {{
          tipusPeritatge(basicFormValue.tipologia) }}...” </h1>
        <h1 class="mt-8 font-bold text-justify"> INDICAR QUE LA TIPOLOGIA D’AQUEST INFORME PERICIAL ES DE
          {{ tipusPeritatgeHeader(basicFormValue.tipologia) }} </h1>
      </div>

      <div v-if="basicFormValue.provissio" id="informacio-provissio">
        <h1 class="mt-8 font-bold"> {{ provissioFormValue.tipusProvissio !== 'Altres' ?
          provissioFormValue.tipusProvissio : provissioFormValue.altreTipus }} - {{
            parseDate(provissioFormValue.dataProvissio) }}</h1>
        <h1 class="mt-4 text-justify font-bold">“...{{ provissioFormValue.observacions }}...”</h1>
      </div>
      <PreviewDetallsPeritatge :basicFormValue="basicFormValue" :mainDataFormValue="mainDataFormValue"
        :totals="totals" />

      <p class="mt-8"> Per a constatació, estenc aquesta acta. El pèrit s’aferma en el seu contingut i el
        ratifica.
        Com a prova
        de conformitat, la signa juntament amb el/la Sr./a. Jutge/essa. En dono fe. </p>
      <p class="mt-8 font-bold"> **TOTAL HONORARIS PERIT {{ getHonoraris() }} €**</p>
      <p class="font-bold"> **HONORARIS FACTURATS A LA GENERALITAT 40,00 €**</p>
      <p class="font-bold"> **HONORARIS PENDENTS DE COBRAR A TAXACIÓ DE COSTES {{ getHonoraris() }} €** </p>
    </div>
  </UCard>
</template>