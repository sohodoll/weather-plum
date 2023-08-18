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
        if (city) {
          cities.value.push(city)
          syncLocalStorage()
        }
        throw new Error("Can't get your location or city data")
      } catch (err) {
        console.error(err)
      } finally {
        pending.value = false
      }
    })
  }

  const syncLocalStorage = (): void => {
    localStorage.setItem('cities', JSON.stringify(cities.value))
  }

  const getCity = async (cityName: string): Promise<ICity | undefined> => {
    pending.value = true
    try {
      const city = await getCityData(cityName)
      return city
    } catch (err) {
      console.error(err)
    } finally {
      console.log('here again')
      pending.value = false
    }
  }

  const addCityByName = async (city: string): Promise<void> => {
    pending.value = true
    try {
      const cityData = await getCity(city)

      if (cityData?.cod == '404') {
        //checking for errors with the input
        error.value = {
          name: 'City Error',
          message: 'City not found ;( Please check your input and try again.',
        }
        return
      }

      error.value = new Error('')

      if (cityData) {
        if (cities.value.some((city) => city.id === cityData.id)) {
          //checking for duplicates
          error.value = {
            name: 'City Error',
            message: 'This city is already there ;)',
          }
          return
        }

        cities.value.push(cityData)
        syncLocalStorage()
      }
    } catch (err) {
      console.error(err)
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
