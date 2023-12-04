import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number:"040-1234567"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newVal, setNewVal]  = useState('')
  const [searchVal, setSearchVal] = useState('')

  const addNote = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`);
      return;
    }

    const newPerson = { name: newName,number:newVal };
    setPersons([...persons, newPerson]);
    setNewName('')
    setNewVal('')
  }

  const handleAddNote = (event) => {
    setNewName(event.target.value)
  }

  const handleNewVal = (event) => {
    setNewVal(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchVal(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div>
    <h2>Phonebook</h2>
    <div>
    filter shown with: <input type='search' onChange={handleSearch}/>
    </div>
      <h2>add a new</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value = {newName} onChange={handleAddNote} />
        </div>
        <div>
        number: <input value={newVal} onChange={handleNewVal} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person, id) => (
          <li key={id}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App