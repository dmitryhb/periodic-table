<script setup lang="ts">
import ElementItem from '@/components/ElementItem.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Capability } from '@/lib/capability.js'
import {Element, IElement} from '@/lib/element'

const props = defineProps({
  capability: String
})
const emit = defineEmits(['clicked'])
const store = useStore()

const getCapabilityInstance = (): Capability | null => {
  const capabilityInstance: Capability | null = store.state.data.capabilities.items.find((capability: Capability) => capability.id === props.capability)
  return capabilityInstance
}

const elements = computed((): IElement[] => {
  if (!props.capability) {
    return []
  }

  const capabilityInstance: Capability | null = getCapabilityInstance()
  return capabilityInstance ? capabilityInstance.elements as IElement[] : []
})

const isSelected = () => {
  return store.state.app.selectedCapabilities.includes(props.capability)
}

const onElementClicked = (element: Element): void => {
  emit('clicked', element)
}

</script>
<template>
  <element-item
      v-for="element in elements"
      :element="element"
      :id="element.id"
      :class="{ 'has-selected': isSelected() }"
      @clicked="onElementClicked(element)"
  />
</template>
