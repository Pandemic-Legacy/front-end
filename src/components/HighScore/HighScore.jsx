import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './HighScore.styles';
import { Links } from '../Links/Links';
import { useState } from 'react';
import { useCovidData } from '../../hooks/covidHooks';
import { useMobilityDataByDate, useWorldMobilityData } from '../../hooks/mobilityHooks';

export const HighScore = () => {
  const classes = useStyles();
  const [averageMobility, setAverageMobility] = useState();

  // const { dateData, positiveData, recoveredData, deathData } = useCovidData();
  // console.log(deathData);

  const mobilityData = useMobilityDataByDate('2020-04-30T00:00:00.000+00:00');
  console.log(mobilityData);

  // console.log(mobilityData[0]);
  // const mobility = useWorldMobilityData();
  
  // console.log(mobilityData[0]['parksChange']);
  
  const data = 
  [{ countryCode: 'AE',
    countryName: 'United Arab Emirates',
    date: '2020-04-30T00:00:00.000Z',
    groceryChange: -26,
    parksChange: -71,
    residentialChange: 31,
    retailChange: -57,
    subRegion1: null,
    subRegion2: null,
    transitChange: -66,
    workplacesChange: -47,
    __v: 0,
    _id: '5ec4f4c3a0a8806585c85794' },
  { countryCode: 'AF',
    countryName: 'Afghanistan',
    date: '2020-04-30T00:00:00.000Z',
    groceryChange: -30,
    parksChange: -19,
    residentialChange: 17,
    retailChange: -47,
    subRegion1: null,
    subRegion2: null,
    transitChange: -48,
    workplacesChange: -33,
    __v: 0,
    _id: '5ec4f4c4a0a8806585c85a3c'
  }];
  
  const result = 
  data.reduce((r, d) => r + Math.abs(d.parksChange + d.residentialChange + d.groceryChange + d.retailChange + d.transitChange + d.workplacesChange), 0);
  
  const mappedData = data.map(metric => Math.abs(metric.residentialChange + metric.parksChange + metric.groceryChange + metric.retailChange + metric.transitChange + metric.workplacesChange));
  console.log(mappedData);

  console.log('absolute change in metrics', result);


  const list = mappedData.map(item => {
    return (
      <p key={item.countryCode}>• {item}</p>
    );
  });

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.container} >
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography variant="h1" className={classes.title}>Country Metric Comparison</Typography>
          <Typography variant="h3" className={classes.bullets}>{list}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
