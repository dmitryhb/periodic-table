<script setup lang="ts">
import ElementItem from '@/components/ElementItem.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Capability } from '@/lib/capability.js'
import {IElement} from '@/lib/element'
import get from 'lodash/get'
import {IElementPlatforms, PlatformOptions} from '@/lib/platform'

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

const isSelected = computed(() => {
  return store.state.app.selectedCapabilities.includes(props.capability)
})

const isCurrent = (element: IElement) => {
  return store.state.app.currentElement && store.state.app.currentElement.id === element.id
}

const onElementClicked = (element: IElement): void => {
  emit('clicked', element)
}

const getPlatformCssClass = (element: IElement): string => {
  if (!store.state.app.currentPlatform || !(store.state.app.currentPlatform.code in element.platforms)) {
    return ''
  }

  const platformOption: PlatformOptions = get<IElementPlatforms, string>(element.platforms, store.state.app.currentPlatform.code) as PlatformOptions
  switch (platformOption) {
    case PlatformOptions.NotSupported:
      return 'platform not-supported'
    case PlatformOptions.Partially:
      return 'platform partially'
    case PlatformOptions.Supported:
      return 'platform supported'
  }

  return ''
}
</script>
<template>
  <element-item
      v-for="element in elements"
      :element="element as Element"
      :id="element.id"
      :class="[`capability-${(element.capability as Capability).id}`, { 'has-selected': isSelected, current: isCurrent(element) }, getPlatformCssClass(element)]"
      @clicked="onElementClicked(element)"
  />
</template>
