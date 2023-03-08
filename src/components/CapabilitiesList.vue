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
    <ul>
      <li
          v-for="capability in capabilities"
          :key="`capability-${capability.id}`"
          @click.prevent="toggleItem(capability.id)"
      >
        <div
            class="capability"
            :class="{ selected: isSelected(capability.id) }"
        >
          <span class="color" :class="capability.color" />
          <span class="name">{{ capability.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
