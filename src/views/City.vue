<template>
  <article class="mainCities">
    <div>
      <h2>{{ city.name }}, {{ city.sys.country }}</h2>
    </div>
    <div class="mainHighlight">
      <img :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`" alt="weather icon" />
      <span>{{ convertTemp(city.main.temp) }} °C</span>
    </div>
    <div class="description">
      <p>Feels like {{ convertTemp(city.main.feels_like) }} °C. {{ city.weather[0].description }}. {{ convertWind(city.wind.speed) }}</p>
    </div>
    <div class="weatherDirections">
      <NavigationIcon />
      <span>{{ city.wind.speed.toFixed(1) }}m/s {{ convertWindDirection(city.wind.deg) }}</span>
      <span> | </span>
      <span>{{ city.main.pressure }}hPa</span>
    </div>
    <div class="weatherMisc">
      <span>Humidity: {{ city.main.humidity }}%</span>
      <span>Visibility: {{ Math.round(city.visibility / 100) }}%</span>
    </div>
  </article>
</template>

<script lang="ts">
import { convertTemp } from '../utils/convertTemp'
import { convertWind } from '../utils/convertWind'
import { convertWindDirection } from '../utils/convertWindDirection'
import NavigationIcon from '../icons/NavigationIcon.vue'

export default {
  name: 'City',
  props: ['city'],
  components: {
    NavigationIcon,
  },
  setup() {
    return {
      convertTemp,
      convertWind,
      convertWindDirection,
    }
  },
}
</script>
