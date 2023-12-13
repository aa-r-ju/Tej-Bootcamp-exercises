import React, { useState, useEffect } from 'react';
import axios from 'axios';
import noteService from "./note"
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newVal, setNewVal] = useState('');
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      console.log(initialNotes,"aarju,,,")
      setPersons(initialNotes)
      });
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`);
      return;
    }

    const newPerson = { name: newName, number: newVal };

    noteService.create(newPerson)
     .then(value => {
       setPersons([...persons,value]);

      setNewName('');
      setNewVal('');
    }).catch (error => {
      console.error('Error adding person:', error);

     })
     
    }


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
