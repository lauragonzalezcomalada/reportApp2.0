<script setup>

const props = defineProps({
  objectes: {
    type: Array,
    required: true,
  },
})


const objecte = ref('')
const preu = ref(0)
const preuInput = ref(null)

const objecteError = ref('')
const preuError = ref('')
const emit = defineEmits(['addObject'])
const addObject = () => {
  objecteError.value = ''
  preuError.value = ''
  if (objecte.value.trim() === '') {
    objecteError.value = 'Falten dades'
    return
  } else if (preu.value === 0) {
    preuError.value = 'Incorrecte'
    return
  }
  emit('addObject', {
    name: objecte.value,
    preu: preu.value,
    id: crypto.randomUUID()
  })
  objecte.value = ''
  preu.value = 0
}

const removeObject = (id) => {
  emit('removeObject', id)
}
</script>
<template>
  <div class="flex flex-col gap-4">

    <div class="flex justify-between gap-2">
      <UFormField label="Objecte" class="w-[70%]" @keydown.tab.prevent="preuInput?.inputRef?.focus()"
        :error="!!objecteError">
        <UInput v-model="objecte" type="text" class="w-full" />
      </UFormField>
      <UFormField label="Preu" class="w-[30%]" @keydown.enter.prevent="addObject" :error="!!preuError">
        <UInput ref="preuInput" v-model="preu" type="number" class="w-full" />
      </UFormField>
    </div>

    <UButton @click="addObject" icon="i-heroicons-plus">Afegir
      objecte
    </UButton>
    <div v-for="objecte in objectes">
      <div class="flex gap-2">
        <div class="flex w-full justify-between items-center gap-2 bg-gray-300 p-2 rounded-lg">
          <p class="w-[70%] font-semibold">{{ objecte.name }}</p>
          <p class="w-[20%] text-right">{{ objecte.preu }} €</p>
        </div>
        <UButton icon="i-heroicons-trash" variant="link" size="sm" color="error" class="hover:cursor-pointer"
          @click="removeObject(objecte.id)" />
      </div>
    </div>
  </div>
</template>