<script>
import { defineComponent } from 'vue'
import PlatformsFilter from '@/components/PlatformsFilter.vue'

export default defineComponent({
  components: { PlatformsFilter }
})
</script>
<template>
  <div class="app-header">
    <div class="title">The Periodic Table of Composable B2B Commerce</div>
    <platforms-filter />
  </div>
</template>
