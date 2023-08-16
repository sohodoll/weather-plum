<template>
  <div class="weather">
    <div v-if="cities">
      <City v-for="city in cities" :key="city.id" :city="city" />
    </div>
  </div>
</template>

<script lang="ts">
import City from './City.vue'

export default {
  name: 'Main',
  components: {
    City,
  },
  props: ['cities', 'showCities'],
  setup() {
    return {}
  },
}
</script>
