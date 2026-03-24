import { useContext } from "react"
import { WeatherContext } from "./weatherContext"



export default function Form(props) {
  const {handleSubmit}= useContext(WeatherContext)
  return (
    <form action={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
      <input
        placeholder="Search for a city..."
        name="city"
        style={{
          padding: '10px 16px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '1rem',
          width: '300px',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          border: '2px solid #3a7bd5',
          background: 'white',
          color: '#3a7bd5',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  )
}