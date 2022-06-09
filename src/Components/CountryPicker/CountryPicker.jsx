import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@mui/material";
import styles from "./CountryPicker.module.css";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { getData } from "../../redux/covidSlice";

function CountryPicker () {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Global");
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      axios
        .get("https://covid19.mathdro.id/api/countries")
        .then((res) => res.data)
        .then((data) => data.countries)
        .then((names) => setFetchedCountries(names));
    };
    getData();
  }, [fetchedCountries]);

  useEffect(() => {
    dispatch(getData(selectedCountry));
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  
  
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={handleCountryChange}
      >
        <option value="">Global</option>
        {fetchedCountries.map((country, key) => (
          <option key={key} value={country.name}>
            {country.name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;