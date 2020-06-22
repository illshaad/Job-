import React from 'react'
import { Grid, Container, Segment } from 'semantic-ui-react'

export default function Informations({ handleChangeFile }) {
    return (
        <Container>
            <Segment textAlign='center'>Les Informations à charger</Segment>
            <Grid columns={4} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Segment textAlign='center'>Carnet de vaccination</Segment>
                        <input
                            type="file"
                            name='carnetVaccination'

                            onChange={handleChangeFile}
                        />
                    </Grid.Column>
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
        </Container>
    )
}
