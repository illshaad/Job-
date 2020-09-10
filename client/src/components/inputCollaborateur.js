import React, { useState, setError, useEffect } from 'react'
import axios from 'axios'
import InputImageGenerique from './InputImageGenerique';
import InputRH from './inputRH'

import {
    BrowserRouter as Router,
    Link,
    useParams,
} from "react-router-dom";

import { Menu, Icon, Form, Container, Grid, Segment, Button, Message, Image, Label, GridColumn, GridRow, } from 'semantic-ui-react'



export default function Presentation() {
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
        ville: "",
        addresse: "",
        cp: "",
        email: "",
        telephonePerso: "",
        telephoneDomicile: "",
        telephoneUrgence: "",
        rpps: "",
        numeroDepartemental: "",
        departementConseil: "",
        specialitePratiquee: "",
        carnetVaccination: "",
        carteIdentitePassport: "",
        carteVital: "",
        cv: "",
        permisConduire: "",
        assuranceAutomobile: "",
        photo: "",
        RIB: "",
        conseildelordre: "",
        ONCD: "",
        diplomes: "",
        diplomesRh: "",
        RCP: "",
        radioProtectionPatients: "",
        radioProtectionTravailleurs: "",
        matériels: "",
        déclaration: "",
        fichedeposte: "",
        fichesynthetique: "",
        avantagesennature: "",
        mutuelle: "",
        onboarding: "",
        adli: "",
        aptitudeMedicale: "",
        attestationAssuranceHabitation: "",
        autreContratsTravailCours: "",
        lettreMotivation: "",
        carteSejour: "",
        casierJudiciaire: "",
    })
    const [message, setMessage] = useState('')
    const [error, setError] = useState({})
    const [collabo, setCollabo] = useState({})
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

    axios.post("http://localhost:3000/gestionPerso", { email: localStorage.getItem("name") })
        .then(response => {
            setCollabo(response.data.isCollabo)
        })


    const handleChange = (e, { value, name }) => setInformations({ ...informations, [e.target.name || name]: value })

    const handleChangeFile = (e) => {
        // console.log("value de l'input", e.target.files)
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
        data.append('carnetVaccination', informations.carnetVaccination)
        data.append('carteIdentitePassport', informations.carteIdentitePassport)
        data.append('carteVital', informations.carteVital)
        data.append('cv', informations.cv)
        data.append('permisConduire', informations.permisConduire)
        data.append('assuranceAutomobile', informations.assuranceAutomobile)
        data.append('photo', informations.photo)
        data.append('RIB', informations.RIB)
        data.append('aptitudeMedicale', informations.aptitudeMedicale)
        data.append('attestationAssuranceHabitation', informations.attestationAssuranceHabitation)
        data.append('autreContratsTravailCours', informations.autreContratsTravailCours)
        data.append('lettreMotivation', informations.lettreMotivation)
        data.append('carteSejour', informations.carteSejour)
        data.append('casierJudiciaire', informations.casierJudiciaire)
        data.append('conseildelordre', informations.conseildelordre)
        data.append('ONCD', informations.ONCD)
        data.append('ADLI', informations.adli)// A VOIR AVEC FLORIANT//
        data.append('diplomes', informations.diplomes)
        data.append('diplomesRh', informations.diplomesRh)
        data.append('RCP', informations.RCP)
        data.append('radioProtectionPatients', informations.radioProtectionPatients)
        data.append('radioProtectionTravailleurs', informations.radioProtectionTravailleurs)
        try {
            const response = await axios({
                method: 'post',
                url: `http://localhost:3000/uploadCollaborateur/${informations._id}`, //recuperation de id pour envoyer dans le back permet de faire des mofications de collaborateur//
                data: data,
            })
            setInformations(response.data)
            setMessage('Donnée enregistrer')
        } catch (error) {
            console.log("Error", error.response.data.errors)
            setError(error.response.data.errors);
        }

        // 1°)Recuperation des fichiers uplods ici 
        //Envoie une requet à mon micro api email du localStorage et les photos //
        // axios.post("http://localhost:000/api", { email: localStorage.getItem("name") })
        //     .then(response => {
        //         console.log(response);
        //     })
    }
    return (
        <Container>
            {/* Si je suis collaborateur je n'ai pas accés à la partie des RH  */}
            {collabo !== true ?
                null
                : <Menu icon='labeled' vertical>
                    <Menu.Item>
                        <Link to='/rh'><Icon name='table' size='large'></Icon></Link>
                    </Menu.Item>
                </Menu>
            }
            <Image src='/Embarquer.png' size='huge' centered='true' />
            <Grid columns={2}>
                <Grid.Row>
                    <Label circular size='massive'>1</Label>
                    <h3>Informations à remplir par le collaborateur (5/15)</h3>
                </Grid.Row>
            </Grid>

            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <b>Prenom</b>
                        <Form.Input fluid name='prenom' value={informations.prenom} onChange={handleChange} placeholder='Prénom' />
                        <br />
                        <Form.Input fluid name='datenaissance' value={informations.name} onChange={handleChange} label='Date de naissance' placeholder='Date de naissance' />
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
                <Segment className='segmentPerso' size='small'>Réservé aux praticiens (1/4)</Segment>
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
                <h3>Documents à fournir par le collaborateur (10/15)</h3>
                <Grid columns={3} divided>
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Carte national ou passport' handleChangeFile={handleChangeFile} name={"carteIdentitePassport"} />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Carte Vital' handleChangeFile={handleChangeFile} name="carteVital" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='CV' handleChangeFile={handleChangeFile} name="cv" />
                </Grid>
                <Grid columns={3} divided>
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Carnet Vaccinal' handleChangeFile={handleChangeFile} name="carnetVaccination" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Diplômes' handleChangeFile={handleChangeFile} name="diplomes" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Photo' handleChangeFile={handleChangeFile} name="photo" />
                </Grid>
                <Grid columns={3} divided>
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='RIB' handleChangeFile={handleChangeFile} name="RIB" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Aptitude médicale au travail' handleChangeFile={handleChangeFile} name="aptitudeMedicale" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='permisConduire' handleChangeFile={handleChangeFile} name="permisConduire" />
                </Grid>
                <Grid columns={3} divided>
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Assurance automobile' handleChangeFile={handleChangeFile} name="assuranceAutomobile" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Attestation assurance habitation' handleChangeFile={handleChangeFile} name="attestationAssuranceHabitation" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Autres contrats de travail en cours' handleChangeFile={handleChangeFile} name="autreContratsTravailCours" />

                </Grid>
                <Grid columns={3} divided>
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Lettre de motivation' handleChangeFile={handleChangeFile} name="lettreMotivation" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Carte de séjour' handleChangeFile={handleChangeFile} name="carteSejour" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Extrait de casier judiciaire ' handleChangeFile={handleChangeFile} name="casierJudiciaire" />
                </Grid>
                <Segment className='segmentPerso' size='small'>Réservé aux praticiens (3/5)</Segment>
                <Grid columns={3} divided>
                    <InputImageGenerique informations={informations} setInformations={setInformations} title="Attestion d'assurance RCP" handleChangeFile={handleChangeFile} name="RCP" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title="ONCD" handleChangeFile={handleChangeFile} name="ONCD" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title="Attestation d’inscription au tableau du conseil de l’Ordre" handleChangeFile={handleChangeFile} name="conseildelordre" />
                </Grid>
                <Grid columns={3} divided>
                    <InputImageGenerique informations={informations} setInformations={setInformations} title='Diplômes' handleChangeFile={handleChangeFile} name="diplomesRh" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title="Attestation de formation à la Radioprotection patients" handleChangeFile={handleChangeFile} name="radioProtectionPatients" />
                    <InputImageGenerique informations={informations} setInformations={setInformations} title="Attestation de formation à la Radioprotection travailleurs" handleChangeFile={handleChangeFile} name="radioProtectionTravailleurs" />
                </Grid>
                {collabo !== true ? <Button primary onClick={sendData}>Enregistrer les données</Button> : null}
            </Form>
            {/* je passe le props  disable et la condition au composant RH (SI collaborateur n'est pas RH je lui donne pas les droits au composant RH) */}
            <InputRH id={informations._id} informationsRH={informations} disable={collabo !== true} />
            {message ? <Message positive>
                <Message.Header>Donnée enregistrer</Message.Header>
            </Message> : null}
        </Container >
    )
}
