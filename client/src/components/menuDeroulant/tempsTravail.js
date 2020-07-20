import React from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'

const data = [
    {
        key: "Temps plein 39h",
        text: "Temps plein 39h",
        value: "Temps plein 39h",
    },
    {
        key: "Temps plein 35h",
        text: "Temps plein 35h",
        value: "Temps plein 35h",
    },
    {
        key: "Temps partiel",
        text: "Temps partiel",
        value: "Temps partiel",
    },
    {
        key: "Temps plein modulé",
        text: "Temps plein modulé",
        value: "Temps plein modulé",

    },
    {
        key: "Temps partiel modulé",
        text: "Temps partiel modulé",
        value: "Temps partiel modulé",

    },
    {
        key: "Forfait jour",
        text: "Forfait jour",
        value: "Forfait jour",
    },
    {
        key: "Forfait heure",
        text: "Forfait heure",
        value: "Forfait heure",
    },
]

export default function TempsTravail({ handleChange }) {
    return (
        <Grid>
            <div className='autoCompletTitre'>Temps travail</div>
            <Dropdown
                placeholder='Temps travail'
                name='tempstravail'
                onChange={handleChange}
                fluid
                selection
                options={data}
            />
        </Grid>
    )
}

