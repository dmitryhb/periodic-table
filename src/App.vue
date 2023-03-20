<script setup lang="ts">
import AppLoader from './components/ui/AppLoader.vue'
import {computed, ComputedRef, defineComponent, onMounted} from 'vue'
import {useStore} from 'vuex'
import ElementsList from '@/components/ElementsList.vue'
import AppHeader from '@/components/AppHeader.vue'

const store = useStore()
const isAppReady: ComputedRef<boolean> = computed(() => store.state.ui.isAppReady)

onMounted(async () => {
  await store.dispatch('app/initApplication')
  await store.dispatch('data/loadCapabilities')
  await store.dispatch('data/loadElements')
  await store.dispatch('data/loadPlatforms')
  await store.dispatch('ui/setAppReady', true)
})

defineComponent({
  name: 'App'
})
</script>
<template>
  <div v-if="isAppReady">
    <app-header />
    <div>
      <elements-list />
    </div>
  </div>
  <app-loader v-else/>
</template>
