import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './individualCountry.styles';
<<<<<<< HEAD
import StackGraph from '../StackGraph/StackGraph';
import { getCovidChartData } from '../../selectors/selectors';
import { useDispatch, useSelector } from 'react-redux';

export const individualCountry = () => {
  const classes = useStyles();
  const chartDataSet = useSelector(getCovidChartData);
  console.log(chartDataSet);
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.header}>
        <Typography variant="h3" className={classes.title}>Individual Country</Typography>
        
        <Grid item xs={12} className={classes.graph}>
          <StackGraph dataSet={chartDataSet} />
=======
import Map from '../Map/Map';
import { getGlobalMapMobilityByDate, getSelectedCountryCode } from '../../selectors/selectors';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import StackGraph from '../StackGraph/StackGraph';
import { getCovidChartData } from '../../selectors/selectors';
import { useDispatch, useSelector } from 'react-redux';

import MiniChartsContainer from '../MiniChart/MiniChartsContainer';


export const individualCountry = () => {
  const classes = useStyles();

  const globalMapMobilityData = useSelector(getGlobalMapMobilityByDate);
  const { countryCode: countryCodeParam } = useParams();
  const countryCode = useSelector(getSelectedCountryCode);
  const chartDataSet = useSelector(getCovidChartData);
        
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.header}>
        <Typography variant="h3" className={classes.title}>{countryCode}</Typography>
        <Map mapData={globalMapMobilityData} countryCode={countryCodeParam || countryCode}/>
      
        <Grid item xs={12} className={classes.graph}>
          <StackGraph dataSet={chartDataSet} />
        </Grid>

        <Grid item xs={12} className={classes.metrics}>

        <Grid item xs={12} lg={6} className={classes.graph}>
          <MiniChartsContainer />
>>>>>>> bb49b1aab5f74eccac3ed97db32d5e49a3a75526
        </Grid>

        <Grid item xs={12} className={classes.metrics}>
          <Typography variant="h3" className={classes.title}>Metrics</Typography>
        </Grid>

      </Grid>
    </Grid>
  );
};

