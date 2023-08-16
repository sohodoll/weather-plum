import { getCityName } from '@/api/getCityName'
import { ref } from 'vue'

const getWeather = () => {
  const cities = ref<any>(JSON.parse(localStorage.getItem('cities') || '[]'))

  const getCity = async (cityName: string) => {
    try {
      const city = await getCityName(cityName)
      return city
    } catch (err) {
      console.error(err)
    }
  }

  const addCityByName = async (city: string) => {
    try {
      const cityData = await getCity(city)

      if (!cityData) {
        return
      }

      cities.value.push(cityData)

      localStorage.setItem('cities', JSON.stringify(cities.value))

      console.log(cities.value)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    cities,
    addCityByName,
  }
}

export default getWeather
