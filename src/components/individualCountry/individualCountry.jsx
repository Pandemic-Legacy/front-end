import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './individualCountry.styles';
import Map from '../Map/Map';
import { getGlobalMapMobilityByDate, getSelectedCountryCode } from '../../selectors/selectors';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const individualCountry = () => {
  const classes = useStyles();
  const globalMapMobilityData = useSelector(getGlobalMapMobilityByDate);
  const { countryCode: countryCodeParam } = useParams();
  const countryCode = useSelector(getSelectedCountryCode);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} lg={2} className={classes.header}>
        <Typography variant="h3" className={classes.title}>{countryCode}</Typography>
        <Map mapData={globalMapMobilityData} countryCode={countryCodeParam || countryCode}/>
        
        <Grid item xs={12} lg={2} className={classes.graph}>
          <Typography variant="h3" className={classes.title}>Graph</Typography>
        </Grid>

        <Grid item xs={12} lg={2} className={classes.metrics}>
          <Typography variant="h3" className={classes.title}>Metrics</Typography>
        </Grid>

      </Grid>
    </Grid>
  );
};

