import React from 'react';
import LineGraph from '../LineGraph/LineGraph';
import { Container, CssBaseline } from '@material-ui/core';
import { useStyles } from '../ComparePage/ComparePage.styles';
import { useCovidData } from '../../hooks/covidHooks';
import { useWorldMobilityData, useMobilityDataByCountryCode } from '../../hooks/mobilityHooks';


const ComparePage = () => {

  // const covidData = useCovidData();
  // const covidYAxis = [0, Math.max(...covidData['positive'])];
  const mobilityData = useMobilityDataByCountryCode('US');
  const mobilityYAxis = [-100, 50];
  const styles = useStyles();

  return (
    <>
      <Container maxWidth="xl" className={styles.root}>
        <CssBaseline />
        <LineGraph dataset={mobilityData} yAxisConstraints={mobilityYAxis} />
        {/* yAxisMath.max(...dataset['positive']) */}
      </Container>
    </>
  );
};

export default ComparePage;
