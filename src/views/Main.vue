<template>
  <div class="weather">
    <div v-if="cities">
      <div class="mainCities" v-for="city in cities" :key="city.id">
        <div>
          <h2>{{ city.name }}, {{ city.sys.country }}</h2>
        </div>

        <div>
          <img :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`" alt="weather icon" />
        </div>

        <p>Feels like {{ convertTemp(city.main.feels_like) }} °C. {{ city.weather[0].description }}</p>

        <p>{{ convertTemp(city.main.temp) }} °C</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { convertTemp } from '../utils/convertTemp'

export default {
  name: 'Main',
  components: {},
  props: ['cities', 'showCities'],
  setup() {
    return {
      convertTemp,
    }
  },
}
</script>

<style lang="scss" scoped></style>
