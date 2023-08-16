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
import CloudIcon from '@/icons/CloudIcon.vue'
import SettingsIcon from '@/icons/SettingsIcon.vue'

export default {
  name: 'Header',
  components: {
    CloudIcon,
    SettingsIcon,
  },
  props: {
    toggleSettings: {
      type: Function,
      required: true,
    },
  },
  setup() {},
}
</script>
