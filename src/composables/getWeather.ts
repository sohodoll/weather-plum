import { getCityData } from '@/api/getCityData'
import { ICity } from '@/interfaces/ICity'
import { IWeatherError } from '@/interfaces/IWeatherError'
import { ref, Ref } from 'vue'

//this is the main logic behind the widget
//I decided to use a simple constructor instead of vuex to keep the widget simple and lightweight

const getWeather = () => {
  const cities = ref<ICity[]>(JSON.parse(localStorage.getItem('cities') || '[]'))
  const error: Ref<IWeatherError> = ref(new Error(''))
  const pending = ref(false)

  //ask user for geo location if there are no cities in the local storage
  if (cities.value.length === 0) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      pending.value = true
      const { latitude, longitude } = position.coords
      try {
        const city = await getCityData('', longitude, latitude)

        cities.value.push(city)
        syncLocalStorage()
      } catch (err) {
        error.value = {
          message: "Can't get your location or city data",
          name: 'Location Error',
        }
      } finally {
        pending.value = false
      }
    })
  }

  const syncLocalStorage = (): void => {
    localStorage.setItem('cities', JSON.stringify(cities.value))
  }

  const addCityByName = async (city: string): Promise<void> => {
    //checking for duplicates

    if (cities.value.find((item) => item.name === city)) {
      error.value = {
        message: 'This City is already there ;)',
        name: 'City Error',
      }
      return
    }

    pending.value = true
    try {
      const cityData = await getCityData(city)
      cities.value.push(cityData)
      syncLocalStorage()
      error.value = new Error('') //reset the error
    } catch (err) {
      error.value = {
        message: 'City not found. Check Your input and try again!',
        name: 'City Error',
      }
    } finally {
      pending.value = false
    }
  }

  const updateCities = (newCities: ICity[]): void => {
    cities.value = newCities
    syncLocalStorage()
  }

  return {
    cities,
    addCityByName,
    updateCities,
    error,
    pending,
  }
}

export default getWeather
