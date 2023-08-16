<template>
  <div class="app">
    <Header :toggleSettings="toggleShowSettings" />
    <div class="container">
      <main class="main">
        <Main :cities="cities" :showCities="showCities" v-show="!showSettings" />
        <Settings :cities="cities" :addCityByName="addCityByName" v-show="showSettings" />
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
    const { cities, addCityByName } = getWeather() //this is the starting point of the app, using the composables to get all needed data

    const showSettings = ref(false) //using ref to toggle the settings view. not using the router for this to keep the widget simple and the url clean

    const toggleShowSettings = () => {
      showSettings.value = !showSettings.value
      console.log(cities.value)
    }

    const showCities = () => {
      console.log(cities.value)
      console.log('d')
    }

    return {
      showSettings,
      toggleShowSettings,
      cities,
      showCities,
      addCityByName,
    }
  },
}
</script>
