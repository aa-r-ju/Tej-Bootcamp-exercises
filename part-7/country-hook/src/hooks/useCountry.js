import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      let countriesAxios = axios.get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
      );

      countriesAxios
        .then((result) => {
          setCountry({ data: result.data, found: true });
        })
        .catch(() => setCountry({ found: false }));
    }
  }, [name]);

  return country;
};
