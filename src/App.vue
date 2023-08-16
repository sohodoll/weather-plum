<template>
  <div class="app">
    <Header :toggleSettings="toggleSettings" />
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
    const { cities, addCityByName } = getWeather()

    const showSettings = ref(false)

    const toggleSettings = () => {
      showSettings.value = !showSettings.value
      console.log(cities.value)
    }

    const showCities = () => {
      console.log(cities.value)
      console.log('d')
    }

    return {
      showSettings,
      toggleSettings,
      cities,
      showCities,
      addCityByName,
    }
  },
}
</script>

<style lang="scss" scoped></style>
