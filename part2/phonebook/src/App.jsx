import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import nameService from './services/names'

const Filter = ({ search, handleSearch }) => <div>filter shown with <input value={search} onChange={handleSearch} /></div>

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </>
  )
}

const Person = ({ person, onDelete }) => {
  return (
    <>
      {person.name} {person.number} <button onClick={() => onDelete(person.id)}>delete</button>
    </>
  )
}

const Persons = ({ persons, onDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.id}><Person person={person} onDelete={onDelete} /></div>
      ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(["", true])
  
  useEffect(() => {
    nameService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const checkPerson = persons.find(props => props.name.toLowerCase() === nameObject.name.toLowerCase())
    const changedObject = { ...checkPerson, number: newNumber }

    if (checkPerson && checkPerson.number === nameObject.number) {
      alert(`${newName} is already added to phonebook`)
    } else if (checkPerson && checkPerson.newNumber !== nameObject.number) {
      const confirmNewNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmNewNumber) {
        nameService
          .update(checkPerson.id, changedObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== checkPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage([`changed the number of ${returnedPerson.name}`, true])
            setTimeout(() => {
              setErrorMessage(["", true])
            }, 5000)
          })
          .catch(error => {
            setErrorMessage([`Information of ${changedObject.name} has already been removed from server`, false])
            setTimeout(() => {
              setErrorMessage(["", true])
            }, 5000)
          })
      }
    }
    else {
      nameService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
          setNewName('')
          setNewNumber('')
          setErrorMessage([`Added ${returnedName.name}`, true])
          setTimeout(() => {
            setErrorMessage(["", true])
          }, 5000)
      })
    }
  }

  const handleDelete = id => {
    const deletedPerson = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`delete ${deletedPerson.name} ?`)
    if (confirmDelete) {
      nameService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id))
        setErrorMessage([`Deleted ${deletedPerson.name}`, true])
        setTimeout(() => {
          setErrorMessage(["", true])
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={handleDelete} />
    </div>
  )
}

export default App