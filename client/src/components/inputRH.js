import React, { useState, useEffect } from 'react'
import { Grid, Container, Form, Label, Button } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import ERP from './menuDeroulant/erp'
import axios from 'axios'
import InputImageGenerique from './InputImageGenerique';
import InputAutocompletGenerique from './inputAutocompletGenerique';

export default function InputRh({ dataFromAPI, disable, informationsRH, updateCollaborateur, updateFileCollaborateur }) {
    const [informations, setInformations] = useState({
        materiels: "",
        contrat: "",
        declaration: "",
        fichedeposte: "",
        fichesynthetique: "",
        avantagesennature: "",
        mutuelle: "",
        onboarding: "",
        fonctiondigitalsecondaire: "",
        datePriseDeFonction: "",
        telephonetravail: "",
        telephonemobile: "",
        adressetravail: "",
        classification: "",
        niveau: "",
        coefficient: "",
        indice: "",
        remunerationbrutemensuelle: "",
        remunerationbrutejournaliere: "",
        remunerationbruteannuelle: "",
        remunerationbrutehoraire: "",
        nombreheureshebdomadairedusalarie: "",
        nombreheuresmensueldusalarie: "",
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

    let history = useHistory();

    const [updateRh, setUpdateRh] = useState()
    const [updateFileRh, setUpdateFileRh] = useState()

    useEffect(() => {
        setInformations({
            collaborateur: dataFromAPI.organizations ? dataFromAPI.organizations[0].description : "",
            fonctiondigital: dataFromAPI.customSchemas.Attributs_supplementaires.Fonction_digitale_principale ? dataFromAPI.customSchemas.Attributs_supplementaires.Fonction_digitale_principale : "",
            fonctiondigitalsecondaire: dataFromAPI.customSchemas.Attributs_supplementaires.Fonction_digitale_minuscules ? dataFromAPI.customSchemas.Attributs_supplementaires.Fonction_digitale_minuscules.map(e => e.value) : "",
            emailresponsable: dataFromAPI.relations ? dataFromAPI.relations[0].type : "",
            etablissement: dataFromAPI.customSchemas.Attributs_supplementaires.Etablissement_digital ? dataFromAPI.customSchemas.Attributs_supplementaires.Etablissement_digital : "",
            datePriseDeFonction: dataFromAPI.customSchemas.Attributs_personnaliss.Date_de_la_prise_de_fonction ? dataFromAPI.customSchemas.Attributs_personnaliss.Date_de_la_prise_de_fonction : "",
            activite: dataFromAPI.customSchemas.Attributs_supplementaires.Activits ? dataFromAPI.customSchemas.Attributs_supplementaires.Activits[0].value : "",
            juridique: dataFromAPI.customSchemas.Attributs_supplementaires.Structure_Jurdique ? dataFromAPI.customSchemas.Attributs_supplementaires.Structure_Jurdique : "",
            telephonetravail: dataFromAPI.phones.value ? dataFromAPI.phones[1].value : "",
            naturetravail: dataFromAPI.customSchemas.Attributs_personnaliss.Nature_de_la_relation_de_travail ? dataFromAPI.customSchemas.Attributs_personnaliss.Nature_de_la_relation_de_travail : "",
            classification: dataFromAPI.customSchemas.Attributs_personnaliss.Classification ? dataFromAPI.customSchemas.Attributs_personnaliss.Classification : "",
            // telephonemobile: dataFromAPI.phones ? dataFromAPI.phones[2].value : "",
            tempstravail: dataFromAPI.customSchemas.Attributs_personnaliss.Temps_de_travail ? dataFromAPI.customSchemas.Attributs_personnaliss.Temps_de_travail : "",
            niveau: dataFromAPI.customSchemas.Attributs_personnaliss.Niveau ? dataFromAPI.customSchemas.Attributs_personnaliss.Niveau : "",
            // adressetravail: dataFromAPI.addresses ? dataFromAPI.addresses[1].formatted : "",
            convention: dataFromAPI.customSchemas.Attributs_personnaliss.Convention_collective ? dataFromAPI.customSchemas.Attributs_personnaliss.Convention_collective : "",
            coefficient: dataFromAPI.customSchemas.Attributs_personnaliss.Coefficient ? dataFromAPI.customSchemas.Attributs_personnaliss.Coefficient : "",
            indice: dataFromAPI.customSchemas.Attributs_personnaliss.Indice ? dataFromAPI.customSchemas.Attributs_personnaliss.Indice : "",
            remunerationbruteannuelle: dataFromAPI.customSchemas.Attributs_personnaliss.Rmunration_brute_annuelle2 ? dataFromAPI.customSchemas.Attributs_personnaliss.Rmunration_brute_annuelle2 : "",
            nombreheuresmensueldusalarie: dataFromAPI.customSchemas.Attributs_personnaliss.Nombre_dheures_mensuel_du_salari ? dataFromAPI.customSchemas.Attributs_personnaliss.Nombre_dheures_mensuel_du_salari : "",
            remunerationbrutemensuelle: dataFromAPI.customSchemas.Attributs_personnaliss.Rmunration_brute_mensuelle ? dataFromAPI.customSchemas.Attributs_personnaliss.Rmunration_brute_mensuelle : "",
            remunerationbrutehoraire: dataFromAPI.customSchemas.Attributs_personnaliss.Rmunration_brute_horaire ? dataFromAPI.customSchemas.Attributs_personnaliss.Rmunration_brute_horaire : "",
            remunerationbrutejournaliere: dataFromAPI.customSchemas.Attributs_personnaliss.Rmunration_brute_journalire ? dataFromAPI.customSchemas.Attributs_personnaliss.Rmunration_brute_journalire : "",
            nombreheureshebdomadairedusalarie: dataFromAPI.customSchemas.Attributs_personnaliss.Nombre_dheures_hebdomadaire_du_salari ? dataFromAPI.customSchemas.Attributs_personnaliss.Nombre_dheures_hebdomadaire_du_salari : "",
            erp: dataFromAPI.customSchemas.Attributs_personnaliss.Formation_ERP_Scurit_Incendie ? dataFromAPI.customSchemas.Attributs_personnaliss.Formation_ERP_Scurit_Incendie : "",
        })
    }, [dataFromAPI])

    const handleChange = (e, { value, name }) => {
        setInformations({ ...informations, [e.target.name || name]: value })
        setUpdateRh({ ...updateRh, [e.target.name || name]: value })
    }

    const handleChangeFile = (e) => {
        setInformations({ ...informations, [e.target.name]: e.target.files[0] })
        setUpdateFileRh({ ...updateFileRh, [e.target.name]: e.target.files[0] })
    }

    const sendDataRH = async () => {
        //Fusionner les deux states des deux composants de input//
        try {
            const object = Object.assign(updateCollaborateur, updateRh);
            const object2 = Object.assign(updateFileCollaborateur, updateFileRh);
            const keys = Object.keys(object2)
            const data = new FormData()
            for (const i in keys) {
                data.append(keys[i], object2[keys[i]])
            }
            const response = await axios({
                method: 'post',
                url: 'https://gsuite-api-dot-projet-test-doctegestio.uc.r.appspot.com/updateGSuiteUser',
                data: object
            })
            const responseFile = await axios({
                method: 'post',
                url: 'http://localhost:3000/file',
                data: data
            })
            setUpdateRh({})
        } catch (error) {
            console.log("Error", error.response.data.errors)
        }
        history.push('/ok')
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
                        <InputAutocompletGenerique url='http://localhost:3000/collaborateurData' title='Type de collaborateur' name='collaborateur' informations={informations} informationsRH={informationsRH} handleChange={handleChange} disable={disable} />
                        <InputAutocompletGenerique url='http://localhost:3000/emailData' title='Adresse e-mail du responsable' name='emailresponsable' informations={informations} informationsRH={informationsRH} handleChange={handleChange} disable={disable} />
                        <InputAutocompletGenerique url='http://localhost:3000/activiteData' title='Activite' name='activite' informations={informations} informationsRH={informationsRH} handleChange={handleChange} disable={disable} />
                    </Grid.Column>
                    <Grid.Column>
                        <InputAutocompletGenerique url='http://localhost:3000/fonctionData' title='Fonction digitale principale' name='fonctiondigital' informations={informations} informationsRH={informationsRH} handleChange={handleChange} disable={disable} />
                        <InputAutocompletGenerique url='http://localhost:3000/etablissementData' title='Etablissement digital' name='etablissement' informations={informations} informationsRH={informationsRH} handleChange={handleChange} disable={disable} />
                        <InputAutocompletGenerique url='http://localhost:3000/juridiqueData' title='Structure Juridique' name='juridique' informations={informations} informationsRH={informationsRH} handleChange={handleChange} disable={disable} />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='fonctiondigitalsecondaire' value={informations.fonctiondigitalsecondaire || informationsRH.fonctiondigitalsecondaire} onChange={handleChange} label='Fonction(s) digitale(s) secondaire(s)' placeholder='Fonction(s) digitale(s) secondaire(s)' disabled={disable} />
                        <br />
                        <Form.Input fluid name=' datePriseDeFonction' value={informations.datePriseDeFonction || informationsRH.datePriseDeFonction} onChange={handleChange} label='Date de prise de fonction' placeholder='Date de prise de fonction' disabled={disable} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid name='telephonetravail' value={informations.telephonetravail || informationsRH.telephonetravail} onChange={handleChange} label='Téléphone (Travail)' placeholder='Téléphone (Travail)' disabled={disable} />
                        <br />
                        <Form.Input fluid name='telephonemobile' value={informations.telephonemobile || informationsRH.telephonemobile} onChange={handleChange} label='Téléphone (Mobile)' placeholder='Téléphone (Mobile)' disabled={disable} />
                        <br />
                        <Form.Input fluid name='adressetravail' value={informations.adressetravail || informationsRH.adressetravail} onChange={handleChange} label='Adresse (Travail)' placeholder='Adresse (Travail)' disabled={disable} />
                        <br />
                    </Grid.Column>
                    <Grid.Column>
                        <InputAutocompletGenerique url='http://localhost:3000/natureData' title='Nature de la relation de travail' name='naturetravail' informations={informations} informationsRH={informationsRH} handleChange={handleChange} disable={disable} />
                        <InputAutocompletGenerique url='http://localhost:3000/travailData' title='Temps travail' name='tempstravail' informations={informations} informationsRH={informationsRH} handleChange={handleChange} disable={disable} />
                        <InputAutocompletGenerique url='http://localhost:3000/conventionData' title='Convention Collective' name='convention' informations={informations} informationsRH={informationsRH} handleChange={handleChange} disable={disable} />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='classification' onChange={handleChange} value={informations.classification || informationsRH.classification} label='Classification' placeholder='Classification' disabled={disable} />
                        <br />
                        <Form.Input fluid name='niveau' onChange={handleChange} value={informations.niveau || informationsRH.niveau} label='Niveau' placeholder='Niveau' disabled={disable} />
                        <br />
                        <Form.Input fluid name='coefficient' onChange={handleChange} value={informations.coefficient || informationsRH.coefficient} label='Coefficient' placeholder='Coefficient' disabled={disable} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid name='indice' value={informations.indice || informationsRH.indice} onChange={handleChange} label='Indice' placeholder='Indice' disabled={disable} />
                        <br />
                        <Form.Input fluid name='remunerationbrutemensuelle' value={informations.remunerationbrutemensuelle || informationsRH.remunerationbrutemensuelle} onChange={handleChange} label='Rémunération brute mensuelle' placeholder='Rémunération brute mensuelle' disabled={disable} />
                        <br />
                        <Form.Input fluid name='remunerationbrutejournaliere' value={informations.remunerationbrutejournaliere || informationsRH.remunerationbrutejournaliere} onChange={handleChange} label='Rémunération brute journalière' placeholder='Rémunération brute journalière' disabled={disable} />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='remunerationbruteannuelle' value={informations.remunerationbruteannuelle || informationsRH.remunerationbruteannuelle} onChange={handleChange} label='Rémunération brute annuelle' placeholder='Rémunération brute annuelle' disabled={disable} />
                        <br />
                        <Form.Input fluid name='remunerationbrutehoraire' value={informations.remunerationbrutehoraire || informationsRH.remunerationbrutehoraire} onChange={handleChange} label='Rémunération brute horaire' placeholder='Rémunération brute horaire' disabled={disable} />
                        <br />
                        <Form.Input fluid name='nombreheureshebdomadairedusalarie' value={informations.nombreheureshebdomadairedusalarie || informationsRH.nombreheureshebdomadairedusalarie} onChange={handleChange} label="Nombre d'heures hebdomadaire du salarié" placeholder="Nombre d'heures hebdomadaire du salarié" disabled={disable} />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid name='nombreheuresmensueldusalarie' value={informations.nombreheuresmensueldusalarie || informationsRH.nombreheureshebdomadairedusalarie} onChange={handleChange} label="Nombre d'heures mensuel du salarié" placeholder="Nombre d'heures mensuel du salarié" disabled={disable} />
                        <br />
                        <ERP handleChange={handleChange} informations={informations} informationsRH={informationsRH} disable={disable} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form>
                <h3>Documents à fournir par gestionpersonnel (10/30)</h3>

                <Grid columns={3} divided>
                    <InputImageGenerique disable={disable} informations={informations} setInformations={setInformations} title="Chartes d'utilisation de matériels et pratiques" handleChangeFile={handleChangeFile} name={"materiels"} />
                    <InputImageGenerique disable={disable} informations={informations} setInformations={setInformations} title="Contrat de travail ou contrat de prestation ou convention de stage et promesse d'embauche" handleChangeFile={handleChangeFile} name={"contrat"} />
                    <InputImageGenerique disable={disable} informations={informations} setInformations={setInformations} title="Déclaration préalable à l'embauche (DPAE)" handleChangeFile={handleChangeFile} name={"declaration"} />
                </Grid>
                <Grid columns={3} divided>
                    <InputImageGenerique disable={disable} informations={informations} setInformations={setInformations} title="Fiche de poste" handleChangeFile={handleChangeFile} name={"fichedeposte"} />
                    <InputImageGenerique disable={disable} informations={informations} setInformations={setInformations} title="Fiche signalétique synthétique" handleChangeFile={handleChangeFile} name={"fichesynthetique"} />
                    <InputImageGenerique disable={disable} informations={informations} setInformations={setInformations} title="Mise à disposition d'avantages en nature" handleChangeFile={handleChangeFile} name={"avantagesennature"} />
                </Grid>
                <Grid columns={3} divided>
                    <InputImageGenerique disable={disable} informations={informations} setInformations={setInformations} title="Mutuelle et prévoyance" handleChangeFile={handleChangeFile} name={"mutuelle"} />
                    <InputImageGenerique disable={disable} informations={informations} setInformations={setInformations} title="Onboarding" handleChangeFile={handleChangeFile} name={"onboarding"} />
                </Grid>
                {disable !== true ? <Button primary onClick={sendDataRH} >Enregistrer les données</Button> : null}
            </Form>

        </Container>

    )
}


