import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import axios from 'axios'
import { Icon, Container, Table, Header } from 'semantic-ui-react'


export default function Rh() {
    const [dataCollaborateurs, setDataCollaboorateurs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:3000/uploadCollaborateur',
            );
            setDataCollaboorateurs(result.data);
        };
        fetchData();
    }, []);

    console.log(dataCollaborateurs, '???????');


    return (
        <div>
            <Container>
                <Link to='/'><Icon name='arrow left' size='large'></Icon></Link>
                <Header as='h1' textAlign='center'>Liste des nouveaux collaborateurs</Header>
                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Prénom</Table.HeaderCell>
                            <Table.HeaderCell>Nom</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Date de dernière mise à jour</Table.HeaderCell>
                            <Table.HeaderCell>Nombre de champs remplis </Table.HeaderCell>
                            <Table.HeaderCell>Nombre de documents fournis</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {dataCollaborateurs.map((item, key) =>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell><Link to={`/collaborateur/${item.prenom}/${item.nom}`}>{item.prenom}</Link></Table.Cell>
                                <Table.Cell>{item.nom}</Table.Cell>
                                <Table.Cell>{item.email}</Table.Cell>
                                <Table.Cell>10 Janvier 2020</Table.Cell>
                                <Table.Cell>3/20</Table.Cell>
                                <Table.Cell>15/20</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )}
                </Table>
            </Container>
        </div>
    )
}
