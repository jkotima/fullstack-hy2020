import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (persons.map((person) => person.name).includes(newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const personsToShow = persons.filter(person => 
        person.name.toUpperCase().includes(filter.toUpperCase())
    )

    return (
      <div>
        <h2>Phonebook</h2>
        <Filter value={filter} onChange={handleFilterChange}/>

        <h2>Add a new</h2>
        <PersonForm 
            addPerson={addPerson}
            newName={newName}
            newNumber={newNumber}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
        />

        <h2>Numbers</h2>
        <Persons persons={personsToShow}/>
      </div>
    )
}

export default App