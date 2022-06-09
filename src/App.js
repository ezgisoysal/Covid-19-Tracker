import React from "react";
import { Cards, CountryPicker, Chart } from "./Components";
import styles from "./App.module.css";

function App () {
  
    return (
      <div className={styles.container}>
        <img className={styles.image}
          src="https://raw.githubusercontent.com/sabesansathananthan/covid-19-tracker/master/src/images/image.png"
          alt="COVID-19" />
        <br />
          <b>Global and Country Wise Cases of Corona Virus</b>
        <br />
          <i>(For a Particular country, select a Country from below)</i>
        <br />
        <br />
        <Cards />
        <CountryPicker />
        <Chart />
      </div>
    )
}

export default App;
