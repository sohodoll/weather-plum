import { WEATHER_KEY } from './config'

export const getCoordinates = async (city: string) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_KEY}`)
  const data = await response.json()

  return data.coord
}
