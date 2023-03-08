<script setup lang="ts">
import {useStore} from 'vuex'
import {computed} from 'vue'
import ElementItem from '@/components/ElementItem.vue'
import CapabilitiesList from '@/components/CapabilitiesList.vue'
import {Capability} from '@/lib/capability'

const store = useStore()
const capabilities = computed(() => store.state.data.capabilities.items)
const selectedCapabilities = computed(() => store.state.app.selectedCapabilities)

const maxItemsPerColumn: number = 9
const getColumnsClass = (capability: Capability): string => {
  const total: number = capability.elements ? capability.elements.length : 1
  return `column-${Math.max(0, Math.floor(total / maxItemsPerColumn))}`
}

const isSelected = (capabilityId: string): boolean => {
  return selectedCapabilities.value.includes(capabilityId)
}
</script>
<template>
  <div class="elements-view">
    <capabilities-list />
    <div
        v-if="capabilities && capabilities.length"
        class="elements-list"
        :class="{ 'has-selected': selectedCapabilities.length > 0 }"
    >
      <div
          class="capability"
          v-for="(capability, i) in capabilities"
          :key="`capability-item-${i}-${capability.id}`"
          :class="[getColumnsClass(capability), { selected: isSelected(capability.id) }]"
      >
        <element-item
            v-for="(element, j) in capability.elements"
            :key="`element-${i}-${j}`"
            :element="element"
        />
      </div>
    </div>
  </div>
</template>
