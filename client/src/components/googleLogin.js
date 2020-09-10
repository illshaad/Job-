import React, { useEffect, useState } from 'react'
import { Container, Image, Segment } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login'
import { useHistory } from "react-router-dom";
import axios from 'axios';


export default function Google() {

    let history = useHistory();

    const [collaborateur, setCollaborateur] = useState()

    useEffect(() => {
        const collboratorResponse = async () => {
            await axios.post("http://localhost:3000/gestionPerso", { email: localStorage.getItem("name") })
                .then(response => {
                    console.log("response :", response.data)
                    setCollaborateur(response.data.isCollabo)
                })
        }
        collboratorResponse()
    }, [])

    //Envoie de la donnée au back//
    // Utilisation du localStorage pour sauvergarder email apres le click du button google//
    const responseGoogle = (response) => {
        const emailResponse = response.rt.$t;
        const nomPrenom = emailResponse.split("@")[0].replace(".", "/")
        localStorage.setItem('name', emailResponse)
        { collaborateur ? history.push(`/rh`) : history.push(`/collaborateur/${nomPrenom}`) }

    }


    return (
        <div>
            <Image style={{ marginTop: 100 }} src='./Doctegestio.png' size='medium' centered='true' />
            <Image src='./pcDocte.png' style={{ marginTop: 30 }} size='small' centered='true' />
            <Container>
                <Segment style={{ marginTop: 30 }}>
                    <p style={{ textAlign: 'center' }}>Nous avons besoin de vous authentifier pour vous donner l'accès à l'application.</p>
                    <div className='google'>
                        <GoogleLogin icon='false'
                            clientId="939765445894-gkfl9fd7gpd2vehkhdp1ju8g7760p2ca.apps.googleusercontent.com"
                            render={renderProps => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Se connecter avec Doctegestio</button>
                            )}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Segment>
            </Container>

        </div>
    )
}
