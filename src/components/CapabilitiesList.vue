<script setup lang="ts">
import {useStore} from 'vuex'
import {computed} from 'vue'

const store = useStore()
const capabilities = computed(() => store.state.data.capabilities.items)
</script>
<template>
  <div class="capabilities-list" v-if="capabilities && capabilities.length > 0">
    <ul>
      <li v-for="capability in capabilities" :key="`capability-${capability.id}`">
        <div class="capability">
          <span class="color" :class="capability.color" />
          <span class="name">{{ capability.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
