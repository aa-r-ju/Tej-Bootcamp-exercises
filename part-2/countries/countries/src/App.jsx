import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [weather, setWeather] = useState({
    temp:"",
    tempIcon:"",
    wind:""
  });


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

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };


  const apiKey = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
  
      if (selectedCountry && selectedCountry.capital) {
        console.log(selectedCountry.capital,"helelo")
        axios
         .get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital[0]}&appid=${apiKey}`)
          .then((response) => {
            setWeather({temp:response.data.main.temp,tempIcon:response.data.weather[0].icon,wind:response.data.wind.speed});
            console.log(response.data,"kkk")
          })
          .catch((error) => {
            console.error('Error fetching weather data:', error);
          });
      }
    
  }, [selectedCountry]);

  return (
    <div>
      <p>
        Find countries
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </p>

      {countries.length > 10 && <p>Too many matches. Specify another filter.</p>}

      {countries.length > 1 && countries.length <= 10 && (
        <ul>
          {countries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}{' '}
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
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


          {weather && (
            <div>
              <h3>Weather in Helsinki {selectedCountry.capital[0]}</h3>
              <p>Temperature: {weather.temp} celcius</p>
              <img  src={` https://openweathermap.org/img/wn/${weather.tempIcon}@2x.png`}/>
              <p>wind:{weather.wind}</p>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default App;
