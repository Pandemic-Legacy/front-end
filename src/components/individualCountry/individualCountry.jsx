import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './individualCountry.styles';
import Map from '../Map/Map';
import { getGlobalMapMobilityByDate, getSelectedCountryCode } from '../../selectors/selectors';
import { useParams } from 'react-router-dom';
import StackGraph from '../StackGraph/StackGraph';
import { getCovidChartData } from '../../selectors/selectors';
import { useSelector } from 'react-redux';

import MiniChartsContainer from '../MiniChart/MiniChartsContainer';
import { setSelectedCountryCode } from '../../actions/actions';
import { dispatch } from 'd3';


export const individualCountry = () => {
  const classes = useStyles();

  const globalMapMobilityData = useSelector(getGlobalMapMobilityByDate);
  const { countryCode: countryCodeParam } = useParams();
  const countryCode = useSelector(getSelectedCountryCode);
  const chartDataSet = useSelector(getCovidChartData);

  // fetch covid data
  // fetch mobility data
  // update selectedCountryCode in redux
  // pass 
  const selectOptions = () => globalMapMobilityData.features
  .filter(item => item.mobilityData.countryName != null)
  .sort((a, b) => (a.mobilityData.countryName > b.mobilityData.countryName) ? 1 : -1)
  .map((item, i) => <option key={i} value={item.mobilityData.countryCode}>{item.mobilityData.countryName}</option>);

        
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.header}>
        <Typography variant="h3" className={classes.title}>{countryCode}</Typography>
        <Map mapData={globalMapMobilityData} countryCode={countryCodeParam || countryCode}/>

        <Grid item xs={4}>
          { globalMapMobilityData.features &&
        <select value={countryCode} onChange={({ target }) => dispatch(setSelectedCountryCode(target.value))}>
          <option>Choose a subregion</option>
          {selectOptions()}
        </select>
          }
        </Grid>
      
        <Grid item xs={12} className={classes.graph}>
          <StackGraph dataSet={chartDataSet} />
        </Grid>


        <Grid item xs={12} lg={6} className={classes.graph}>
          <MiniChartsContainer />
        </Grid>

        {/* <Grid item xs={12} className={classes.metrics}>
          <Typography variant="h3" className={classes.title}>Metrics</Typography>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

