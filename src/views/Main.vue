<template>
  <div class="weather">
    <div v-if="cities">
      <City v-for="city in cities" :key="city.id" :city="city" />
    </div>
  </div>
</template>

<script lang="ts">
import City from './City.vue'
import { ICity } from '@/interfaces/ICity'

export default {
  name: 'Main',
  components: {
    City,
  },
  props: {
    cities: {
      type: Array as () => ICity[],
      required: true,
    },
  },
}
</script>
