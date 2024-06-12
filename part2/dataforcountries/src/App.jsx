import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {
  const api_key = import.meta.env.VITE_WEATHER_API_KEY
  const [search, setSearch] = useState('')
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountryData(response.data)
    })
    .catch(error => {
      console.log(`error fetching data: ${error}`)
    })
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  
  return(
    <div>
      <form>
        find countries <input value={search} onChange={handleSearch} />
      </form>
      <Filter search={search} countryData={countryData} />
    </div>
  )
}

export default App