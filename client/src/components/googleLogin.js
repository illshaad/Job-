import React, { useState } from 'react'
import { Container, Image, Segment } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import GoogleLogin from 'react-google-login'


export default function Google() {


    let history = useHistory();

    //Envoie de la donnée au back//
    // Utilisation du localStorage pour sauvergarder email apres le click du button google//
    const responseGoogle = (response) => {
        const emailResponse = response.Ot.yu;
        const nomPrenom = emailResponse.split("@")[0].replace(".", "/")
        localStorage.setItem('name', emailResponse)
        history.push(`/collaborateur/${nomPrenom}`)
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
