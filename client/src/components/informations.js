import React from 'react'
import { Grid, Container, Segment, Label } from 'semantic-ui-react'

export default function Informations({ handleChangeFile }) {
    return (
        <Container>
            <br />
            <br />
            <Grid columns={2}>
                <Grid.Row>
                    <Label circular color='blue' size='massive'>2</Label>
                    <h3>Documents à fournir</h3>
                </Grid.Row>
            </Grid>
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
                            name='CarnetVaccinal'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Segment textAlign='center'>Permis de conduire</Segment>
                        <input
                            type="file"
                            name='permisConduire'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Assurance automobile</Segment>
                        <input
                            type="file"
                            name='assuranceAutomobile'
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
                </Grid.Row>
            </Grid>
            <Segment className='segmentPerso' size='small'>Réservé aux praticiens</Segment>
            <Grid columns={4} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Segment textAlign='center'>Attestation d’inscription au tableau du conseil de l’Ordre</Segment>
                        <input
                            type="file"
                            name='conseildelordre'
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
                        <Segment textAlign='center'>Diplômes</Segment>
                        <input
                            type="file"
                            name='diplômes'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Segment textAlign='center'>RCP</Segment>
                        <input
                            type="file"
                            name='RCP'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Attestation de formation à la Radioprotection patients</Segment>
                        <input
                            type="file"
                            name='Radioprotectionpatients'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center'>Attestation de formation à la Radioprotection travailleurs</Segment>
                        <input
                            type="file"
                            name='Radioprotectiontravailleurs'
                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}
