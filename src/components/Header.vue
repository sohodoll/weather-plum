<template>
  <header>
    <div class="headerTitle">
      <CloudIcon />
      <h2>Weather App</h2>
    </div>
    <SettingsIcon @click="toggleSettings" class="settingsIcon" />
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CloudIcon from '@/icons/CloudIcon.vue'
import SettingsIcon from '@/icons/SettingsIcon.vue'

export default defineComponent({
  name: 'Header',
  components: {
    CloudIcon,
    SettingsIcon,
  },
  props: {
    toggleSettings: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
})
</script>
