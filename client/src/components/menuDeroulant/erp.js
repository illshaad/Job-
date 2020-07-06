import React from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'

const data = [
    {
        key: "Oui",
        text: "Oui",
        value: "Oui",
    },
    {
        key: "Non",
        text: "Non",
        value: "Non",
    },
]

export default function ERP({ handleChange }) {
    return (
        <Grid>
            <div className='autoCompletTitre'>Formation ERP Sécurité Incendie</div>
            <Dropdown
                placeholder='Formation ERP Sécurité Incendie'
                onChange={handleChange}
                fluid
                selection
                options={data}
            />
        </Grid>
    )
}

