import React, { useState, setError, useEffect } from 'react'
import axios from 'axios'
import Collaborateur from './documentCollaborateur'
import RH from './inputRH'

import {
    BrowserRouter as Router,
    Link,
    useParams

} from "react-router-dom";

import { Icon, Form, Container, Grid, Segment, Button, Message, Image, Label } from 'semantic-ui-react'


export default function Presentation(props) {
    const [informations, setInformations] = useState({
        _id: "",
        prenom: "",
        nom: "",
        genre: "",
        nomnaissance: "",
        datenaissance: "",
        villedenaissance: "",
        nationalite: "",
        numerosecurite: "",
        ville: '',
        addresse: "",
        cp: "",
        email: '',
        telephonePerso: '',
        telephoneDomicile: '',
        telephoneUrgence: '',
        rpps: '',
        numeroDepartemental: '',
        departementConseil: '',
        specialitePratiquee: '',
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
        aptitudeMedical: "",
        assuranceHabitation: "",
        contratsTravailCours: "",
        lettreMotivation: '',
        carteSejour: '',
        casierJudiciaire: '',
    })

    const [message, setMessage] = useState('')
    const [error, setError] = useState({})
    let { prenom, nom } = useParams();
    // use Params permet de ajouter un ou plusieurs paramettres dans l'url
    // Post pour recuperer le prenom et nom et l'afficher dans l'url 
    useEffect(() => {
        const callInfo = async () => {
            try {
                const result = await axios.post(`http://localhost:3000/userCollaborateur/`, { prenom, nom })
                setInformations(result.data)
            } catch (error) {
                console.log("error");
            }
        }
        callInfo()
    }, [])

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
        data.append('nomnaissance', informations.nomnaissance)
        data.append('datenaissance', informations.datenaissance)
        data.append('villedenaissance', informations.villedenaissance)
        data.append('nationalite', informations.nationalite)
        data.append('numerosecurite', informations.numerosecurite)
        data.append('addresse', informations.addresse)
        data.append('ville', informations.ville)
        data.append('cp', informations.cp)
        data.append('email', informations.email)
        data.append('telephonePerso', informations.telephonePerso)
        data.append('telephoneDomicile', informations.telephoneDomicile)
        data.append('telephoneUrgence', informations.telephoneUrgence)
        data.append('rpps', informations.rpps)
        data.append('numeroDepartemental', informations.numeroDepartemental)
        data.append('departementConseil', informations.departementConseil)
        data.append('specialitePratiquee', informations.specialitePratiquee)
        {/* state component 'documentCollaborteur'*/ }
        data.append('carnetvaccination', informations.carnetVaccination)
        data.append('carteIdentitePassport', informations.carteIdentitePassport)
        data.append('carteVital', informations.carteVital)
        data.append('CV', informations.CV)
        data.append('permisConduire', informations.permisConduire)
        data.append('assuranceAutomobile', informations.assuranceAutomobile)
        data.append('photo', informations.photo)
        data.append('RIB', informations.RIB)
        data.append('aptitudemédicale', informations.aptitudeMedical)
        data.append('attestationassurancehabitation', informations.assuranceHabitation)
        data.append('contratstravailcours', informations.contratsTravailCours)
        data.append('lettremotivation', informations.lettreMotivation)
        data.append('cartesejour', informations.carteSejour)
        data.append('casierjudiciaire', informations.casierJudiciaire)
        data.append('conseildelordre', informations.conseildelordre)
        data.append('ONCD', informations.ONCD)
        data.append('ADLI', informations.adli)
        data.append('diplomes', informations.diplômes)
        data.append('diplomescollaborateurs', informations.diplômescollaborateurs)
        data.append('RCP', informations.RCP)
        data.append('radioprotectionpatients', informations.Radioprotectionpatients)
        data.append('radioprotectiontravailleurs', informations.Radioprotectiontravailleurs)
        try {
            const response = await axios({
                method: 'post',
                url: `http://localhost:3000/uploadCollaborateur/${informations._id}`, //recuperation de id pour envoyer dans le back permet de faire des mofications de collaborateur//
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
            <Image src='/Embarquer.png' size='huge' centered='true' />
            {message ? <Message positive>
                <Message.Header>Donnée enregistrer</Message.Header>
            </Message> : null}

            <Grid columns={2}>
                <Grid.Row>
                    <Label circular size='massive'>1</Label>
                    <h3>Informations à remplir par le collaborateur (5/40)</h3>
                </Grid.Row>
            </Grid>

            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid name='prenom' value={informations.prenom} onChange={handleChange} label='Prénom' placeholder='Prénom' />
                        <br />
                        <Form.Input fluid value={informations.name} name='datenaissance' onChange={handleChange} label='Date de naissance' placeholder='Date de naissance' />
                        <br />
                        <Form.Input fluid name='addresse' value={informations.addresse} onChange={handleChange} label='Addresse' placeholder='Addresse' />
                        <br />
                        <Form.Input fluid name='email' value={informations.email} onChange={handleChange} label='Email (personnel)' placeholder='Email (personnel)' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='nom' value={informations.nom} onChange={handleChange} label='Nom' placeholder='Nom' />
                        <br />
                        <Form.Input fluid value={informations.villedenaissance} name='villedenaissance' onChange={handleChange} label='Ville de naissance' placeholder='Ville de naissance' />
                        <br />
                        <Form.Input fluid name='cp' value={informations.cp} onChange={handleChange} label='Code postal' placeholder='Code postal' />
                        <br />
                        <Form.Input fluid name='numerosecurite' value={informations.numerosecurite} onChange={handleChange} label='N° sécurite social' placeholder='N° sécurite social' />
                    </Grid.Column>
                    <Grid.Column>
                        Genre
                        <Form.Radio
                            fluid
                            name="genre"
                            label='Homme'
                            value={informations.genre}
                            checked={informations.genre === 'homme'}
                            onChange={handleChange}
                        />
                        <Form.Radio
                            fluid
                            name="genre"
                            label='Femme'
                            value={informations.genre}
                            checked={informations.genre === 'femme'}
                            onChange={handleChange}
                        />
                        <br />
                        <Form.Input fluid name='nomnaissance' value={informations.nomnaissance} onChange={handleChange} label='Nom de naissance' placeholder='Nom de naissance' />
                        <br />
                        <Form.Input fluid name='ville' onChange={handleChange} value={informations.ville} label='Ville' placeholder='Ville' />
                        <br />
                        <Form.Input fluid name='nationalite' onChange={handleChange} value={informations.nationalite} label='Nationalité' placeholder='Nationalité' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={3} >
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid name='telephonePerso' value={informations.telephonePerso} onChange={handleChange} label='Téléphone portable (personnel)' placeholder='Téléphone portable (personnel)' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='telephoneDomicile' value={informations.telephoneDomicile} onChange={handleChange} label='Téléphone domicile' placeholder='Téléphone domicile' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='telephoneUrgence' value={informations.telephoneUrgence} onChange={handleChange} label="Téléphone à appeler en cas d'urgence" placeholder="Téléphone à appeler en cas d'urgence" />
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form>
                <br />
                <Segment className='segmentPerso' size='small'>Réservé aux praticiens</Segment>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input fluid name='rpps' onChange={handleChange} value={informations.rpps} label='N° RPPS' placeholder='N° RPPS' />
                            <Form.Input fluid name='numeroDepartemental' value={informations.numeroDepartemental} onChange={handleChange} label='N° Départemental Conseil de l’Ordre' placeholder='N° Départemental Conseil de l’Ordre' />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input fluid name='departementConseil' value={informations.departementConseil} onChange={handleChange} label='Département Conseil de l’Ordre' placeholder='Département Conseil de l’Ordre' />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input fluid name='specialitePratiquee' value={informations.specialitePratiquee} onChange={handleChange} label='Spécialité pratiquée au centre' placeholder='Spécialité pratiquée au centre' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <br />
                <br />
                <Form.Group>
                    {/* COMPONENT 'DocumentCollaborateur' */}
                    <Collaborateur handleChangeFile={handleChangeFile} />
                </Form.Group>
                <Button primary onClick={sendData}>Enregistrer les données</Button>
            </Form>
            <RH />
        </Container >
    )
}
