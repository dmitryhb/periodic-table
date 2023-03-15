<script setup lang="ts">
import {useStore} from 'vuex'
import {computed, onBeforeUnmount, onMounted, watch} from 'vue'
import {Capability} from '@/lib/capability'
import {Element} from '@/lib/element'
import {useClickOutside} from '@/lib/click-outside'
import {useAnimateElement} from '@/components/lib/animate-element'
import Cap from '@/components/Cap.vue'
import CapabilitiesList from '@/components/CapabilitiesList.vue'

const maxItemsPerColumn: number = 9
const store = useStore()
const capabilities = computed(() => store.state.data.capabilities.items)
const elements = computed(() => store.state.data.elements.items)
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
 * @param index
 */
const getColumnsClass = (capability: Capability, index: number): string => {
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

const hasSelected = computed(() => {
  return store.state.app.selectedCapabilities.length > 0
})

onMounted(() => {
  window.addEventListener('keyup', handleKeyboard)
  window.addEventListener('closeActiveElement', clearCurrentElement)
  bind()
})

onBeforeUnmount(() => {
  window.removeEventListener('keyup', handleKeyboard)
  window.removeEventListener('closeActiveElement', clearCurrentElement)
  unbind()
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
    <div class="col">
      <cap @clicked="onElementClicked" capability="quoteManagement" />
      <cap @clicked="onElementClicked" capability="restrictions" />
      <cap @clicked="onElementClicked" capability="dashboards" />
    </div>
    <div class="col gap-1">
      <cap @clicked="onElementClicked" capability="marketplace" />
      <cap @clicked="onElementClicked" capability="returnsWarranty" />
    </div>
    <div class="col col-3 gap-3">
      <cap @clicked="onElementClicked" capability="accountManagement" />
      <cap @clicked="onElementClicked" capability="selfService" />
      <cap @clicked="onElementClicked" capability="serviceManagement" />
      <cap @clicked="onElementClicked" capability="internationalization" />
    </div>
    <div class="col col-3 gap-3">
      <cap @clicked="onElementClicked" capability="salesEnablement" />
      <cap @clicked="onElementClicked" capability="productsPricing" />
      <cap @clicked="onElementClicked" capability="orderAutomation" />
      <cap @clicked="onElementClicked" capability="subscriptions" />
    </div>
    <div class="col gap-1">
      <cap @clicked="onElementClicked" capability="webContent" />
      <cap @clicked="onElementClicked" capability="carts" />
    </div>
    <div class="col gap-1">
      <cap @clicked="onElementClicked" capability="orderManagement" />
    </div>
    <div class="col gap-1 sm-horizontal">
      <cap @clicked="onElementClicked" capability="dataAnalytics" />
      <cap @clicked="onElementClicked" capability="legalCompliance" />
      <cap @clicked="onElementClicked" capability="invoiceManagement" />
    </div>
    <div class="col sm-horizontal">
      <cap @clicked="onElementClicked" capability="checkout" />
    </div>
    <div class="col sm-horizontal">
      <cap @clicked="onElementClicked" capability="searchNavigation" />
    </div>
  </div>
</template>
