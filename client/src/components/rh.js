import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Header, Dropdown, Button } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";

export default function Rh({ setDataFromAPI }) {

    let history = useHistory();
    const [dataCollaborateurs, setDataCollaborateurs] = useState([])
    const [valueEmail, setValueEmail] = useState('')

    const handleChange = (e, { value, name }) => setValueEmail({ ...valueEmail, [name]: value })

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:3000/emailData',
            );
            setDataCollaborateurs(result.data);
        };
        fetchData();
    }, []);


    const buttonRedirect = async () => {
        await axios.post("https://gsuite-api-dot-projet-test-doctegestio.uc.r.appspot.com/getGsuiteUser", { email: valueEmail.email })
            .then(res => {
                setDataFromAPI(res.data)
                const nomPrenom = valueEmail.email.split("@")[0].replace(".", "/")
                history.push(`/collaborateur/${nomPrenom}`)
            })
    }
    console.log(valueEmail);

    return (
        <div>
            <Container>
                <br />
                <Header as='h1' textAlign='center'>Adresse e-mail du responsable</Header>
                <Dropdown
                    name='email'
                    onChange={handleChange}
                    placeholder='Collaborateur'
                    fluid
                    search
                    options={dataCollaborateurs}
                />
                <Button className='buttonRh' onClick={buttonRedirect}>DIRECTION</Button>
            </Container>
        </div>
    )
}
