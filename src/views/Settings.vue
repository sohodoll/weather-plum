<template>
  <div class="settings">
    <div class="settingsControls">
      <input class="cityInput" v-model="searchQuery" type="text" placeholder="Search for a city" />
      <button class="cityButton" @click="addCity(searchQuery)">
        <PlusIcon />
      </button>
    </div>
    <span class="error" v-if="error.message">{{ error.message }}</span>
    <draggable
      class="citiesList"
      item-key="element.name"
      v-if="citiesList.length"
      @start="drag = true"
      @end="onDragEnd"
      v-model="citiesList"
    >
      <template #item="city">
        <article class="city">
          <div class="cityNameControls">
            <DragIcon />
            <span>{{ city.element.name }}</span>
          </div>
          <XIcon @click="removeCity(city.element.name)" />
        </article>
      </template>
    </draggable>
    <Spinner v-if="pending" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { ICity } from '@/interfaces/ICity'
import { IWeatherError } from '@/interfaces/IWeatherError'
import Draggable from 'vuedraggable'
import Spinner from '@/components/Spinner.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import XIcon from '@/icons/XIcon.vue'
import DragIcon from '@/icons/DragIcon.vue'

export default {
  name: 'Settings',
  components: {
    PlusIcon,
    XIcon,
    DragIcon,
    Draggable,
    Spinner,
  },
  props: {
    cities: {
      type: Array as () => ICity[],
      required: true,
    },
    addCityByName: {
      type: Function,
      required: true,
    },
    updateCities: {
      type: Function,
      required: true,
    },
    error: {
      type: Object as () => IWeatherError,
      required: true,
    },
    pending: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const drag = ref(false)
    const searchQuery = ref('')
    const citiesList = ref(props.cities) //create a copy of the cities array to use in the draggable component

    const syncCities = () => {
      props.updateCities(citiesList.value) //update the cities array in the app constructor
    }

    const addCity = (cityName: string) => {
      if (cityName) {
        props.addCityByName(cityName)
        searchQuery.value = ''
      }
    }

    const removeCity = (cityName: string) => {
      citiesList.value = citiesList.value.filter((city: any) => city.name !== cityName)
      syncCities()
    }

    const onDragEnd = () => {
      drag.value = false
      syncCities()
    }

    return {
      searchQuery,
      addCity,
      removeCity,
      citiesList,
      drag,
      onDragEnd,
    }
  },
}
</script>
