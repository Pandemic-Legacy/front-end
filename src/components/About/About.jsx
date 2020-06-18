import React from 'react';
import { useStyles } from './About.styles';
import { Grid, Typography, Link } from '@material-ui/core';
import logo from '../../assets/logo.png';

// Use components to remove duplication
const Developer = ({ name, github, linkedIn, portfolio, twitter }) => (
  <Grid item xs={12} className={classes.google} >
    <Typography variant="body1" className={classes.h4}>
      {name}:
      <Link target="_blank" href={github}>GitHub</Link>
      /
      <Link target="_blank" href={linkedIn}>LinkedIn</Link>
      /
      {profile && <Link target="_blank" href={portfolio}>Portfolio</Link>}
      {twitter && <Link target="_blank" href={twitter}>Twitter</Link>}
    </Typography>
  </Grid>
)

export const About = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <img alt="logo" src={logo} className={classes.image}/>

      <Grid item xs={12} className={classes.titleContainer} >
        <Typography variant="h1" className={classes.title}>About our data sources:</Typography>
      </Grid>

      <Grid item xs={12} className={classes.container} >

        <Grid item xs={12} className={classes.google} >
          <Link className={classes.link} target="_blank" href="https://www.google.com/covid19/mobility/index.html?hl=en">Mobility Data</Link>
          <Typography variant="body1" className={classes.h4}>The mobility data in this app comes from a Google dataset that measures daily travel compared to a normal day before the pandemic. <a href="https://support.google.com/covid19-mobility/answer/9824897?hl=en&ref_topic=9822927">Click here</a> for more information about their data sources and how they determined baseline values.</Typography>
        </Grid>

        <Grid item xs={12} className={classes.bing} >
          <Link className={classes.link} target="_blank" href="https://www.bing.com/covid/">COVID-19 Data</Link>
          <Typography variant="body1" className={classes.h4}>All of the COVID-19 data in this app has been compiled by Bing using global statistics from many reputable sources, including the CDC and the WHO. <a href="https://help.bing.microsoft.com/#apex/18/en-us/10024">Click here</a> for a full list of data sources.</Typography>
        </Grid>

      </Grid>

      <Grid item xs={12} className={classes.titleContainer} >
        <Typography variant="h1" className={classes.title}>About the developers:</Typography>
      </Grid>

      <Grid item xs={12} className={classes.container} >

        <Developer
          name="Chelsea Spangler"
          github="https://github.com/cnspangler"
          linkedIn="https://www.linkedin.com/in/chelseanspangler/"
          twitter="https://twitter.com/CN_Spangler" />

        <Grid item xs={12} className={classes.google} >
          <Typography variant="body1" className={classes.h4}>Fiona Ochs: <Link target="_blank" href="https://github.com/fionaochs">GitHub</Link> / <Link target="_blank" href="https://www.linkedin.com/in/fionaochs/">LinkedIn</Link> / <Link target="_blank" href="https://fionaochs.dev/">Portfolio</Link></Typography>
        </Grid>

        <Grid item xs={12} className={classes.google} >
          <Typography variant="body1" className={classes.h4}>Nathan Martel: <Link target="_blank" href="https://github.com/nathanmartel">GitHub</Link> / <Link target="_blank" href="https://www.linkedin.com/in/nathanmartel">LinkedIn</Link></Typography>
        </Grid>

        <Grid item xs={12} className={classes.google} >
          <Typography variant="body1" className={classes.h4}>Scott Harlan: <Link target="_blank" href="https://github.com/seharlan">GitHub</Link> / <Link target="_blank" href="https://www.linkedin.com/in/scottharlan-pnw">LinkedIn</Link> / <Link target="_blank" href="https://scottharlan.dev/">Portfolio</Link></Typography>
        </Grid>

      </Grid>

    </Grid>
  );
};
