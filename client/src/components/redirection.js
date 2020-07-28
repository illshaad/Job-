import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    useParams,
} from "react-router-dom";


export default function Redirection() {
    const [url, setUrl] = useState("")
    //?mail=illshaad.budureea@dgmail.fr

    const { email } = useParams();

    useEffect(() => {
        const nomPrenom = email.split("@")[0].replace(".", "/")
        setUrl(nomPrenom)
    }, [])
    return (
        <>
            {url === undefined || url === '' ? <div>Redirection en cours...</div> : <Redirect to={`/collaborateur/${url}`} />}
        </>
    )
}
