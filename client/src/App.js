import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './App.css';

import InputCollaborateur from './components/inputCollaborateur';
import Rh from './components/rh'
import Home from './components/home'

function App() {
  return (
    <Router>
      <div>
        <TransitionGroup>
          <CSSTransition timeout={900} classNames='fade'>
            <Switch>
              <Route exact path='/'><Home /></Route>
              <Route exact path='/collaborateur'><InputCollaborateur /></Route>
              <Route exact path='/rh'><Rh /></Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </Router>
  );
}

export default App;
