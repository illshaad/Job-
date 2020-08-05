import React, { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import {
    BrowserRouter as Router,
    Redirect,
} from "react-router-dom";

export default function Google() {
    //Envoie de la donnée au back//

    const [email, setEmail] = useState("")

    // Utilisation du localStorage pour sauvergarder email apres le click du button google//
    const responseGoogle = (response) => {
        const emailResponse = response.Ot.yu;
        setEmail(emailResponse)
        localStorage.setItem('name', email)
    }

    return (
        <div className='App'>
            <GoogleLogin
                clientId="939765445894-gkfl9fd7gpd2vehkhdp1ju8g7760p2ca.apps.googleusercontent.com"
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>GOOGLE</button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
