<template>
  <div class="app">
    <Header :toggleSettings="toggleShowSettings" />
    <div class="container">
      <main class="main">
        <Main :cities="cities" v-show="!showSettings" />
        <Settings :error="error" :cities="cities" :updateCities="updateCities" :addCityByName="addCityByName" v-show="showSettings" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import Header from '../src/components/Header.vue'
import Main from '../src/views/Main.vue'
import Settings from '../src/views/Settings.vue'
import getWeather from './composables/getWeather'

export default {
  name: 'App',
  components: {
    Header,
    Main,
    Settings,
  },
  setup() {
    const { cities, addCityByName, updateCities, error } = getWeather()

    const showSettings = ref(false)

    const toggleShowSettings = () => {
      showSettings.value = !showSettings.value
    }

    return {
      showSettings,
      toggleShowSettings,
      cities,
      addCityByName,
      updateCities,
      error,
    }
  },
}
</script>
