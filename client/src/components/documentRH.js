import React from 'react'
import { Grid, Container, Segment } from 'semantic-ui-react'

export default function DocumentsRh({ handleChangeFile }) {
    return (
        <Container>
            <br />
            <br />
            <h3>Documents à fournir par gestionpersonnel (10/30)</h3>
            <br />
            <Grid columns={4} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Segment textAlign='center'>Chartes d'utilisation de matériels et pratiques</Segment>
                        <input
                            type="file"
                            name='matériels'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Contrat de travail ou contrat de prestation ou convention de stage et promesse d'embauche</Segment>
                        <input
                            type="file"
                            name='contrat'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Déclaration préalable à l'embauche (DPAE)</Segment>
                        <input
                            type="file"
                            name='déclaration'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Fiche de poste</Segment>
                        <input
                            type="file"
                            name='fichedeposte'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Segment textAlign='center'>Fiche signalétique synthétique</Segment>
                        <input
                            type="file"
                            name='fichesynthetique'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Mise à disposition d'avantages en nature</Segment>
                        <input
                            type="file"
                            name='avantagesennature'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Mutuelle et prévoyance</Segment>
                        <input
                            type="file"
                            name='mutuelle'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Onboarding</Segment>
                        <input
                            type="file"
                            name='Onboarding'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container >
    )
}