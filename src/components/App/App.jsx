import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import { useStyles } from './App.styles';
import Home from '../Home/Home';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { individualCountry } from '../individualCountry/individualCountry';
import { HighScore } from '../HighScore/HighScore';

export default function App() {
  const styles = useStyles();
  return (
    <BrowserRouter>
      <Container maxWidth="xl" className={styles.root}>
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/country" component={individualCountry} />
          <Route path="/highscore" component={HighScore} />
        </Switch>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}
  
