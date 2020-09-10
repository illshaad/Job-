import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Google from './components/googleLogin'
import InputCollaborateur from './components/inputCollaborateur';
import Rh from './components/rh'
import axios from 'axios'
import { useHistory } from "react-router-dom";



function App() {

  // const history = useHistory();



  // useEffect(() => {
  //   collaborateur ? history.push(`/rh`) : history.push(`/collaborateur/${name}`)
  // }, [collaborateur])

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'><Google />
          }</Route>
          {/* <Route exact path='/redirect/:email'><Redirection /></Route> */}
          <Route exact path='/collaborateur/:prenom/:nom'><InputCollaborateur /></Route>
          <Route exact path='/rh'><Rh /></Route>}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
