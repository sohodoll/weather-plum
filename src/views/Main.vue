<template>
  <div class="weather">
    <Spinner v-if="pending" />
    <div v-if="cities">
      <City v-for="city in cities" :key="city.id" :city="city" />
    </div>
  </div>
</template>

<script lang="ts">
import City from './City.vue'
import Spinner from '@/components/Spinner.vue'
import { ICity } from '@/interfaces/ICity'

export default {
  name: 'Main',
  components: {
    City,
    Spinner,
  },
  props: {
    cities: {
      type: Array as () => ICity[],
      required: true,
    },
    pending: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
