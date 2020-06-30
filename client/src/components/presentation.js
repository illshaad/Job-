import React, { useState, setError } from 'react'
import axios from 'axios'
import Informations from './informations'
import { Icon } from 'semantic-ui-react'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

import { Form, Container, Grid, Segment, Button, Message, Header } from 'semantic-ui-react'

export default function Presentation() {
    const [informations, setInformations] = useState({
        prenom: "",
        nom: "",
        genre: "",
        datenaissance: "",
        lieunaissance: "",
        nationalité: "",
        numerosecurite: "",
        addresse: "",
        cp: "",
        email: '',
        tel: '',
        rpps: '',
        numerodepartementalconseil: '',
        departementconseil: '',
        specialitepratiquee: '',
        carnetVaccination: "",
        carteIdentitePassport: "",
        carteVital: "",
        CV: "",
        permisConduire: "",
        assuranceAutomobile: "",
        photo: "",
        RIB: "",
        conseildelordre: "",
        ONCD: "",
        diplômes: "",
        RCP: "",
        Radioprotectionpatients: "",
        Radioprotectiontravailleurs: "",

    })

    const [message, setMessage] = useState('')
    const [error, setError] = useState({})


    const handleChange = (e, { value, name }) => setInformations({ ...informations, [e.target.name || name]: value })

    const handleChangeFile = (e) => {
        // le regex N°securite Social//
        if (e.target.value !== "#^[12][0-9]{2}[0-1][0-9](2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}[0-9]{2}$#") {
            setInformations({ ...informations, [e.target.name]: e.target.files[0] })
        } else {
            setInformations({ ...informations, [e.target.name]: e.target.files[0] })
        }
        if (e.target.name === "cp" && e.target.value.match("/^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/") != null) {
            setInformations({ ...informations, [e.target.name]: e.target.files[0] })
        } else {
            setInformations({ ...informations, [e.target.name]: e.target.files[0] })
        }
    }

    const sendData = async () => {
        const data = new FormData()
        data.append('prenom', informations.prenom)
        data.append('nom', informations.nom)
        data.append('genre', informations.genre)
        data.append('datenaissance', informations.datenaissance)
        data.append('lieunaissance', informations.lieunaissance)
        data.append('nationalite', informations.nationalité)
        data.append('numerosecurite', informations.numerosecurite)
        data.append('addresse', informations.addresse)
        data.append('cp', informations.cp)
        data.append('email', informations.email)
        data.append('tel', informations.tel)
        data.append('rpps', informations.rpps)
        data.append('numerodepartementalconseil', informations.numerodepartementalconseil)
        data.append('departementdepartementconseil', informations.departementconseil)
        data.append('specialitespecialitepratiquee', informations.specialitepratiquee)
        data.append('carnetVaccination', informations.carnetVaccination)
        data.append('carteIdentitePassport', informations.carteIdentitePassport)
        data.append('carteVital', informations.carteVital)
        data.append('CV', informations.CV)
        data.append('permisConduire', informations.permisConduire)
        data.append('assuranceAutomobile', informations.assuranceAutomobile)
        data.append('photo', informations.photo)
        data.append('RIB', informations.RIB)
        data.append('conseildelordre', informations.conseildelordre)
        data.append('ONCD', informations.ONCD)
        data.append('diplomes', informations.diplômes)
        data.append('RCP', informations.RCP)
        data.append('Radioprotectionpatients', informations.Radioprotectionpatients)
        data.append('Radioprotectiontravailleurs', informations.Radioprotectiontravailleurs)
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/upload',
                data: data
            })
            setMessage('Donnée enregistrer')
        } catch (error) {
            console.log("Error", error.response.data.errors)
            setError(error.response.data.errors);
        }
    }

    return (
        <Container>
            <br />
            {Object.keys(error).map((e) => (
                <p>{error[e]}</p>
            ))}
            <Link to='/'><Icon name='arrow left' size='large'></Icon></Link>
            <Header as='h1' textAlign='center'>Renseigner les informations d'un futur collaborateur</Header>
            <Header as='h4' textAlign='center'>Vous allez renjoindre le groupe Doctegestio, pour préparer au mieux votre intégration merci de renseigner le formulaire ci-dessous.</Header>
            {message ? <Message positive>
                <Message.Header>Donnée enregistrer</Message.Header>
            </Message> : null}
            <br />
            <Segment className='principal' textAlign='center'>1°) Informations personnelles </Segment>
            <br />
            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid type='text' name='prenom' onChange={handleChange} label='Prenom' placeholder='Prenom' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid type='text' name='nom' onChange={handleChange} label='Nom' placeholder='Nom' />
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
                    <Grid.Column>
                        <Form.Input fluid type='date' name='datenaissance' onChange={handleChange} label='Date de naissance' placeholder='Date de naissance' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='lieunaissance' onChange={handleChange} label='Lieu de naissance' placeholder='Lieu de naissance' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid type='text' name='nationalité' onChange={handleChange} label='Nationalité' placeholder='Nationalité' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='numerosecurite' onChange={handleChange} label='N°securite social' placeholder='n°securite social' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='addresse' onChange={handleChange} label='Addresse' placeholder='Addresse' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='cp' onChange={handleChange} label='Code postal' placeholder='Code postal' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='email' onChange={handleChange} label='Email' placeholder='Email' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='tel' onChange={handleChange} label='Téléphone' placeholder='Téléphone' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form>
                <br />

                <Segment textAlign='center'>Réservé aux praticiens</Segment>

                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input fluid name='rpps' onChange={handleChange} label='N° RPPS' placeholder='N° RPPS' />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input fluid name='numerodepartementalconseil' onChange={handleChange} label='N° Départemental Conseil de l’Ordre' placeholder='N° Départemental Conseil de l’Ordre' />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input fluid name='departementconseil' onChange={handleChange} label='Département Conseil de l’Ordre' placeholder='Département Conseil de l’Ordre' />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input fluid name='specialitepratiquee' onChange={handleChange} label='Spécialité pratiquée au centre' placeholder='Spécialité pratiquée au centre' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <br />
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
