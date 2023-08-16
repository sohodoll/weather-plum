<template>
  <div class="settings">
    <div class="settingsControls">
      <input class="cityInput" v-model="searchQuery" type="text" placeholder="Search for a city" />
      <button class="cityButton" @click="addCity(searchQuery)">
        <PlusIcon />
      </button>
    </div>
    <div class="citiesList" v-if="cities">
      <article class="city" v-for="city in cities">
        <div class="cityNameControls">
          <DragIcon />
          <span>{{ city.name }}</span>
        </div>
        <XIcon />
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import XIcon from '@/icons/XIcon.vue'
import DragIcon from '@/icons/DragIcon.vue'

export default {
  name: 'Settings',
  components: {
    PlusIcon,
    XIcon,
    DragIcon,
  },
  props: ['cities', 'addCityByName'],
  setup(props: any) {
    const searchQuery = ref('')

    const addCity = (cityName: string) => {
      if (cityName) {
        props.addCityByName(cityName)
        searchQuery.value = ''
      }
    }

    return {
      searchQuery,
      addCity,
    }
  },
}
</script>
