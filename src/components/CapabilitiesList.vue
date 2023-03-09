<script setup lang="ts">
import {useStore} from 'vuex'
import {computed, reactive} from 'vue'

interface ISelectedItems {
  items: string[]
}

const store = useStore()
const capabilities = computed(() => store.state.data.capabilities.items)
const selectedCapabilities = computed(() => store.state.app.selectedCapabilities)

const toggleItem = (capabilityId: string): void => {
  store.dispatch('app/toggleSelectedCapability', capabilityId)
  store.dispatch('app/setCurrentElement', null)

  if (selectedCapabilities.value.includes(capabilityId)) {
    const capabilityDomElement: HTMLElement | null = document.querySelector(`#capability-${capabilityId}`)
    if (capabilityDomElement) {
      capabilityDomElement.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
    }
  }
}

const clearAll = () => {
  store.dispatch('app/setCurrentElement', null)
  store.dispatch('app/clearSelectedCapabilities')
}

const isSelected = (capabilityId: string): boolean => {
  return selectedCapabilities.value.includes(capabilityId)
}
</script>
<template>
  <div
      v-if="capabilities && capabilities.length > 0"
      class="capabilities-list"
      :class="{ 'has-selected': selectedCapabilities.length > 0 }"
  >
    <a
        href="#"
        @click.prevent="clearAll"
        class="clear-all"
        v-if="selectedCapabilities.length > 0"
    >Clear All</a>
    <ul>
      <li
          v-for="capability in capabilities"
          :key="`capability-${capability.id}`"
          @click.prevent="toggleItem(capability.id)"
      >
        <div class="capability" :class="{ selected: isSelected(capability.id) }">
          <span class="color" :class="capability.color"/>
          <span class="name">{{ capability.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
