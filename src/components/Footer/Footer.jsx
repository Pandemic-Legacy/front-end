import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './Footer.styles';

export const Footer = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.container} >
        <Typography variant="h1" className={classes.title}>Footer</Typography>
      </Grid>
    </Grid>
  );
};
