import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import InputCollaborateur from './components/inputCollaborateur';
import Rh from './components/rh'
import Home from './components/home'
import Redirection from './components/redirection'

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route exact path='/redirect/:email'><Redirection /></Route>
          <Route exact path='/collaborateur/:prenom/:nom'><InputCollaborateur /></Route>
          <Route exact path='/rh'><Rh /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
