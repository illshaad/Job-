import React, { useState, setError } from 'react'
import axios from 'axios'
import Informations from './informations'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

import { Icon, Form, Container, Grid, Segment, Button, Message, Header, Label } from 'semantic-ui-react'
import AutocompletEmailResponsable from './autocomplet/emailResponsable'
import AutocompletEtablissement from './autocomplet/etablissement';
import AutocompletCollaborateur from './autocomplet/typeCollaborateur'
import AutocompletActivité from './autocomplet/activite'
import AutocompletFonctionDigital from './autocomplet/fonctionDigital';
import AutocompletJuridique from './autocomplet/juridique';
import RelationTravail from './menuDeroulant/natureTravail'
import TempsTravail from './menuDeroulant/tempsTravail'
import Convention from './menuDeroulant/convention'
import ERP from './menuDeroulant/erp'

export default function Presentation() {
    const [informations, setInformations] = useState({
        prenom: "",
        nom: "",
        genre: "",
        datenaissance: "",
        lieunaissance: "",
        nationalité: "",
        numerosecurite: "",
        ville: '',
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
        diplômescollaborateurs: "",
        RCP: "",
        Radioprotectionpatients: "",
        Radioprotectiontravailleurs: "",
        matériels: "",
        contrat: "",
        déclaration: "",
        fichedeposte: "",
        fichesynthetique: "",
        avantagesennature: "",
        mutuelle: "",
        onboarding: "",
        adli: "",






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
        data.append('ville', informations.ville)
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
        data.append('diplomescollaborateurs', informations.diplômescollaborateurs)
        data.append('RCP', informations.RCP)
        data.append('Radioprotectionpatients', informations.Radioprotectionpatients)
        data.append('Radioprotectiontravailleurs', informations.Radioprotectiontravailleurs)
        data.append('matériels', informations.matériels)
        data.append('contrat', informations.contrat)
        data.append('déclaration', informations.déclaration)
        data.append('fichedeposte', informations.fichedeposte)
        data.append('fichesynthetique', informations.fichesynthetique)
        data.append('avantagesennature', informations.avantagesennature)
        data.append('mutuelle', informations.mutuelle)
        data.append('onboarding', informations.onboarding)
        data.append('adli', informations.adli)

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
            <Header as='h1' textAlign='center'>Renseigner les informations d'un nouveau collaborateur</Header>
            <Header as='h4' textAlign='center'>Vous allez renjoindre le groupe Doctegestio, pour préparer au mieux votre intégration merci de renseigner le formulaire ci-dessous.</Header>
            {message ? <Message positive>
                <Message.Header>Donnée enregistrer</Message.Header>
            </Message> : null}

            <Grid columns={2}>
                <Grid.Row>
                    <Label circular color='blue' size='massive'>1</Label>
                    <h3>Informations personnelles (5/40)</h3>
                </Grid.Row>
            </Grid>

            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid type='text' name='prenom' onChange={handleChange} label='Prénom' placeholder='Prénom' />
                        <br />
                        <Form.Input fluid type='text' name='nom' onChange={handleChange} label='Nom' placeholder='Nom' />
                        <br />
                        Genre
                        <Form.Radio
                            fluid
                            name="genre"
                            label='Homme'
                            value='homme'
                            checked={informations.genre === 'homme'}
                            onChange={handleChange}
                        />
                        <Form.Radio
                            fluid
                            name="genre"
                            label='Femme'
                            value='femme'
                            checked={informations.genre === 'femme'}
                            onChange={handleChange}
                        />
                    </Grid.Column>
                    <Grid.Column>

                        <Form.Input fluid type='date' name='datenaissance' onChange={handleChange} label='Date de naissance' placeholder='Date de naissance' />
                        <br />
                        <Form.Input fluid name='lieunaissance' onChange={handleChange} label='Ville de naissance' placeholder='Ville de naissance' />
                        <br />
                        <Form.Input fluid type='text' name='nationalité' onChange={handleChange} label='Nationalité' placeholder='Nationalité' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='ville' onChange={handleChange} label='Ville' placeholder='Ville' />
                        <br />
                        <Form.Input fluid name='addresse' onChange={handleChange} label='Addresse' placeholder='Addresse' />
                        <br />
                        <Form.Input fluid name='cp' onChange={handleChange} label='Code postal' placeholder='Code postal' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid columns={3} >
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid name='email' onChange={handleChange} label='Email' placeholder='Email' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='tel' onChange={handleChange} label='Téléphone' placeholder='Téléphone' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='numerosecurite' onChange={handleChange} label='N° sécurite social' placeholder='N° sécurite social' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form>
                <br />
                <Segment className='segmentPerso' size='small'>Réservé aux praticiens</Segment>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input fluid name='rpps' onChange={handleChange} label='N° RPPS' placeholder='N° RPPS' />
                            <Form.Input fluid name='numerodepartementalconseil' onChange={handleChange} label='N° Départemental Conseil de l’Ordre' placeholder='N° Départemental Conseil de l’Ordre' />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input fluid name='departementconseil' onChange={handleChange} label='Département Conseil de l’Ordre' placeholder='Département Conseil de l’Ordre' />
                            <Form.Input fluid name='specialitepratiquee' onChange={handleChange} label='Spécialité pratiquée au centre' placeholder='Spécialité pratiquée au centre' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <br />
                <Segment className='segmentPerso' size='small'>A remplir par les RH</Segment>
                <br />
                <br />
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <AutocompletCollaborateur handleChange={handleChange} />
                            <AutocompletEmailResponsable handleChange={handleChange} />
                            <AutocompletActivité handleChange={handleChange} />
                        </Grid.Column>
                        <Grid.Column>
                            <AutocompletFonctionDigital handleChange={handleChange} />
                            <Form.Input fluid name='fonction(s)digitale(s)secondaire(s)' onChange={handleChange} label='Fonction(s) digitale(s) secondaire(s)' placeholder='Fonction(s) digitale(s) secondaire(s)' />
                            <AutocompletJuridique handleChange={handleChange} />
                        </Grid.Column>
                        <Grid.Column>
                            <AutocompletEtablissement handleChange={handleChange} />
                            <Form.Input fluid type='date' name=' datedeprisedefonction' onChange={handleChange} label='Date de prise de fonction' placeholder='Date de prise de fonction' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input fluid name='téléphone(travail)' onChange={handleChange} label='Téléphone (Travail)' placeholder='Téléphone (Travail)' />
                            <Form.Input fluid name='téléphone(mobile)' onChange={handleChange} label='Téléphone (Mobile)' placeholder='Téléphone (Mobile)' />
                            <Form.Input fluid name='adresse(travail)' onChange={handleChange} label='Adresse (Travail)' placeholder='Adresse (Travail)' />
                        </Grid.Column>
                        <Grid.Column>
                            <RelationTravail onChange={handleChange} />
                            <TempsTravail onChange={handleChange} />
                            <Convention onChange={handleChange} />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input fluid name='classification' onChange={handleChange} label='Classification' placeholder='Classification' />
                            <Form.Input fluid name='niveau' onChange={handleChange} label='Niveau' placeholder='Niveau' />
                            <Form.Input fluid name='coefficient' onChange={handleChange} label='Coefficient' placeholder='Coefficient' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input fluid name='indice' onChange={handleChange} label='Indice' placeholder='Indice' />
                            <Form.Input fluid name='rémunérationbrutemensuelle' onChange={handleChange} label='Rémunération brute mensuelle' placeholder='Rémunération brute mensuelle' />
                            <Form.Input fluid name='rémunérationbrutejournalière' onChange={handleChange} label='Rémunération brute journalière' placeholder='Rémunération brute journalière' />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input fluid name='rémunérationbruteannuelle' onChange={handleChange} label='Rémunération brute annuelle' placeholder='Rémunération brute annuelle' />
                            <Form.Input fluid name='rémunérationbrutehoraire' onChange={handleChange} label='Rémunération brute horaire' placeholder='Rémunération brute horaire' />
                            <Form.Input fluid name='Nombreheureshebdomadairedusalarié' onChange={handleChange} label="Nombre d'heures hebdomadaire du salarié" placeholder="Nombre d'heures hebdomadaire du salarié" />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input fluid name='Nombreheuresmensueldusalarié' onChange={handleChange} label="Nombre d'heures mensuel du salarié" placeholder="Nombre d'heures mensuel du salarié" />
                            <ERP onChange={handleChange} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
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