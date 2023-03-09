<script setup lang="ts">
import {useStore} from 'vuex'
import {computed, onBeforeUnmount, onMounted, watch} from 'vue'
import ElementItem from '@/components/ElementItem.vue'
import CapabilitiesList from '@/components/CapabilitiesList.vue'
import {Capability} from '@/lib/capability'
import {Element} from '@/lib/element'
import {useClickOutside} from '@/lib/click-outside'
import {useAnimateElement} from '@/components/lib/animate-element'

const maxItemsPerColumn: number = 9
const store = useStore()
const capabilities = computed(() => store.state.data.capabilities.items)
const selectedCapabilities = computed(() => store.state.app.selectedCapabilities)
const hasCurrentElement = computed(() => store.state.app.currentElement !== null)
const { animateElementIntro, animateElementOutro } = useAnimateElement()

/**
 * Clears current element.
 */
const clearCurrentElement = (): void => {
  store.dispatch('app/setCurrentElement', null)
}

/**
 * Handler keyboard navigation.
 * @param e
 */
const handleKeyboard = (e: KeyboardEvent): void => {
  if (e.key === 'Escape') {
    clearCurrentElement()
  }
}

const { bind, unbind } = useClickOutside(['.elements-view', '.cloned-element'], clearCurrentElement)

/**
 * Get column's CSS class name.
 * @param capability
 */
const getColumnsClass = (capability: Capability): string => {
  const total: number = capability.elements ? capability.elements.length : 1
  return `column-${Math.max(0, Math.floor(total / maxItemsPerColumn))}`
}

/**
 * Check whether the given capability ID is in a list of selected capabilities.
 * @param capabilityId
 */
const isSelected = (capabilityId: string): boolean => {
  return selectedCapabilities.value.includes(capabilityId)
}

/**
 * Element's click handler.
 * @param element
 */
const onElementClicked = (element: Element): void => {
  if (!element.capability) {
    return
  }

  if (selectedCapabilities.value.length > 0 && !isSelected(element.capability.id)) {
    store.dispatch('app/toggleSelectedCapability', element.capability.id)
  }

  store.dispatch('app/setCurrentElement', element)
}

onMounted(() => {
  window.addEventListener('keyup', handleKeyboard)
  bind()
})

onBeforeUnmount(() => {
  window.removeEventListener('keyup', handleKeyboard)
  unbind()
})

watch(() => store.state.app.currentElement, (value: Element | null, oldValue: Element | null) => {
  if (oldValue) {
    const closeButton: HTMLElement | null = document.querySelector('.close')
    if (closeButton) {
      closeButton.removeEventListener('click', clearCurrentElement)
    }
    animateElementOutro(oldValue)
  }

  if (value) {
    animateElementIntro(value)
    const closeButton: HTMLElement | null = document.querySelector('.close')
    if (closeButton) {
      closeButton.addEventListener('click', clearCurrentElement)
    }
  }
})
</script>
<template>
  <div class="elements-view" :class="{ 'has-current-element': hasCurrentElement }">
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
          :id="`capability-${capability.id}`"
          :class="[getColumnsClass(capability), { selected: isSelected(capability.id) }]"
      >
        <element-item
            v-for="(element, j) in capability.elements"
            @clicked="onElementClicked(element)"
            :id="element.id"
            :key="element.id"
            :element="element"
        />
      </div>
    </div>
  </div>
</template>
