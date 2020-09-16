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


function App() {

  const [dataFromAPI, setDataFromAPI] = useState({})
  const [handleChange, setHandleChange] = useState()

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'><Google setDataFromAPI={setDataFromAPI} />
          }</Route>
          {/* <Route exact path='/redirect/:email'><Redirection /></Route> */}
          <Route exact path='/collaborateur/:prenom/:nom'><InputCollaborateur dataFromAPI={dataFromAPI} handleChange={handleChange} /></Route>
          <Route exact path='/rh'><Rh setHandleChange={setHandleChange} /></Route>}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
