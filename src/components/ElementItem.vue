<script setup lang="ts">
import { defineProps } from 'vue'
import {Element} from '@/lib/element'

const emit = defineEmits(['clicked'])

const onElementClicked = (): void => {
  emit('clicked')
}

defineProps({
  element: Element
})
</script>
<template>
  <div
      class="element-item"
      @click.prevent="onElementClicked"
      :class="element && element.capability ? element.capability.color : ''"
  >
    <div class="element">{{ element ? element.element : '' }}</div>
    <div class="name">{{ element ? element.name : '' }}</div>
  </div>
</template>
