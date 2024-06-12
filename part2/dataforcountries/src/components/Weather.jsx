import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`)
      .then(response => {
        setWeatherData(response.data)
      })
  }, [])

  if (weatherData === null) return null

  return (
    <>
      <h2>{`Weather in ${country.capital[0]}`}</h2>
      <p>{`temperature ${(weatherData.main.temp - 273.5).toFixed(2)} Celsius`}</p>
      <img alt='weather icon' src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
      <p>{`wind ${weatherData.wind.speed} m/s`}</p>
    </>
  )
}

export default Weather