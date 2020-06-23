import React, { useState, setError } from 'react'
import axios from 'axios'
import AutocompletCorrespondant from './Autocomplet'
import Informations from './informations'
import { Form, Container, Grid, Segment, Button, Message } from 'semantic-ui-react'

export default function Presentation() {
    const [informations, setInformations] = useState({
        prenom: "",
        nom: "",
        genre: "",
        operateur: "",
        correspondant: "",
        carnetVaccination: "",
        carteIdentitePassport: "",
        carteVital: "",
        CV: "",
        permisConduire: "",
        assuranceAutomobile: "",
        photo: "",
        RIB: "",
    })

    const [message, setMessage] = useState('')


    const handleChange = (e, { value, name }) => setInformations({ ...informations, [e.target.name || name]: value })

    const handleChangeFile = (e) => {
        setInformations({ ...informations, [e.target.name]: e.target.files[0] })
    }

    const sendData = () => {
        const data = new FormData()
        data.append('prenom', informations.prenom)
        data.append('nom', informations.nom)
        data.append('genre', informations.genre)
        data.append('operateur', informations.operateur)
        data.append('correspondant', informations.correspondant)
        data.append('carnetVaccination', informations.carnetVaccination)
        data.append('carteIdentitePassport', informations.carteIdentitePassport)
        data.append('carteVital', informations.carteVital)
        data.append('CV', informations.CV)
        data.append('permisConduire', informations.permisConduire)
        data.append('assuranceAutomobile', informations.assuranceAutomobile)
        data.append('photo', informations.photo)
        data.append('RIB', informations.RIB)
        try {
            axios({
                method: 'post',
                url: 'http://localhost:3000/upload',
                data: data
            }).then(function (reponse) {
                setMessage('Donnée enregistrer')
            })
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    }

    return (
        <Container>
            {message ? <Message positive>
                <Message.Header>Donnée enregistrer</Message.Header>
            </Message> : null}
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
            <Button primary onClick={sendData}>Enregistrer</Button>
        </Container >

    )
}
