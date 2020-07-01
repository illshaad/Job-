import React from 'react'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { Icon, Container, Table, Header } from 'semantic-ui-react'


export default function Rh() {
    return (<div>
        <Container>
            <Link to='/'><Icon name='arrow left' size='large'></Icon></Link>
            <Header as='h1' textAlign='center'>Listes des futurs collaborateurs</Header>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Prenom</Table.HeaderCell>
                        <Table.HeaderCell>Nom</Table.HeaderCell>
                        <Table.HeaderCell>Date de rentrer</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>nombre de champs remplis </Table.HeaderCell>
                        <Table.HeaderCell>nombre de documents fournis exemple</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell><Link to='/collaborateur'>John</Link></Table.Cell>
                        <Table.Cell>Lilki</Table.Cell>
                        <Table.Cell>10 Janvier 2020</Table.Cell>
                        <Table.Cell>jhlilk22@dgmail.fr</Table.Cell>
                        <Table.Cell>3/20</Table.Cell>
                        <Table.Cell>15/20</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jamie</Table.Cell>
                        <Table.Cell>Harington</Table.Cell>
                        <Table.Cell>11 Janvier 2020</Table.Cell>
                        <Table.Cell>jamieharingonton@dgmail.fr</Table.Cell>
                        <Table.Cell>10/20</Table.Cell>
                        <Table.Cell>5/20</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jade</Table.Cell>
                        <Table.Cell>Jojo</Table.Cell>
                        <Table.Cell>11 Mars 2020</Table.Cell>
                        <Table.Cell>jade@dgmail.fr</Table.Cell>
                        <Table.Cell>20/20</Table.Cell>
                        <Table.Cell>20/20</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Container>
    </div>
    )
}
