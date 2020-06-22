import React from 'react';
import Presentation from './components/presentation'
import { Header, Container } from 'semantic-ui-react'
import './App.css';

function App() {
  return (
    <div>
      <br />
      <Container>
        <Header as='h1' textAlign='center'>job.doctegestio.com</Header>
        <Presentation />
      </Container>
    </div>
  );
}

export default App;
