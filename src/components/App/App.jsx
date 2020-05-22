import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import { useStyles } from './App.styles';
import Home from '../Home/Home';
import { Header } from '../Header/Header';

export default function App() {
  const styles = useStyles();
  return (
    <BrowserRouter>
      <Container maxWidth="xl" className={styles.root}>
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/individualCountry" component={} /> */}
        </Switch>
        {/* <Footer /> */}
      </Container>
    </BrowserRouter>
  );
}
  
