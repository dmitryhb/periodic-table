<script setup lang="ts">
import {computed, ComputedRef, onBeforeUnmount, onMounted} from 'vue'
import {IPlatformCounts} from '@/lib/platform-counts'
import {useStore} from 'vuex'
import {IElementPlatforms, IPlatform, PlatformOptions} from '@/lib/platform'
import get from 'lodash/get'
import {Element} from '@/lib/element'
import {useAnimatePlatformLegend} from '@/components/lib/animate-platform-legend'

const store = useStore()
const { animateIntro, animateOutro } = useAnimatePlatformLegend()
const counts: ComputedRef<IPlatformCounts> = computed((): IPlatformCounts => {
  const currentPlatform: IPlatform | null = store.state.app.currentPlatform

  const result: IPlatformCounts = {
    supported: 0,
    notSupported: 0,
    partially: 0
  }

  if (currentPlatform !== null) {
    store.state.data.elements.items.forEach((element: Element): void => {
      const platformOption: PlatformOptions = get<IElementPlatforms, string>(element.platforms, store.state.app.currentPlatform.code) as PlatformOptions
      switch (platformOption) {
        case PlatformOptions.NotSupported:
          result.notSupported++
          break

        case PlatformOptions.Partially:
          result.partially++
          break

        case PlatformOptions.Supported:
          result.supported++
          break
      }
    })
  }
  return result
})

onMounted(() => {
  animateIntro()
})

onBeforeUnmount(() => {
  animateOutro()
})
</script>
<template>
  <div class="platform-legend">
    <div class="item">
      <span class="indicator supported"></span>
      <span class="text">Supported <span class="count">({{ counts.supported }})</span></span>
    </div>
    <div class="item">
      <span class="indicator partially"></span>
      <span class="text">Partially Supported  <span class="count">({{ counts.partially }})</span></span>
    </div>
    <div class="item">
      <span class="indicator not-supported"></span>
      <span class="text">Not Supported  <span class="count">({{ counts.notSupported }})</span></span>
    </div>
  </div>
</template>
