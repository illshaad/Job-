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

export default function InputRh() {

    const [informations, setInformations] = useState({
        matériels: "",
        contrat: "",
        déclaration: "",
        fichedeposte: "",
        fichesynthetique: "",
        avantagesennature: "",
        mutuelle: "",
        onboarding: "",
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

    const sendDataRH = async () => {
        const data = new FormData()
        data.append('matériels', informations.matériels)
        data.append('contrat', informations.contrat)
        data.append('déclaration', informations.déclaration)
        data.append('fichedeposte', informations.fichedeposte)
        data.append('fichesynthetique', informations.fichesynthetique)
        data.append('avantagesennature', informations.avantagesennature)
        data.append('mutuelle', informations.mutuelle)
        data.append('onboarding', informations.onboarding)
        data.append('activite', informations.activite)
        data.append('emailresponsable', informations.emailresponsable)
        data.append('etablissement', informations.etablissement)
        data.append('fonctiondigital', informations.fonctiondigital)
        data.append('juridique', informations.juridique)
        data.append('collaborateur', informations.collaborteur)
        data.append('convention', informations.convention)
        data.append('erp', informations.erp)
        data.append('naturetravail', informations.naturetravail)
        data.append('tempstravail', informations.tempstravail)
        data.append('classification', informations.classification)
        data.append('niveau', informations.niveau)
        data.append('indice', informations.indice)
        data.append('rémunérationbrutemensuelle', informations.rémunérationbrutemensuelle)
        data.append('rémunérationbrutejournalière', informations.rémunérationbrutejournalière)
        data.append('rémunérationbruteannuelle', informations.rémunérationbruteannuelle)
        data.append('rémunérationbrutehoraire', informations.rémunérationbrutehoraire)
        data.append('nombreheureshebdomadairedusalarié', informations.nombreheureshebdomadairedusalarie)
        data.append('nombreheuresmensueldusalarié', informations.nombreheuresmensueldusalarié)
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/uploadRH',
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
                        <AutocompletCollaborateur handleChange={handleChange} />
                        {/* COMPONENT 'EmailResponsable' */}
                        <AutocompletEmailResponsable handleChange={handleChange} />
                        {/* COMPONENT 'Activite' */}
                        <AutocompletActivité handleChange={handleChange} />
                    </Grid.Column>
                    <Grid.Column>
                        {/* COMPONENT 'FonctionDigital' */}
                        <AutocompletFonctionDigital handleChange={handleChange} />
                        {/* COMPONENT 'Etablissement' */}
                        <AutocompletEtablissement handleChange={handleChange} />
                        {/* COMPONENT 'Juridique' */}
                        <AutocompletJuridique handleChange={handleChange} />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='fonction(s)digitale(s)secondaire(s)' onChange={handleChange} label='Fonction(s) digitale(s) secondaire(s)' placeholder='Fonction(s) digitale(s) secondaire(s)' />
                        <br />
                        <Form.Input fluid type='date' name=' datedeprisedefonction' onChange={handleChange} label='Date de prise de fonction' placeholder='Date de prise de fonction' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid name='téléphone(travail)' onChange={handleChange} label='Téléphone (Travail)' placeholder='Téléphone (Travail)' />
                        <br />
                        <Form.Input fluid name='téléphone(mobile)' onChange={handleChange} label='Téléphone (Mobile)' placeholder='Téléphone (Mobile)' />
                        <br />
                        <Form.Input fluid name='adresse(travail)' onChange={handleChange} label='Adresse (Travail)' placeholder='Adresse (Travail)' />
                        <br />
                    </Grid.Column>
                    <Grid.Column>
                        {/* COMPONENT 'RelationTravail' */}
                        <RelationTravail handleChange={handleChange} />
                        {/* COMPONENT 'TempsTravail' */}
                        <TempsTravail handleChange={handleChange} />
                        {/* COMPONENT 'Convention' */}
                        <Convention handleChange={handleChange} />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='classification' onChange={handleChange} label='Classification' placeholder='Classification' />
                        <br />
                        <Form.Input fluid name='niveau' onChange={handleChange} label='Niveau' placeholder='Niveau' />
                        <br />
                        <Form.Input fluid name='coefficient' onChange={handleChange} label='Coefficient' placeholder='Coefficient' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid name='indice' onChange={handleChange} label='Indice' placeholder='Indice' />
                        <br />
                        <Form.Input fluid name='rémunérationbrutemensuelle' onChange={handleChange} label='Rémunération brute mensuelle' placeholder='Rémunération brute mensuelle' />
                        <br />
                        <Form.Input fluid name='rémunérationbrutejournalière' onChange={handleChange} label='Rémunération brute journalière' placeholder='Rémunération brute journalière' />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='rémunérationbruteannuelle' onChange={handleChange} label='Rémunération brute annuelle' placeholder='Rémunération brute annuelle' />
                        <br />
                        <Form.Input fluid name='rémunérationbrutehoraire' onChange={handleChange} label='Rémunération brute horaire' placeholder='Rémunération brute horaire' />
                        <br />
                        <Form.Input fluid name='nombreheureshebdomadairedusalarié' onChange={handleChange} label="Nombre d'heures hebdomadaire du salarié" placeholder="Nombre d'heures hebdomadaire du salarié" />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='nombreheuresmensueldusalarié' onChange={handleChange} label="Nombre d'heures mensuel du salarié" placeholder="Nombre d'heures mensuel du salarié" />
                        <br />
                        <ERP onChange={handleChange} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form.Group>
                <DocumentRH handleChangeFile={handleChangeFile} />
            </Form.Group>
            <Button primary onClick={sendDataRH}>Enregistrer les données</Button>
        </Container>
    )
}
