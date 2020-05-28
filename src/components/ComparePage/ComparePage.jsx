import React, { useEffect, useState } from 'react';
import { Grid, Typography, FormControl, Input, InputLabel, Select, MenuItem, CircularProgress } from '@material-ui/core';
import { useStyles } from './ComparePage.styles';
// import Map from '../Map/Map';
import { getGlobalMapMobilityByDate, getSelectedCountryCode, getMobilitySubregionNames, getSelectedSubregion, getCovidSubData, getMobilitySubData, getSelectedCountryName, getMobilityCompareCountryCode, getMobilityCompareCountryName } from '../../selectors/selectors';
import { useParams } from 'react-router-dom';
// import { getCovidChartData } from '../../selectors/selectors';
import { useSelector, useDispatch } from 'react-redux';
import MiniChartsContainer from '../MiniChart/MiniChartsContainer';
import { setSelectedSubregion, setMobilitySubregionNames, setCovidSubData, setMobilitySubData, resetCovidSubData, setSelectedCountryCode, setSelectedCountry, setSelectedCountryName, setMobilityCompareCountry } from '../../actions/actions';
import { useMobilityDataByCountryCode } from '../../hooks/mobilityHooks';

export const ComparePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [selectedCompareCountryCode, setSelectedCompareCountryCode] = useState('');
  // const [mobilityCompareData, setMobilityCompareData] = useState({});
  const { countryCode: countryCodeParam } = useParams();
  const countryCode = useSelector(getSelectedCountryCode);
  const countryName = useSelector(getSelectedCountryName);
  const subregion = useSelector(getSelectedSubregion);
  const subRegionNames = useSelector(getMobilitySubregionNames);
  // const chartDataSet = useSelector(getCovidChartData);
  const stackGraphSubData = useSelector(getCovidSubData);
  const selectedCountryCode = useSelector(getSelectedCountryCode);
  const selectedCountryName = useSelector(getSelectedCountryName);
  const compareCountryCode = useSelector(getMobilityCompareCountryCode);
  const compareCountryName = useSelector(getMobilityCompareCountryName);
  const globalMapMobilityData = useSelector(getGlobalMapMobilityByDate);
  


  // Gets param (if there isn't already a selected country)
  useEffect(() => {
    if(!countryCode.length) dispatch(setSelectedCountryCode(countryCodeParam));
  }, []);

  // useEffect(() => {
  //   if(!selectedCompareCountryCode) return;
  //   const compareData = useMobilityDataByCountryCode(selectedCompareCountryCode);
  //   setMobilityCompareData(compareData);
  // }, [selectedCompareCountryCode]);

  
  // useEffect(() => {
  //   if(countryCode === '') return;
  //   if(countryName === 'Worldwide' || chartDataSet.countryName !== 'Worldwide') {
  //     dispatch(setSelectedCountryName(chartDataSet.countryName));
  //   }  
  //   dispatch(setMobilitySubregionNames(countryCode));
  // }, [countryCode, chartDataSet]);

  // // Save for subregions
  //   useEffect(() => {
  //     if(subregion === '') return dispatch(resetCovidSubData());
  //     dispatch(setCovidSubData(countryCode, subregion));
  //     dispatch(setMobilitySubData(countryCode, subregion));
  //   }, [subregion]);

  // const selectOptions = subRegionNames
  //   ?.sort()
  //   .map((item) => (<MenuItem  key={item} value={item}>{item}</MenuItem>));


  // Build selects for compare country dropdown
  const selectOptions = globalMapMobilityData?.features
    ?.filter(item => item.mobilityData.countryName != null)
    .sort((a, b) => (a.mobilityData.countryName > b.mobilityData.countryName) ? 1 : -1)
    .map((item) => <MenuItem 
      key={item.mobilityData.countryName}  
      name={item.mobilityData.countryName}
      value={JSON.stringify({
        countryCode: item.mobilityData.countryCode,
        countryName: item.mobilityData.countryName
      })}
    >{item.mobilityData.countryName}</MenuItem>);


  return (
    <Grid container justify="center" className={classes.root}>

      {/* Compare country select field */}
      <Grid item xs={12} sm={3}>
        <FormControl variant="outlined" size="small" fullWidth className={classes.formControl}>
          {/* <InputLabel id="country-select-label">Choose a Country</InputLabel> */}
          <Select
            labelId="compare-select-label"
            id="compare-select"
            value={JSON.stringify({
              countryCode: compareCountryCode,
              countryName: compareCountryName
            })}
            onChange={({ target }) => {
              const { countryCode, countryName } = JSON.parse(target.value);
              const toDispatch = {
                countryCode,
                countryName
              };
              // If using hooks...
              // setMobilityCompareCountryCode(toDispatch.countryCode);
              dispatch(setMobilityCompareCountry(toDispatch));
              // dispatch(setSelectedCompareSubregion(''));
              // if(location.pathname !== '/')history.replace(`/compare/${countryCode}`);
            }}
          >
            { (location.pathname === '/compare/') &&
              <MenuItem value={JSON.stringify({
                countryCode: '',
                countryName: 'Worldwide'
              })}>Choose a Country</MenuItem>
            }
            {selectOptions}          
          </Select>
        </FormControl>      
      </Grid>


      {/* <Grid item xs={12} md={10}>
        { !selectOptions.length 
          ? <Typography variant="body1">No Subregions Found</Typography>
          : <FormControl variant="outlined" size="small" className={classes.formControl}>
            <InputLabel id="subregion-select-label">Subregion</InputLabel>
            <Select
              label="Subregion"
              labelId="subregion-select-label"
              id="subregion-select"
              value={subregion}
              onChange={({ target }) => dispatch(setSelectedSubregion(target.value))}
            >
              <MenuItem value="" key="default">Choose a Subregion</MenuItem>
              {selectOptions}
            </Select>
          </FormControl>}
      </Grid> */}
      
      <Grid item xs={12} md={10}>
        <Typography variant="h3" color="primary" className={classes.title}>{countryName}</Typography>
      </Grid>

      <Grid item xs={12} md={10} className={classes.graph}>
        <MiniChartsContainer />
      </Grid>

    </Grid>
  );
};

export default ComparePage;
