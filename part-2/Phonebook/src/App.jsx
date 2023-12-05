import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ handleSearch }) => (
  <div>
    Filter shown with: <input type='search' onChange={handleSearch} />
  </div>
);

const PersonForm = ({ addNote, newName, handleAddNote, newVal, handleNewVal }) => (
  <form onSubmit={addNote}>
    <div>
      name: <input value={newName} onChange={handleAddNote} />
    </div>
    <div>
      number: <input value={newVal} onChange={handleNewVal} />
    </div>

    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ filteredPersons }) => (
  <ul>
    {filteredPersons.map((person, id) => (
      <li key={id}>
        {person.name} - {person.number}
      </li>
    ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newVal, setNewVal] = useState('');
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`);
      return;
    }

    const newPerson = { name: newName, number: newVal };
    setPersons([...persons, newPerson]);
    setNewName('');
    setNewVal('');
  };

  const handleAddNote = (event) => {
    setNewName(event.target.value);
  };

  const handleNewVal = (event) => {
    setNewVal(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchVal(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSearch={handleSearch} />

      <h3>Add a new</h3>

      <PersonForm
        addNote={addNote}
        newName={newName}
        handleAddNote={handleAddNote}
        newVal={newVal}
        handleNewVal={handleNewVal}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
