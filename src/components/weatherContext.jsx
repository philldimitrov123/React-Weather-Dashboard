import { useState, useEffect, createContext } from 'react'


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export const WeatherContext = createContext(null)

export default function WeatherProvider({children}){ 
    
    const [weatherResult, setWeatherResult] = useState({ list:[]})
  
  const [forecastResult, setForecastResult] = useState({list:[]})

  const [scale, setScale] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=> {
    setWeatherResult(JSON.parse(localStorage.getItem('weatherData')) || {list: []})
    setForecastResult(JSON.parse(localStorage.getItem('forecastData')) || {list: []})
  },[])

  function handleSubmit(formData){
    const city = formData.get("city")
    setIsLoading(prev => !prev)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
                    .then(result => result.json())
                    .then(data => {
                      if (!data.name) return
                      setWeatherResult(data)
                      localStorage.setItem('weatherData', JSON.stringify(data))
                    })
                    .catch(error => console.error('Error fetching weather:', error))
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
                    .then(result => result.json())
                    .then(data => {
                      if (!data.list) return
                      setForecastResult(data)
                      localStorage.setItem('forecastData', JSON.stringify(data))
                    })
                    .finally(setIsLoading(prev => !prev))
                    .catch(error => console.error('Error fetching weather:', error))
  }

  function changeTempScale(){
    setScale(prev => !prev)
  }

  
  function groupForecastByDate(array){
    return array.reduce((acc,cur) => {
          let key = cur.dt_txt.slice(0,10)

          if (!acc[key]){
              acc[key] = []
          }

          acc[key].push({min:cur.main.temp_min, max:cur.main.temp_max, icon: cur.weather[0].icon})
          return acc
      }, {})
  }

  function filterForecastObj(obj){
    const foreCastArray = []
    
    Object.entries(obj).forEach(([key, value]) => {
        let minTemp = 9999999
        let maxTemp = 0
        let icon = ""

        for (let i=0; i < value.length; i++){
          if (value[i].min < minTemp){
            minTemp = value[i].min
          }
          
          if (value[i].max > maxTemp){
            maxTemp = value[i].max
            icon = value[i].icon
          }
        
        }
        foreCastArray.push({day: key, minTemp, maxTemp, icon})

      })
    
    return foreCastArray

      }

  function mapForecastData(data){
    return filterForecastObj(groupForecastByDate(data.list))
    

  }

  return <WeatherContext.Provider value={{ weatherResult, 
                                        forecastResult, 
                                        scale, 
                                        isLoading, 
                                        handleSubmit, 
                                        changeTempScale, 
                                        mapForecastData }}>
                                        {children} </WeatherContext.Provider> 
}