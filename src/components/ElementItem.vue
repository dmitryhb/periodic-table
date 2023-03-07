<script setup lang="ts">
import { defineProps } from 'vue'
import {Element} from '@/lib/element'

defineProps({
  element: Element
})
</script>
<template>
  <div class="element-item" :class="element.capability.color">
    <div class="element">{{ element.element }}</div>
    <div class="name">{{ element.name }}</div>
  </div>
</template>
