<template>
  <div>
    <div>
      <input v-model="searchQuery" type="text" placeholder="Search for a city" />
      <button @click="addCityByName(searchQuery)">Add</button>
    </div>
    <div v-if="cities">
      <div v-for="city in cities">
        {{ city.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'Settings',
  components: {},
  props: ['cities', 'addCityByName'],
  setup() {
    const searchQuery = ref('')

    return {
      searchQuery,
    }
  },
}
</script>
