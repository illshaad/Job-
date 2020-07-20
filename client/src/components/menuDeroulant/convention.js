import React from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'

const data = [
    {
        key: "CC FEHAP",
        text: "CC FEHAP",
        value: "CC FEHAP",
    },
    {
        key: "CC FHP",
        text: "CC FHP",
        value: "CC FHP",
    },
    {
        key: "CC FJT",
        text: "CC FJT",
        value: "CC FJT",
    },
    {
        key: "CC HCR",
        text: "CC HCR",
        value: "CC HCR",

    },
    {
        key: "CC Immobilier",
        text: "CC Immobilier",
        value: "CC Immobilier",

    },
    {
        key: "CC Personnel des BET, cabinets ingénieurs-conseils",
        text: "CC Personnel des BET, cabinets ingénieurs-conseils",
        value: "CC Personnel des BET, cabinets ingénieurs-conseils",
    },
    {
        key: "CC Personnel des prestataires de Prestation  Service Secteur Tertiaire",
        text: "CC Personnel des prestataires de Prestation  Service Secteur Tertiaire",
        value: "CC Personnel des prestataires de Prestation  Service Secteur Tertiaire",
    },
    {
        key: "CC Restauration collective",
        text: "CC Restauration collective",
        value: "CC Restauration collective",
    },
    {
        key: "CC Syntec",
        text: "CC Syntec",
        value: "CC Syntec",
    },
    {
        key: "CC Thermalisme",
        text: "CC Thermalisme",
        value: "CC Thermalisme",
    },
    {
        key: "CCN 66",
        text: "CCN 66",
        value: "CCN 66",
    },
    {
        key: "CCN BAD",
        text: "CCN BAD",
        value: "CCN BAD",
    },
    {
        key: "CCN Cabinets dentaires",
        text: "CCN Cabinets dentaires",
        value: "CCN Cabinets dentaires",
    },
    {
        key: "CCN Optique Lunetterie",
        text: "CCN Optique Lunetterie",
        value: "CCN Optique Lunetterie",
    },
    {
        key: "CCN Services à la personne",
        text: "CCN Services à la personne",
        value: "CCN Services à la personne",
    },
    {
        key: "CC enseignement privé",
        text: "CC enseignement privé",
        value: "CC enseignement privé",
    },
    {
        key: "Pas de convention collective (droit du travail)",
        text: "Pas de convention collective (droit du travail)",
        value: "Pas de convention collective (droit du travail)",
    },
]

export default function Convention({ handleChange }) {
    return (
        <Grid>
            <div className='autoCompletTitre'>Convention Collective</div>
            <Dropdown
                placeholder='Convention Collective'
                name='convention'
                onChange={handleChange}
                fluid
                selection
                options={data}
            />
        </Grid>
    )
}

