import React from 'react';
import LineGraph from '../LineGraph/LineGraph';
import { Container, CssBaseline } from '@material-ui/core';
import { useStyles } from '../ComparePage/ComparePage.styles';
import { useCovidData } from '../../hooks/covidHooks';


const ComparePage = () => {

  const covidData = useCovidData();
  const styles = useStyles();

  return (
    <>
      <Container maxWidth="xl" className={styles.root}>
        <CssBaseline />
        <LineGraph dataset={covidData} />
      </Container>
    </>
  );
};

export default ComparePage;
