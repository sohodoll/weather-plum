export const getCityName = async (city: string) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.VUE_APP_WEATHER_KEY}`)
  const data = await response.json()

  return data
}