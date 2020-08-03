import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    useParams,
} from "react-router-dom";

import axios from 'axios'


export default function Redirection() {
    const [url, setUrl] = useState("")
    const [dataGestionPersonnel, setDataGestionPersonnel] = useState([])

    //?mail=illshaad.budureea@dgmail.fr

    const { email } = useParams();

    useEffect(() => {
        const fetchDataGestionPersonnel = async () => {
            const result = await axios.get(
                'http://localhost:3000/gestionPerso',
            );
            console.log(result, 'USERGESTIONPERSO');

            setDataGestionPersonnel(result.data);
        };
        fetchDataGestionPersonnel();
    }, []);

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
