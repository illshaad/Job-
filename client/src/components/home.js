import React from 'react'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { Container, Header, Segment } from 'semantic-ui-react'


export default function Home() {
    return (
        <Container className='home'>
            <Header textAlign='justified'>
                <Link to='/collaborateur'><Segment size='big' textAlign='center'>Collaborateur</Segment></Link>
                <Link to='/rh'><Segment size='big' textAlign='center'>RH</Segment></Link>
            </Header>
        </Container>
    )
}
