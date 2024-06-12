import Weather from './Weather'

const SingleCountry = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang => <li key={lang}>{lang}</li>))}
      </ul>
      <img src={country.flags.png} alt='flag' height='300' width='350' />
      <Weather country={country} />
    </>
  )
}

export default SingleCountry