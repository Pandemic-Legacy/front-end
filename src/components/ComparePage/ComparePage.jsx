import React from 'react';
import LineGraph from '../LineGraph/LineGraph';
import { Container, CssBaseline } from '@material-ui/core';
import { useStyles } from '../ComparePage/ComparePage.styles';

const ComparePage = () => {

  const styles = useStyles();

  return (
    <>
      <Container maxWidth="xl" className={styles.root}>
        <CssBaseline />
        <LineGraph />
      </Container>
    </>
  );
};

export default ComparePage;
