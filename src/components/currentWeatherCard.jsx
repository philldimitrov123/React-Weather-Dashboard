import { useContext } from "react"
import { WeatherContext } from "./weatherContext"


export default function WeatherCard() {
  const {weatherResult, scale, changeTempScale} = useContext(WeatherContext)
  
  if (!weatherResult.name) return null

  const { name, sys, main, weather, wind, visibility } = weatherResult
  const condition = weather[0].description
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  const toC = (k) => Math.round(k -273.15)
  const toF = (k) => Math.round((k - 273.15) * 9/5 + 32)
  const toMph = (ms) => Math.round(ms * 2.237)
  const toMiles = (m) => Math.round(m / 1609)

  const stats = [
    { icon: '💧', label: 'Humidity', value: `${main.humidity}%` },
    { icon: '💨', label: 'Wind Speed', value: `${toMph(wind.speed)} mph` },
    { icon: '👁️', label: 'Visibility', value: `${toMiles(visibility)} mi` },
    { icon: '☀️', label: 'UV Index', value: 'N/A' },
  ]

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Main card */}
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '16px',
        padding: '28px 32px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>📍</span>
            <strong style={{ fontSize: '1.3rem' }}>{name}, {sys.country}</strong>
          </div>
          <p style={{ margin: '4px 0 20px', opacity: 0.85 }}>{date}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={iconUrl} alt={condition} style={{ width: '60px' }} />
            <span>
              <strong>High: {scale ? toC(main.temp_max) + ' C' : toF(main.temp_max) + ' F'}°</strong>
              {'  '}
              <strong>Low: {scale ? toC(main.temp_min) + ' C' : toF(main.temp_min) + ' F'}°</strong>
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '3.5rem', fontWeight: 'bold', lineHeight: 1 }}>
            <button onClick={changeTempScale} style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '20px',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: '500',
              padding: '4px 12px',
              cursor: 'pointer',
              verticalAlign: 'middle',
              marginRight: '8px',
            }}>Toggle Unit</button>
            {scale ? toC(main.temp) + ' C' : toF(main.temp) + ' F'}°
          </div>
          <div style={{ textTransform: 'capitalize', opacity: 0.9 }}>{condition}</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginTop: '12px',
      }}>
        {stats.map(({ icon, label, value }) => (
          <div key={label} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#333',
          }}>
            <span style={{ fontSize: '1.4rem' }}>{icon}</span>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>{label}</div>
              <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}