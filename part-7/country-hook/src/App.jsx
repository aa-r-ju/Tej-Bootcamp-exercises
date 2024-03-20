import React, { useState } from "react";
import { useCountry } from "./hooks/useCountry";
import { useField } from "./hooks/useField";

const Country = ({ country }) => {
  console.log(country, "outside useEffect");

  if (!country) {
    return null;
  }
  if (!country.found) {
    return <div> not found...</div>;
  }
  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.flags.alt}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);
  console.log(country, "from app component");

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };
  return (
    <div>
      <form onSubmit={fetch}>
        <p>Find Countriess</p>
        <input {...nameInput} />
      </form>
      <Country country={country} />
    </div>
  );
};
export default App;
