import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './individualCountry.styles';
import Map from '../Map/Map';
import { getGlobalMapMobilityByDate, getSelectedCountryCode, getMobilitySubregions, getSelectedSubregion } from '../../selectors/selectors';
import { useParams } from 'react-router-dom';
import StackGraph from '../StackGraph/StackGraph';
import { getCovidChartData } from '../../selectors/selectors';
import { useSelector } from 'react-redux';

import MiniChartsContainer from '../MiniChart/MiniChartsContainer';
import { setSelectedCountryCode, setSelectedsubregion } from '../../actions/actions';
import { dispatch } from 'd3';


export const individualCountry = () => {
  const classes = useStyles();

  const globalMapMobilityData = useSelector(getGlobalMapMobilityByDate);
  const { countryCode: countryCodeParam } = useParams();
  const countryCode = useSelector(getSelectedCountryCode);
  const subregion = useSelector(getSelectedSubregion);
  const chartDataSet = useSelector(getCovidChartData);
  const subregions = useSelector(getMobilitySubregions);

  const selectOptions = () => subregions
    .filter(item => item.subRegion1 != null)
    .sort((a, b) => (a.subRegion1 > b.subRegion1) ? 1 : -1)
    .map((item, i) => <option key={i} value={item.subRegion1}>{item.subRegion1}</option>);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.header}>
        <Typography variant="h3" className={classes.title}>{countryCode}</Typography>
        {/* <Map mapData={globalMapMobilityData} countryCode={countryCodeParam || countryCode}/> */}

        <Grid item xs={4}>
          { subregions &&
          <select value={subregion} onChange={({ target }) => dispatch(setSelectedsubregion(target.value))}>
            <option>Choose a subregion</option>
            {selectOptions()}
          </select>}
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

