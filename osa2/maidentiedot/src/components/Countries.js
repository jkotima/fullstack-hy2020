import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Weather = ({city}) => {
    const [weather, setWeather] = useState({
        temp:0,
        windspeed:0
    })
    const api_key = process.env.REACT_APP_API_KEY
    // jätän tämän vain tähän 9de243494c0b295cca9337e1e96b00e2
    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
            .then(response => {
              setWeather({
                temp:response.data.main.temp,
                windspeed:response.data.wind.speed
              })
            })
        }, [])

    return (
        <div>
        <b>Temperature </b>{weather.temp} Celcius <br />
        <b>Wind speed </b>{weather.windspeed} m/s
        </div>
    )
}

const Countries = ({countriesToShow, setFilter}) => {
    if (countriesToShow.length === 1) {
      return (
        <div>
          <h1>{countriesToShow[0].name}</h1>
          <p>Capital: {countriesToShow[0].capital}</p>
          <p>Population: {countriesToShow[0].population}</p>
          <h2>Languages</h2>
          <ul>
            {countriesToShow[0].languages.map((language, key) =>
              <li key={key} >{language.name}</li>
            )}
          </ul>
          <img src={countriesToShow[0].flag} height="100" />
          <Weather city={countriesToShow[0].capital}/>
        </div>
      )
    }
  
    if (countriesToShow.length <= 10) {
      return (
        <div>
        {countriesToShow.map((country) =>
          <div>
            {country.name}
            <button onClick={() => setFilter(country.name)}>
            show
            </button>
          </div>
        )}
        </div>
      )
    }
  
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  export default Countries