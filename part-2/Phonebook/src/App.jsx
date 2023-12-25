import React, { useState, useEffect } from 'react';
import noteService from "./note";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newVal, setNewVal] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [notification, setNotification] = useState();

  useEffect(() => {
    noteService.getAll()
      .then(initialNotes => {
        setPersons(initialNotes);
      })
      .catch(error => {
        showErrorNotification('Error fetching data from the server.');
        console.error('Error fetching data:', error);
      });
  }, []);

  const showSuccessNotification = (message) => {
    setNotification({ type: 'success', message });
    setTimeout(() => {
      setNotification(null);
    }, 5000); // 5000 milliseconds (5 seconds)
  };

  const showErrorNotification = (message) => {
    setNotification({ type: 'error', message });
    setTimeout(() => {
      setNotification(null);
    }, 5000); // 5000 milliseconds (5 seconds)
  };

  const addNote = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      showErrorNotification(`${newName} is already added to the phonebook.`);
      return;
    }

    const newPerson = { name: newName, number: newVal };
     let data = newPerson.name
    noteService.create(newPerson)
     .then(value => {
       setPersons([...persons,value]);
       setNewName('');
       setNewVal('');
       showSuccessNotification(`${newPerson.name} added to the phonebook.`);
     })
     .catch(error => {
       showErrorNotification(`Person validation failed: name: Path 'name' (${data}) is shorter than the minimum allowed length (3).`);
       console.error('Error adding person:', error);
     });
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    const confirmDeletion = window.confirm(`Delete ${personToDelete.name}?`);

    if (confirmDeletion) {
      noteService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showSuccessNotification(`${personToDelete.name} deleted from the phonebook.`);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            showErrorNotification(`${personToDelete.name} not found. The person may have been deleted.`);
          } else {
            showErrorNotification('Error deleting person. Please try again.');
          }
          console.error('Error deleting person:', error);
        });
    }
  };

  const existingPerson = persons.find((person) => person.name === newName);

  if (existingPerson) {
    const confirmUpdate = window.confirm(
      `${newName} is already added to the phonebook. Replace the old number with the new one?`
    );

    if (confirmUpdate) {
      const updatedPerson = { ...existingPerson, number: newVal };

      noteService
        .update(existingPerson.id, updatedPerson)
        .then((updatedPerson) => {
          setPersons(persons.map((person) => (person.id !== updatedPerson.id ? person : updatedPerson)));
          showSuccessNotification(`${updatedPerson.name}'s number updated successfully.`);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            showErrorNotification(`${updatedPerson.name} not found. The person may have been deleted.`);
          } else {
            showErrorNotification('Error updating person. Please try again.');
          }
          console.error('Error updating person:', error);
        });
    }
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

      {notification && (
        <div style={{ color: notification.type === 'error' ? 'red' : 'green', border: '1px solid', padding: '10px', marginBottom: '10px' }}>
          {notification.message}
        </div>
      )}

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

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
