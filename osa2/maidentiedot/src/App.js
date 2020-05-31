import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  let countriesToShow = countries.filter(country => 
    country.name.toUpperCase().includes(filter.toUpperCase())
  )
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow} setFilter={setFilter} />
    </div>
  )
}

export default App;
