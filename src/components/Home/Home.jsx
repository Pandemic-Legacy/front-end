import React, { useEffect } from 'react';
import Map from '../Map/Map';
import LineGraph from '../LineGraph/LineGraph';
// import { useWorldMobilityData } from '../../hooks/mobilityHooks';
import { useDispatch, useSelector } from 'react-redux';
import { getGlobalMapMobilityByDate, getSelectedCountryName } from '../../selectors/selectors';

import { getCovidChartData } from '../../selectors/selectors';
import { setCovidChartData, setSelectedCountryCode, setSelectedCountryName, setSelectedSubregion, resetCovidSubData } from '../../actions/actions';
import { Grid, Typography } from '@material-ui/core';
import styles from './Home.css';



export const Home = () => {
  
  const dispatch = useDispatch();
  const globalMapMobilityData = useSelector(getGlobalMapMobilityByDate);
  const countryName = useSelector(getSelectedCountryName);
  const chartDataSet = useSelector(getCovidChartData);

  useEffect(() => {
    dispatch(setSelectedCountryName('Worldwide'));
    dispatch(setSelectedCountryCode(''));
    dispatch(setSelectedSubregion(''));
    dispatch(resetCovidSubData());
    dispatch(setCovidChartData());
  }, []);

  return (
    <>
      <Grid container justify="center" className={styles.Home}>
        <Grid item xs={12}>
          {/* <Typography variant="h4" align="center">Change in Mobility</Typography> */}
          <Map mapData={globalMapMobilityData} />
        </Grid>
      </Grid>
      <Grid container justify="center" className={styles.fullWidthLightBlue}>
        <Grid item xs={12} sm={10}>
          <Typography variant="h4" align="center" className={styles.subhead}>COVID Statistics {countryName === 'Worldwide' ? 'Worldwide' : `for ${countryName}` }</Typography>
          <LineGraph dataset={chartDataSet} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
