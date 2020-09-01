import React, { useState } from 'react'
import { Grid, Container, Form, Label, Button } from 'semantic-ui-react'
import DocumentRH from './documentRH' // COMPONENT UPLOAD FILE RH
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
import axios from 'axios'

export default function InputRh({ disable, informationsRH }) {
    const [informations, setInformations] = useState({
        _id: "",
        matériels: "",
        contrat: "",
        déclaration: "",
        fichedeposte: "",
        fichesynthetique: "",
        avantagesennature: "",
        mutuelle: "",
        onboarding: "",
        fonctiondigitalsecondaire: "",
        datedeprisedefonction: "",
        telephonetravail: "",
        telephonemobile: "",
        adressetravail: "",
        classification: "",
        niveau: "",
        coefficient: "",
        indice: "",
        rémunérationbrutemensuelle: "",
        rémunérationbrutejournalière: "",
        rémunérationbruteannuelle: "",
        rémunérationbrutehoraire: "",
        nombreheureshebdomadairedusalarie: "",
        nombreheuresmensueldusalarié: "",
        /* COMPONENT 'autocomplet' */
        activite: "",
        emailresponsable: "",
        etablissement: "",
        juridique: "",
        collaborateur: "",
        fonctiondigital: "",
        /* COMPONENT 'menuderoulant' */
        convention: "",
        erp: "",
        naturetravail: "",
        tempstravail: ""
    })
    // console.log(informationsRH, ' PROPS ICI');

    const [message, setMessage] = useState('')
    const [error, setError] = useState({})

    const handleChange = (e, { value, name }) => {
        console.log(e, value, name)
        setInformations({ ...informations, [e.target.name || name]: value })
    }

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

    const sendDataRH = async () => {
        //Url est une route dynamique avec ID //
        try {
            //Fusionner les deux states des deux composants//
            const object = Object.assign(informations, informationsRH);
            const response = await axios({
                method: 'post',
                url: `http://localhost:5000/userCollaborateurRh/${informationsRH._id}`,
                data: object
            })
            setMessage('Donnée enregistrer')
        } catch (error) {
            console.log("Error", error.response.data.errors)
            setError(error.response.data.errors);
        }
    }
    return (
        <Container>
            <Grid columns={2}>
                <Grid.Row>
                    <Label circular size='massive'>2</Label>
                    <h3>Informations à remplir par gestionpersonnel</h3>
                </Grid.Row>
            </Grid>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        {/* COMPONENT 'Collaborateur' */}
                        <AutocompletCollaborateur handleChange={handleChange} value={'test'} disable={disable} />
                        {/* COMPONENT 'EmailResponsable' */}
                        <AutocompletEmailResponsable handleChange={handleChange} value={'test'} disable={disable} />
                        {/* COMPONENT 'Activite' */}
                        <AutocompletActivité handleChange={handleChange} disable={disable} />
                    </Grid.Column>
                    <Grid.Column>
                        {/* COMPONENT 'FonctionDigital' */}
                        <AutocompletFonctionDigital handleChange={handleChange} disable={disable} />
                        {/* COMPONENT 'Etablissement' */}
                        <AutocompletEtablissement handleChange={handleChange} disable={disable} />
                        {/* COMPONENT 'Juridique' */}
                        <AutocompletJuridique handleChange={handleChange} disable={disable} />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='fonction(s)digitale(s)secondaire(s)' value={informations.fonctiondigitalsecondaire} onChange={handleChange} label='Fonction(s) digitale(s) secondaire(s)' placeholder='Fonction(s) digitale(s) secondaire(s)' disabled={disable} />
                        <br />
                        <Form.Input fluid type='date' name=' datedeprisedefonction' value={informations.datedeprisedefonction} onChange={handleChange} label='Date de prise de fonction' placeholder='Date de prise de fonction' disabled={disable} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid name='téléphone(travail)' value={informationsRH.telephonetravail} onChange={handleChange} label='Téléphone (Travail)' placeholder='Téléphone (Travail)' disabled={disable} />
                        <br />
                        <Form.Input fluid name='téléphone(mobile)' value={informationsRH.telephonemobile} onChange={handleChange} label='Téléphone (Mobile)' placeholder='Téléphone (Mobile)' disabled={disable} />
                        <br />
                        <Form.Input fluid name='adresse(travail)' value={informationsRH.adressetravail} onChange={handleChange} label='Adresse (Travail)' placeholder='Adresse (Travail)' disabled={disable} />
                        <br />
                    </Grid.Column>
                    <Grid.Column>
                        {/* COMPONENT 'RelationTravail' */}
                        <RelationTravail handleChange={handleChange} disable={disable} />
                        {/* COMPONENT 'TempsTravail' */}
                        <TempsTravail handleChange={handleChange} disable={disable} />
                        {/* COMPONENT 'Convention' */}
                        <Convention handleChange={handleChange} disable={disable} />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='classification' onChange={handleChange} value={informationsRH.classification} label='Classification' placeholder='Classification' disabled={disable} />
                        <br />
                        <Form.Input fluid name='niveau' onChange={handleChange} value={informationsRH.niveau} label='Niveau' placeholder='Niveau' disabled={disable} />
                        <br />
                        <Form.Input fluid name='coefficient' onChange={handleChange} value={informationsRH.coefficient} label='Coefficient' placeholder='Coefficient' disabled={disable} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid name='indice' onChange={handleChange} value={informationsRH.indice} label='Indice' placeholder='Indice' disabled={disable} />
                        <br />
                        <Form.Input fluid name='rémunérationbrutemensuelle' value={informationsRH.rémunérationbrutemensuelle} onChange={handleChange} label='Rémunération brute mensuelle' placeholder='Rémunération brute mensuelle' disabled={disable} />
                        <br />
                        <Form.Input fluid name='rémunérationbrutejournalière' value={informationsRH.rémunérationbrutejournalière} onChange={handleChange} label='Rémunération brute journalière' placeholder='Rémunération brute journalière' disabled={disable} />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='rémunérationbruteannuelle' value={informationsRH.rémunérationbruteannuelle} onChange={handleChange} label='Rémunération brute annuelle' placeholder='Rémunération brute annuelle' disabled={disable} />
                        <br />
                        <Form.Input fluid name='rémunérationbrutehoraire' value={informationsRH.rémunérationbrutehoraire} onChange={handleChange} label='Rémunération brute horaire' placeholder='Rémunération brute horaire' disabled={disable} />
                        <br />
                        <Form.Input fluid name='nombreheureshebdomadairedusalarié' value={informationsRH.nombreheureshebdomadairedusalarie} onChange={handleChange} label="Nombre d'heures hebdomadaire du salarié" placeholder="Nombre d'heures hebdomadaire du salarié" disabled={disable} />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='nombreheuresmensueldusalarié' value={informationsRH.nombreheuresmensueldusalarié} onChange={handleChange} label="Nombre d'heures mensuel du salarié" placeholder="Nombre d'heures mensuel du salarié" disabled={disable} />
                        <br />
                        <ERP onChange={handleChange} disable={disable} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form.Group>
                <DocumentRH handleChangeFile={handleChangeFile} disable={disable} />
            </Form.Group>
            {disable !== true ? <Button primary onClick={sendDataRH} >Enregistrer les données</Button> : null}
        </Container>
    )
}
