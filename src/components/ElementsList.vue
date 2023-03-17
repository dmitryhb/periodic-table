<script setup lang="ts">
import {useStore} from 'vuex'
import {computed, onBeforeUnmount, onMounted, watch} from 'vue'
import {Element} from '@/lib/element'
import {useClickOutside} from '@/lib/use-click-outside'
import {useAnimateElement} from '@/components/lib/animate-element'
import Cap from '@/components/Cap.vue'
import CapabilitiesList from '@/components/CapabilitiesList.vue'
import {elementsMap} from '@/components/lib/elements-map'
import {useKeyboardNavigation} from '@/lib/use-keyboard-navigation'

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

const { bindClickOutside, unbindClickOutside } = useClickOutside(['.elements-view', '.cloned-element'], clearCurrentElement)
const { bindKeyboardNavigation, unbindKeyboardNavigation } = useKeyboardNavigation()

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

/**
 * Computed property which defines whether there is a selected element or not.
 */
const hasSelected = computed(() => {
  return store.state.app.selectedCapabilities.length > 0
})

onMounted(() => {
  window.addEventListener('keyup', handleKeyboard)
  window.addEventListener('closeActiveElement', clearCurrentElement)
  bindClickOutside()
  bindKeyboardNavigation()
})

onBeforeUnmount(() => {
  window.removeEventListener('keyup', handleKeyboard)
  window.removeEventListener('closeActiveElement', clearCurrentElement)
  unbindClickOutside()
  unbindKeyboardNavigation()
})

watch(() => store.state.app.currentElement, (value: Element | null, oldValue: Element | null) => {
  if (oldValue) {
    animateElementOutro(oldValue)
  }

  if (value) {
    animateElementIntro(value)
  }
})
</script>
<template>
  <div class="elements-view" :class="{ 'has-current-element': hasCurrentElement, 'has-selected': hasSelected }">
    <capabilities-list />
    <div
        v-for="(capability, i) in elementsMap"
        :key="`capability-col-${i}`"
        class="col"
        :class="capability.cssClass"
    >
      <cap
          v-for="capabilityItem in capability.capabilities"
          @clicked="onElementClicked"
          :key="`capabilityItem-${capabilityItem}`"
          :capability="capabilityItem"
      />
    </div>
  </div>
</template>
