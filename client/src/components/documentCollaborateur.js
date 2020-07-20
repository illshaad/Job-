import React from 'react'
import { Grid, Container, Segment } from 'semantic-ui-react'

export default function DocumentsCollaborateur({ handleChangeFile }) {
    return (
        <Container>
            <br />
            <br />
            <h3>Documents à fournir par le collaborateur (10/30)</h3>
            <br />
            <Grid columns={4} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Segment textAlign='center'>Carte national ou passport</Segment>
                        <input
                            type="file"
                            name='carteIdentitePassport'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Carte Vital</Segment>
                        <input
                            type="file"
                            name='carteVital'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>CV</Segment>
                        <input
                            type="file"
                            name='CV'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Carnet Vaccinal</Segment>
                        <input
                            type="file"
                            name='carnetvaccination'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Segment textAlign='center'>Diplômes</Segment>
                        <input
                            type="file"
                            name='diplômescollaborateurs'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Photo</Segment>
                        <input
                            type="file"
                            name='photo'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>RIB</Segment>
                        <input
                            type="file"
                            name='RIB'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Aptitude médicale au travail</Segment>
                        <input
                            type="file"
                            name='aptitudemédicale'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div className='autoCompletTitre'>Pour les postes nécessitant une voiture</div>
                        <Segment textAlign='center'>Permis de conduire</Segment>
                        <input
                            type="file"
                            name='permisConduire'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <div className='autoCompletTitre'>Pour les postes nécessitant une voiture</div>
                        <Segment textAlign='center'>Assurance automobile</Segment>
                        <input
                            type="file"
                            name='assuranceAutomobile'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Attestation assurance habitation</Segment>
                        <input
                            type="file"
                            name='attestationassurancehabitation'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Autres contrats de travail en cours</Segment>
                        <input
                            type="file"
                            name='contratstravailcours'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={4} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Segment textAlign='center'>Lettre de motivation</Segment>
                        <input
                            type="file"
                            name='lettremotivation'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Carte de séjour</Segment>
                        <input
                            type="file"
                            name='cartesejour'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Extrait de casier judiciaire </Segment>
                        <input
                            type="file"
                            name='casierjudiciaire '
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Segment className='segmentPerso' size='small'>Réservé aux praticiens</Segment>
            <Grid columns={4} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Segment textAlign='center'>Attestion d'assurance RCP</Segment>
                        <input
                            type="file"
                            name='RCP'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>ONCD</Segment>
                        <input
                            type="file"
                            name='ONCD'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Attestation d'inscription ADELI</Segment>
                        <input
                            type="file"
                            name='ADLI'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Attestation d’inscription au tableau du conseil de l’Ordre</Segment>
                        <input
                            type="file"
                            name='conseildelordre'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Segment textAlign='center'>Attestation de formation à la Radioprotection patients</Segment>
                        <input
                            type="file"
                            name='radioprotectionpatients'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Attestation de formation à la Radioprotection travailleurs</Segment>
                        <input
                            type="file"
                            name='radioprotectiontravailleurs'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}
