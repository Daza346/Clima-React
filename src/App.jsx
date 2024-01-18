import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCards from './assets/components/WeatherCards'

function App (){
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)


  const success = pos => {
    const obj={
    lat: pos.coords.latitude,
    lon: pos.coords.longitude
    }
    setCoords(obj)
  }

  useEffect(() =>{
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success)
  },[] )

  useEffect(() =>{
    if(coords){

      const API_KEY = 'a3d76e8ec0df0431bcd0892232b5a0c7'
      const { lat, lon } = coords

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      
      axios.get(url)
      .then(res => {
        setWeather(res.data)

        const celsius = (res.data.main.temp - 273.15).toFixed(1)
        const fahrenheit = celsius * 9 / 5 + 32
        const obj = {
          celsius: (res.data.main.temp - 273.15).toFixed(1),
          fahrenheit: ((res.data.main.temp - 273.15) + 9 / 5 +32).toFixed(1)
        }
        setTemp(obj)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
    }
  },[coords] )

  return (
    <div className='app'>
      {
        isLoading
        ?<h2>Loading🌩🌩🌩</h2>
        : (
       <WeatherCards 
       weather={weather}
       temp={temp}
      />
      )
     }
    </div>
  )      
}

export default App