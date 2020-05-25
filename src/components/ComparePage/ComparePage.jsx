import React, { useState, useEffect } from 'react';
import LineGraph from '../LineGraph/LineGraph';
import { Container, CssBaseline } from '@material-ui/core';
import { useStyles } from '../ComparePage/ComparePage.styles';
import { useCovidData } from '../../hooks/covidHooks';
import { useMobilityDataByCountryCode } from '../../hooks/mobilityHooks';
import { fetchMobilityDataByCountryCode } from '../../services/mobility';


export const ComparePage = () => {

  // const covidData = useCovidData();
  // const covidYAxis = [0, Math.max(...covidData['positive'])];
  const [selectedCountry, setSelectedCountry] = useState('GB');
  const [mobilityData, setMobilityData] = useState({});
  const mobilityYAxis = [-100, 50];
  const styles = useStyles();

  const handleRadioChange = ({ target }) => {
    setSelectedCountry(target.value);
  };

  // Violates the rules of hooks?
  // useEffect(() => {
  //   const fetchedData = useMobilityDataByCountryCode(selectedCountry);
  //   setMobilityData(fetchedData);
  // }, [selectedCountry]);

  useEffect(() => {
    const mobilityDataTemp = {};
    fetchMobilityDataByCountryCode(selectedCountry)
      .then(res => {
        const sortedRes = res.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
        mobilityDataTemp.date = sortedRes.map(item => item.date);
        mobilityDataTemp.countryCode = sortedRes[0].countryCode;
        mobilityDataTemp.countryName = sortedRes[0].countryName;
        mobilityDataTemp.retailChange = sortedRes.map(item => item.retailChange ?? 0);
        mobilityDataTemp.groceryChange = sortedRes.map(item => item.groceryChange ?? 0);
        mobilityDataTemp.parksChange = sortedRes.map(item => item.parksChange ?? 0);
        mobilityDataTemp.transitChange = sortedRes.map(item => item.transitChange ?? 0);
        mobilityDataTemp.workplacesChange = sortedRes.map(item => item.workplacesChange ?? 0);
        mobilityDataTemp.residentialChange = sortedRes.map(item => item.residentialChange ?? 0);
        console.log({ mobilityDataTemp });
        setMobilityData(mobilityDataTemp);
      });
  }, [selectedCountry]);


  return (
    <>
      <Container maxWidth="xl" className={styles.root}>
        <CssBaseline />
        {console.log('in ComparePage, mobilityData is', mobilityData)}
        <LineGraph dataset={mobilityData} yAxisConstraints={mobilityYAxis} />
        <input type="radio" id="radioUS" name="country" value="US" onChange={handleRadioChange} checked={selectedCountry === 'US'} />
        <label htmlFor="radioUS">United States</label>
        <input type="radio" id="radioGB" name="country" value="GB" onChange={handleRadioChange} checked={selectedCountry === 'GB'} />
        <label htmlFor="radioGB">Great Britain</label>
      </Container>
    </>
  );
};

export default ComparePage;
