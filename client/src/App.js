import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Google from './components/googleLogin'
import InputCollaborateur from './components/inputCollaborateur';
import End from './components/end'


function App() {

  const [dataFromAPI, setDataFromAPI] = useState({})
  const [handleChange, setHandleChange] = useState()

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'><Google setDataFromAPI={setDataFromAPI} />
          </Route>
          <Route exact path='/collaborateur/:prenom/:nom'><InputCollaborateur dataFromAPI={dataFromAPI} setDataFromAPI={setDataFromAPI} handleChange={handleChange} /></Route>
          <Route exact path='/ok'><End /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
