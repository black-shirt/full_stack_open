import SingleCountry from "./SingleCountry"

const Countries = ({ countries, toggleShow, showDetails }) => {
  return (
    <>
      {countries.map(country => (
        <div key={country.name.common}>
          {country.name.common} 
          <button onClick={() => toggleShow(country.name.common)}>
            {showDetails === country.name.common ? 'hide' : 'show'}
          </button>
          {showDetails && showDetails === country.name.common && (
            <>
              <SingleCountry country={country} />
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default Countries