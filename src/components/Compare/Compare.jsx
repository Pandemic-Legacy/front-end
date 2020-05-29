import React, { useEffect, useState } from 'react';
import { Grid, Typography, FormControl, Input, InputLabel, Select, MenuItem, CircularProgress, Chip, Avatar } from '@material-ui/core';
import { useStyles } from './Compare.styles';
// import Map from '../Map/Map';
import { getGlobalMapMobilityByDate, getSelectedCountryCode, getMobilitySubregionNames, getSelectedSubregion, getCovidChartData, getCovidSubData, getMobilitySubData, getSelectedCountryName, getMobilityCompareCountryCode, getMobilityCompareCountryName, getMobilityCompareSubregion, getMobilityCompareSubregionNames } from '../../selectors/selectors';
import { useParams } from 'react-router-dom';
// import { getCovidChartData } from '../../selectors/selectors';
import { useSelector, useDispatch } from 'react-redux';
import MiniChartsContainer from '../MiniChart/MiniChartsContainer';
import { setSelectedSubregion, setMobilitySubregionNames, setCovidSubData, setMobilitySubData, resetCovidSubData, setSelectedCountryCode, setSelectedCountry, setSelectedCountryName, setMobilityCompareCountry, setMobilityCompareSubregion, setMobilityCompareCountryName, setMobilityCompareSubregionNames } from '../../actions/actions';
import { useMobilityDataByCountryCode } from '../../hooks/mobilityHooks';

export const Compare = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [selectedCompareCountryCode, setSelectedCompareCountryCode] = useState('');
  // const [mobilityCompareData, setMobilityCompareData] = useState({});
  const { countryCode: countryCodeParam } = useParams();
  const subregion = useSelector(getSelectedSubregion);
  const subregionNames = useSelector(getMobilitySubregionNames);
  const chartDataSet = useSelector(getCovidChartData);
  const stackGraphSubData = useSelector(getCovidSubData);
  const selectedCountryCode = useSelector(getSelectedCountryCode);
  const selectedCountryName = useSelector(getSelectedCountryName);
  const compareCountryCode = useSelector(getMobilityCompareCountryCode);
  const compareCountryName = useSelector(getMobilityCompareCountryName);
  const compareSubregion = useSelector(getMobilityCompareSubregion);
  const compareSubregionNames = useSelector(getMobilityCompareSubregionNames);
  const globalMapMobilityData = useSelector(getGlobalMapMobilityByDate);
  const myColorScale = ['#2b499d', '#229C9A'];

  
  // Gets param (if there isn't already a selected country)
  useEffect(() => {
    if(!selectedCountryCode.length) dispatch(setSelectedCountryCode(countryCodeParam));
  }, []);

  // Populate select fields with country and subregions
  useEffect(() => {
    if(selectedCountryCode === '') return;
    if(selectedCountryName === 'Worldwide' || chartDataSet.countryName !== 'Worldwide') {
      dispatch(setSelectedCountryName(chartDataSet.countryName));
    }  
    dispatch(setMobilitySubregionNames(selectedCountryCode));
  }, [selectedCountryCode, chartDataSet]);

  // Populate compare select fields with country and subregions
  useEffect(() => {
    if(compareCountryCode === '') return;
    if(compareCountryName === 'Worldwide') {
      dispatch(setMobilityCompareCountryName(chartDataSet.countryName));
    }  
    dispatch(setMobilityCompareSubregionNames(compareCountryCode));
  }, [compareCountryCode, chartDataSet]);

  
  // // Save for subregions
  //   useEffect(() => {
  //     if(subregion === '') return dispatch(resetCovidSubData());
  //     dispatch(setCovidSubData(countryCode, subregion));
  //     dispatch(setMobilitySubData(countryCode, subregion));
  //   }, [subregion]);


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

  const selectSubOptions = subregionNames
    ?.sort()
    .map((item) => (<MenuItem key={item} value={item}>{item}</MenuItem>));

  const selectCompareSubOptions = compareSubregionNames
    ?.sort()
    .map((item) => (<MenuItem key={item} value={item}>{item}</MenuItem>));


  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h3" align="center" className={classes.pageHeader}>Mobility Comparison</Typography>
      </Grid>

      {/* Selected country select field */}
      <Grid item xs={12} sm={3}>
        <FormControl variant="outlined" size="small" fullWidth className={classes.formControl}>
          <InputLabel id="country-select-label">Choose a Country</InputLabel>
          <Select
            labelId="country-select-label"
            label="Choose a Country"
            id="compare-select1"
            value={JSON.stringify({
              countryCode: selectedCountryCode,
              countryName: selectedCountryName
            })}
            onChange={({ target }) => {
              const { countryCode, countryName } = JSON.parse(target.value);
              const toDispatch = {
                countryCode,
                countryName
              };
              dispatch(setSelectedCountry(toDispatch));
              // dispatch(setSelectedCompareSubregion(''));
              // if(location.pathname !== '/')history.replace(`/compare/${countryCode}`);
            }}
          >
            <MenuItem value={JSON.stringify({
              countryCode: '',
              countryName: 'Worldwide'
            })}>Choose a Country</MenuItem>
            {selectOptions}          
          </Select>
        </FormControl>      

        {/* Selected country subregion select field */}
        <FormControl variant="outlined" size="small" fullWidth className={classes.formControl}>
          <InputLabel id="sub-select-label">Choose a Region</InputLabel>
          <Select
            labelId="sub-select-label"
            label="Choose a Region"
            id="compare-select-sub1"
            value={subregion}
            onChange={({ target }) => dispatch(setSelectedSubregion(target.value))}
          >
            <MenuItem value="" key="default">Choose a Region</MenuItem>
            {selectSubOptions}
          </Select>
        </FormControl>      
      </Grid>
      {/* </Grid> */}

      
      {/* Compare country select field */}
      <Grid item xs={12} sm={3}>
        <FormControl variant="outlined" size="small" fullWidth className={classes.formControl}>
          <InputLabel id="compare-select-label">Choose a Country</InputLabel>
          <Select
            labelId="compare-select-label"
            label="Choose a Country"
            id="compare-select2"
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
              dispatch(setMobilityCompareCountry(toDispatch));
              dispatch(setMobilityCompareSubregion(''));
              // if(location.pathname !== '/')history.replace(`/compare/${countryCode}`);
            }}
          >
            { location.pathname.includes('/compare') &&
              <MenuItem value={JSON.stringify({
                countryCode: '',
                countryName: 'Worldwide'
              })}>Worldwide</MenuItem>
            }
            {selectOptions}          
          </Select>
        </FormControl>      

        {/* Compare country subregion select field */}
        <FormControl variant="outlined" size="small" fullWidth className={classes.formControl}>
          <InputLabel id="subcompare-select-label">Choose a Region</InputLabel>
          <Select
            labelId="subcompare-subcompare2-label"
            label="Choose a Region"
            id="compare-select-sub2"
            value={compareSubregion}
            onChange={({ target }) => dispatch(setMobilityCompareSubregion(target.value))}
          >
            <MenuItem value="" key="default">Choose a Subregion</MenuItem>
            {selectCompareSubOptions}
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
      
      {/* <Grid item xs={12} md={10}>
        <Typography variant="h3" color="primary" className={classes.title}>{countryName}</Typography>
      </Grid> */}

      <Grid item xs={12} md={10} align="center" className={classes.legendTop}>
        {selectedCountryName && <Chip variant="outlined" className={classes.chipMarginTop} style={{ color: `${myColorScale[0]}`, border: `1px solid ${myColorScale[0]}`, backgroundColor: 'white' }} avatar={<Avatar style={{ backgroundColor:`${myColorScale[0]}` }}> </Avatar>} label={selectedCountryName + ' ' + subregion} /> }
        {compareCountryName && <Chip variant="outlined" className={classes.chipMarginTop} style={{ color: `${myColorScale[1]}`, border: `1px solid ${myColorScale[1]}`, backgroundColor: 'white' }} avatar={<Avatar style={{ backgroundColor:`${myColorScale[1]}` }}> </Avatar>} label={compareCountryName + ' ' + compareSubregion} /> }
      </Grid>

      <Grid item xs={12} md={10} className={classes.graph}>
        <MiniChartsContainer />
      </Grid>

      <Grid item xs={12} md={10} align="center" className={classes.legendBottom}>
        {selectedCountryName && <Chip variant="outlined" className={classes.chipMarginBottom} style={{ color: `${myColorScale[0]}`, border: `1px solid ${myColorScale[0]}`, backgroundColor: 'white' }} avatar={<Avatar style={{ backgroundColor:`${myColorScale[0]}` }}> </Avatar>} label={selectedCountryName + ' ' + subregion } /> }
        {compareCountryName && <Chip variant="outlined" className={classes.chipMarginBottom} style={{ color: `${myColorScale[1]}`, border: `1px solid ${myColorScale[1]}`, backgroundColor: 'white' }} avatar={<Avatar style={{ backgroundColor:`${myColorScale[1]}` }}> </Avatar>} label={compareCountryName + ' ' + compareSubregion} /> }
      </Grid>
      
    </Grid>
  );
};

export default Compare;
