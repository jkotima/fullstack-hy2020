import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ notification, setNotification ] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const setTimedNotification = (message, error=false) => {
        setNotification({message, error})
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        } 

        if (persons.map((person) => person.name).includes(newName)) {
            if (!window.confirm(`${newName} is already added to phonebook, `
                               +`replace old number with a new one?`)) {
                return
            }

            const id = persons.find(n => n.name === newName).id
            personService
                .update(id, personObject)
                .then(returnedPerson => {
                    setPersons(persons.map(person => 
                        person.id !== id ? person : returnedPerson))
                        setTimedNotification(`Updated ${personObject.name}`)
                }).catch(error => {
                    setTimedNotification(`Information of ${personObject.name} `+
                                         `has already been removed from server`
                                         , error=true)
                })

        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setTimedNotification(`Added ${personObject.name}`)
                })
        }
    }
    const deletePerson = id => {
        const person = persons.find(n => n.id === id)
        if (!window.confirm(`Delete ${person.name}?`)) {
            return
        }

        personService
            .destroy(id)
            .then(returnedPerson => {
                setPersons(persons.filter(n => n.id !== id))
            }).catch(error => {
                alert(
                    `Person ${person.name} could not be deleted`
                )
            })
        setTimedNotification(`Deleted ${person.name}`) 
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
        <Notification notification={notification}/>

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
        <Persons persons={personsToShow} deletePerson={deletePerson}/>
      </div>
    )
}

export default App