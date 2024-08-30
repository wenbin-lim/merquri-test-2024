import { useState } from "react"
import "./App.css"

import { getWeatherByLocationName } from "./api/data"

function App() {
  const [locationQuery, setLocationQuery] = useState("")

  const getWeather = async () => {
    const res = await getWeatherByLocationName(locationQuery)
    console.log(res)
  }

  return (
    <div>
      <header>
        <input
          type="text"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </header>
    </div>
  )
}

export default App
