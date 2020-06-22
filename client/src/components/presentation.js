import React, { useState, useEffect } from 'react'
import AutocompletCorrespondant from './Autocomplet'
import Informations from './informations'
import { Form, Container, Grid, Segment, Button } from 'semantic-ui-react'

export default function Presentation() {
    const [informations, setInformations] = useState({
        prenom: "",
        nom: "",
        genre: "",
        operateur: "",
        carnetVaccination: "",
        carteIdentitePassport: "",
        carteVital: "",
        CV: "",
        permisConduire: "",
        assuranceAutomobile: "",
        photo: "",
        RIB: "",
        correspondant: ""
    })


    const handleChange = (e, { value, name }) => setInformations({ ...informations, [e.target.name || name]: value })

    const handleChangeFile = (e) => {
        setInformations({ ...informations, [e.target.name]: e.target.files[0] })
    }

    const sendData = () => {
        const data = new FormData()
        data.append('file', informations)
    }


    return (
        <Container>
            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid name='prenom' onChange={handleChange} label='Prenom' placeholder='Prenom' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='nom' onChange={handleChange} label='Nom' placeholder='Nom' />
                    </Grid.Column>
                    <Grid.Column>
                        Genre
                        <Form.Radio
                            name="genre"
                            label='Homme'
                            value='homme'
                            checked={informations.genre === 'homme'}
                            onChange={handleChange}
                        />
                        <Form.Radio
                            name="genre"
                            label='Femme'
                            value='femme'
                            checked={informations.genre === 'femme'}
                            onChange={handleChange}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form>
                <br />
                <Segment textAlign='center'>Les Opérateurs & N+1</Segment>
                <Form.Group inline>
                    <Form.Radio
                        name="operateur"
                        label='Doctegestio'
                        value='doctegestio'
                        checked={informations.operateur === 'doctegestio'}
                        onChange={handleChange}
                    />
                    <Form.Radio
                        name="operateur"
                        label='Doctocare'
                        value='doctocare'
                        checked={informations.operateur === 'doctocare'}
                        onChange={handleChange}
                    />
                    <Form.Radio
                        name="operateur"
                        label='Amapa'
                        value='amapa'
                        checked={informations.operateur === 'amapa'}
                        onChange={handleChange}
                    />
                    <Form.Radio
                        name="operateur"
                        label='Poppins'
                        value='poppins'
                        checked={informations.operateur === 'poppins'}
                        onChange={handleChange}
                    />
                    <AutocompletCorrespondant handleChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Informations handleChangeFile={handleChangeFile} />
                </Form.Group>
                <Form.Group >
                </Form.Group>
            </Form>
            <Button primary>Enregistrer</Button>
        </Container >

    )
}
