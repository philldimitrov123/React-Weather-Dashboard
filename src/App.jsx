import Header from "./components/header.jsx"
import Form from "./components/form.jsx"
import WeatherCard from "./components/currentWeatherCard.jsx"
import Forecast from "./components/5dayForcast.jsx"
import WeatherProvider from "./components/weatherContext.jsx"

export default function App() {
  
  return (
    <WeatherProvider>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px' }}>
      <Header />
      <Form />
      <WeatherCard />
      <Forecast />
    </div>
    </WeatherProvider>
    
  )
  
}

console.log(import.meta.env.VITE_WEATHER_API_KEY)

