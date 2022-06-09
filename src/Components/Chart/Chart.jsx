import { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Legend,
  PointElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Legend,
  PointElement
);

function Chart () {
  const items = useSelector((state) => state.covid.items);
  const country = useSelector((state) => state.covid.country);

  //CHART LİNE
  const [dailyData, setDailyData] = useState([]);
  const url = "https://covid19.mathdro.id/api"; 
  const fetchDailyData = async () => {
    try {
      const { data } = await axios.get(`${url}/daily`);
      const modifiedData = data.map((dailyData) => ({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
      }));
      return modifiedData;
    } catch (error) {}
  };
  
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const labelsLine = dailyData.map(({ date }) => date);
  const dataLine = {
    labels: labelsLine,
    datasets: [
    {
      label: 'Infected',
      data: dailyData.map(({ confirmed }) => confirmed),
      fill: true,
      borderColor: '#3333ff',
      tension: 0.1
    },
    {
      label: 'Deaths',
      data: dailyData.map(({ deaths }) => deaths),
      fill: true,
      borderColor: 'red',
      backgroundColor: "rgba(255,0,0,0.5)",
      tension: 0.1
    }]
  };

  const config = {
    type: 'line',
    data: dataLine,
  };

  
// CHART BAR
  const labelsBar = ["Infected", "Recovered", "Deaths", "Active",];
  const dataBar = {
    labels: labelsBar,
    datasets: [{
      label: 'My First Country',
      data: [
        items.confirmed,
        items.recovered,
        items.deaths,
        items.active,
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)'
      ],
      borderWidth: 1
    }]
  };

  const configbar = {
    type: 'bar',
    data: dataBar,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  return (
    <div className={styles.container}>
      {country !== "Global" ? <Bar configbar={configbar} data={dataBar} /> : <Line config={config} data={dataLine} />}
    </div>
  );
};

export default Chart;