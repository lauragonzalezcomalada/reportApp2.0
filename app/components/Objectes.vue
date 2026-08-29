<script setup>
const model = defineModel({
  required: true,
})

const objectes = ref([])
const emit = defineEmits(['addObject'])
const addObject = (object) => {
  objectes.value.push(object)
  emit('addObject', object)
}

const removeObject = (id) => {
  objectes.value = objectes.value.filter((objecte) => objecte.id !== id)
}


</script>
<template>
  <UFormField label="Observacions">
    <UTextarea v-model="model.observacions" class="w-full" :rows="5" />
  </UFormField>
  <USeparator />
  <ObjectesItems :objectes="objectes" @addObject="addObject" @removeObject="removeObject" />
</template>