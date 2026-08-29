<script setup>

import { saveAs } from 'file-saver'
import { generateDocx } from '../constants'
import { Packer } from 'docx'

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

const exportDocx = async () => {
  console.log('exportDocx')
  if (!process.client) return

  const doc = await generateDocx(basicFormValue.value, mainDataFormValue.value, provissioFormValue.value, totals.value)

  const blob = await Packer.toBlob(doc)

  saveAs(blob, 'test_imgs_no_table.docx')
}

</script>
<template>
  <UButton icon="i-heroicons-arrow-down-tray" @click="exportDocx">Exportar a DOCX</UButton>
</template>