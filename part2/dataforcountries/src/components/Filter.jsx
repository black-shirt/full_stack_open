import {useState} from 'react'
import Countries from './Countries'
import SingleCountry from './SingleCountry'

const Filter = ({ search, countryData }) => {
  const api_key = import.meta.env.VITE_WEATHER_API_KEY
  const [showDetails, setShowDetails] = useState(null)
  const [apiData, setApiData] = useState(null)
  
  const matchingCountries = countryData.filter(country => {
    return country.name.common.toLowerCase().includes(search.toLowerCase())
  })

  const toggleShow = (country) => {
    setShowDetails(country === showDetails ? null : country)
  }
  
  if (search === '') {
    return null
  } else if (matchingCountries.length > 10) {
    return <>Too many matches, specify another filter</>
  } else if (matchingCountries.length <= 10 && matchingCountries.length > 1) {
    return (
      <>
        <Countries countries={matchingCountries} toggleShow={toggleShow} showDetails={showDetails} />
      </>
    )
  } else if (matchingCountries.length == 1) {
    const country = matchingCountries[0]
    const countryName = country.name.common
    return (
      <>
        {<SingleCountry country={country} />}
      </>
    )
  }
}

export default Filter