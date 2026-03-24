import { useContext } from "react"
import { WeatherContext } from "./weatherContext"


export default function Forecast() {
  const {mapForecastData, forecastResult, scale} = useContext(WeatherContext)

  const days = mapForecastData(forecastResult)

  if (!days.length) return null

  const toF = (k) => Math.round((k - 273.15) * 9/5 + 32)

  const toC = (k) => Math.round(k -273.15)

  const getLabel = (dateStr, index) => {
    if (index === 0) return 'Today'
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' })
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.15)',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '16px',
      padding: '24px 28px',
      marginTop: '24px',
    }}>
      <h2 style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '1.4rem' }}>
        5-Day Forecast
      </h2>
      <div style={{ display: 'flex', gap: '12px' }}>
        {days.map(({ day, minTemp, maxTemp, icon }, index) => (
          <div key={day} style={{
            flex: 1,
            background: 'white',
            borderRadius: '12px',
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: '#333',
          }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
              {getLabel(day, index)}
            </span>
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={icon}
              style={{ width: '50px' }}
            />
            <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{scale ? toC(maxTemp) : toF(maxTemp)}°</span>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>{scale ? toC(minTemp) : toF(minTemp)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}