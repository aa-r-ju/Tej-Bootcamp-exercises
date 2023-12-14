import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = () => {
      axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`)
        .then(response => {
          const data = response.data;
          setCountries(data);
          if (data.length === 1) {
            setSelectedCountry(data[0]);
          } else {
            setSelectedCountry(null);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    if (searchQuery.trim() !== '') {
      fetchCountries();
    }
  }, [searchQuery]);

  return (
    <div>
      <p>Find countries 
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      /></p>
      

      {countries.length > 10 && <p>Too many matches. Specify another filter.</p>}

      {countries.length > 1 && countries.length <= 10 && (
        <ul>
          {countries.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      )}

      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <p>Languages: {Object.values(selectedCountry.languages).join(', ')}</p>
          <img src={selectedCountry.flags.png} alt={`${selectedCountry.name.common} Flag`} />
        </div>
      )}
    </div>
  );
};

export default App;
