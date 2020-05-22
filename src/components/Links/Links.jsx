import React from 'react';
import { Grid, Link } from '@material-ui/core';
import { useStyles } from './Links.styles';

export const Links = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.links}>
        <Link className={classes.link} href="/">Home</Link>
        {/* <Link className={classes.link} href="/compare">Compare Countries</Link> */}
        {/* <Link className={classes.link} href="/about">Search</Link> */}
      </Grid>
    </Grid>
  );
};
