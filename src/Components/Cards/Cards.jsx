import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";
import { useSelector } from 'react-redux';

function Cards () {
  const items = useSelector((state) => state.covid.items);
 
  let carddetails = [
    {
      style: styles.infected,
      text: "Infected",
      value: items.confirmed,
      bottomText: "Number of infect cases of COVID-19",
    },
    {
      style: styles.recovered,
      text: "Recovered",
      value: items.recovered,
      bottomText: "Number of recoveries from COVID-19",
    },
    {
      style: styles.deaths,
      text: "Deaths",
      value: items.deaths,
      bottomText: "Number of deaths caused by COVID-19",
    },
    {
      style: styles.active,
      text: "Active",
      value: items.active,
      bottomText: "Number of active cases of COVID-19",
    },
  ];
  
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        {carddetails.map((detail, index) => (
          <Grid
            item
            component={Card}
            xs={12}
            md={2}
            className={cx(styles.Card, detail.style)}
            key={index}
            style={{ margin: "0px 23.675px", padding: "12px" }}
          >
            <CardContent>
              <Typography color="textPrimary" gutterBottom>
                <b>{detail.text}</b>
              </Typography>
              <Typography variant="h5">
                <CountUp
                  start={0}
                  end={detail.value}
                  duration={2}
                  separator=","
                />
              </Typography>
              <Typography color="textPrimary">Last Updated at : </Typography>
              <Typography color="textSecondary" variant="body2">
                {new Date(items.lastUpdate).toDateString()}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {new Date(items.lastUpdate).toLocaleTimeString()}
              </Typography>
              <Typography variant="body2">{detail.bottomText}</Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cards;