import React from 'react'
import { Container } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";

export default function End() {
    let history = useHistory();
    const redirection = () => {
        history.push(`/`)
    }
    setTimeout(redirection, 5000);
    return (
        <Container textAlign='center'>
            <h1 className='end'>Merci d'avoir utilisé l'application "Embarquer"</h1>
            <p>Vous serez redirigé automatiquement à la page de connection</p>
        </Container>
    )
}
