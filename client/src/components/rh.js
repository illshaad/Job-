import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Header, Grid, Dropdown, Button } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";

export default function Rh() {
    let history = useHistory();
    const [dataCollaborateurs, setDataCollaborateurs] = useState([])

    const handleChange = e => {
        console.log(e.target.value)
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:3000/emailData',
            );
            setDataCollaborateurs(result.data);
        };
        fetchData();
    }, []);


    const buttonRedirect = () => {
        const nomPrenom = dataCollaborateurs.map(item => item.value.split("@")[0].replace(".", "/"))
        console.log(nomPrenom);
        history.push(`/collaborateur/${nomPrenom}`)
    }

    return (
        <div>
            <Container>
                <Header as='h1' textAlign='center'>Liste des nouveaux collaborateurs</Header>
                <Grid>
                    <div className='autoCompletTitre'>Adresse e-mail du responsable </div>
                    <Dropdown
                        onChange={handleChange}
                        placeholder='Collaborateur'
                        fluid
                        search
                        options={dataCollaborateurs}
                        value
                    />
                </Grid>
                <Button onClick={buttonRedirect}>DIRECTION</Button>
            </Container>
        </div>
    )
}


{/* <BUTTON><Link to={`/collaborateur/${item.prenom}/${item.nom}`}>{item.prenom}</Link></BUTTON> */ }