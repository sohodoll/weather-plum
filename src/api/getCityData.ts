export const getCityData = async (city: string, long?: number, lat?: number) => {
  let response

  if (long && lat) {
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.VUE_APP_WEATHER_KEY}`
    )
  } else {
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.VUE_APP_WEATHER_KEY}`)
  }

  const data = await response.json()

  if (data.cod === 200) {
    return data
  } else {
    throw new Error("Can't get city data")
  }
}
