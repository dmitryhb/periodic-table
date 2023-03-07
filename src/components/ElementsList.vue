<script setup lang="ts">
import {useStore} from 'vuex'
import {computed} from 'vue'
import ElementItem from '@/components/ElementItem.vue'

const store = useStore()
const elements = computed(() => store.state.data.elements.items)
</script>
<template>
  <div class="elements-list" v-if="elements && elements.length">
    <element-item
        v-for="(element, i) in elements"
        :key="`element-${i}`"
        :element="element"
    />
  </div>
</template>
