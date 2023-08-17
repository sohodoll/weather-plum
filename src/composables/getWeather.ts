import { getCityName } from '@/api/getCityName'
import { ICity } from '@/interfaces/ICity'
import { IWeatherError } from '@/interfaces/IWeatherError'
import { ref, Ref } from 'vue'

//this is the main logic behind the widget
//I decided to use a simple constructor instead of vuex to keep the widget simple and lightweight

const getWeather = () => {
  const cities = ref<ICity[]>(JSON.parse(localStorage.getItem('cities') || '[]'))
  const error: Ref<IWeatherError> = ref(new Error(''))

  const syncLocalStorage = (): void => {
    localStorage.setItem('cities', JSON.stringify(cities.value))
  }

  const getCity = async (cityName: string): Promise<ICity | undefined> => {
    try {
      const city = await getCityName(cityName)
      return city
    } catch (err) {
      console.error(err)
    }
  }

  const addCityByName = async (city: string): Promise<void> => {
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
  }
}

export default getWeather
