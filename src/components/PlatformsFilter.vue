<script setup lang="ts">
import {useStore} from 'vuex'
import {computed, ref, Ref, watch} from 'vue'
import {IPlatform} from '@/lib/platform'

const store = useStore()
const platforms = computed(() => store.state.data.platforms.items)
const selectedPlatform: Ref<IPlatform | null> = ref(null)

watch(selectedPlatform, (platform: IPlatform | null) => {
  store.dispatch('app/setCurrentPlatform', platform)
})
</script>
<template>
  <div class="platform-filter" v-if="platforms">
    <label>Filter by platform:</label>
    <select v-model="selectedPlatform">
      <option :value="null" selected>Not Filtered</option>
      <option v-for="platform in platforms" :value="platform">{{ platform.name }}</option>
    </select>
  </div>
</template>
