import React from 'react'
import { Dropdown, Grid, Label } from 'semantic-ui-react'


export default function AutocompletActivite({ handleChange }) {

    const data = [
        { key: 'AUDITION', value: 'AUDITION', text: 'AUDITION' },
        { key: 'DENTAIRE', value: 'DENTAIRE', text: 'DENTAIRE' },
        { key: 'HAD', value: 'HAD', text: 'HAD' },
        { key: 'HOSPIT', value: 'HOSPIT', text: 'HOSPIT' },
        { key: 'IMAGERIE', value: 'IMAGERIE', text: 'IMAGERIE' },
        { key: 'MEDICAL', value: 'MEDICAL', text: 'MEDICAL' },
        { key: 'OPTIQUE', value: 'OPTIQUE', text: 'OPTIQUE' },
        { key: 'THERMAL', value: 'THERMAL', text: 'THERMAL' },
        { key: 'EHPA', value: 'EHPA', text: 'EHPA' },
        { key: 'FAMILLE', value: 'FAMILLE', text: 'FAMILLE' },
        { key: 'MNA', value: 'MNA', text: 'MNA' },
        { key: 'PORTAGE DE REPAS', value: 'PORTAGE DE REPAS', text: 'PORTAGE DE REPAS' },
        { key: 'SAAD MANDATAIRE', value: 'SAAD MANDATAIRE', text: 'SAAD MANDATAIRE' },
        { key: 'INVESTISSEMENT ', value: 'INVESTISSEMENT ', text: 'INVESTISSEMENT ' },
        { key: 'LOCATION', value: 'LOCATION', text: 'LOCATION' },
        { key: 'PROMOTION', value: 'PROMOTION', text: 'PROMOTION' },
        { key: 'TRANSACTION', value: 'TRANSACTION', text: 'TRANSACTION' },
        { key: 'CAMPING', value: 'CAMPING', text: 'CAMPING' },
        { key: 'CENTRE DE BIEN-ETRE', value: 'CENTRE DE BIEN-ETRE', text: 'CENTRE DE BIEN-ETRE' },
        { key: 'FJT', value: 'FJT', text: 'FJT' },
        { key: 'GOLF', value: 'GOLF', text: 'GOLF' },
        { key: 'HOTEL DE TOURISME', value: 'HOTEL DE TOURISME', text: 'HOTEL DE TOURISME' },
        { key: 'PARC RESIDENTIEL DE LOISIR', value: 'PARC RESIDENTIEL DE LOISIR', text: 'PARC RESIDENTIEL DE LOISIR' },
        { key: 'RESIDENCE DE TOURISME', value: 'RESIDENCE DE TOURISME', text: 'RESIDENCE DE TOURISME' },
        { key: 'RESIDENCE ETUDIANTE', value: 'RESIDENCE ETUDIANTE', text: 'RESIDENCE ETUDIANTE' },
        { key: 'RESTAURATION', value: 'RESTAURATION', text: 'RESTAURATION' },
        { key: 'RHVS', value: 'RHVS', text: 'RHVS' },
        { key: 'VILLAGE DE VACANCES', value: 'VILLAGE DE VACANCES', text: 'VILLAGE DE VACANCES' },
    ]

    return (
        <Grid>
            <div className='autoCompletTitre'>Activité</div>
            <Dropdown
                onChange={handleChange}
                placeholder='Activite'
                fluid
                search
                name='activite'
                selection
                options={data}
            />
        </Grid>
    )
}