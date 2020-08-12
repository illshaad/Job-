import React from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'

const data = [
    {
        key: 'Bénévole',
        text: 'Bénévole',
        value: 'Bénévole',
    },
    {
        key: "Contrat d'accompagnement dans l'emploi",
        text: "Contrat d'accompagnement dans l'emploi",
        value: "Contrat d'accompagnement dans l'emploi",
    },
    {
        key: "Contrat d'alternance",
        text: "Contrat d'alternance",
        value: "Contrat d'alternance",
    },
    {
        key: "Contrat d'apprentissage",
        text: "Contrat d'apprentissage",
        value: "Contrat d'apprentissage",

    },
    {
        key: "Contrat de professionalisation",
        text: "Contrat de professionalisation",
        value: "Contrat de professionalisation",

    },
    {
        key: "Contrat de travail à durée déterminée (CDD)",
        text: "Contrat de travail à durée déterminée (CDD)",
        value: "Contrat de travail à durée déterminée (CDD)",
    },
    {
        key: "Contrat d'Accueil et d'Intégration (CAI)",
        text: "Contrat d'Accueil et d'Intégration (CAI)",
        value: "Contrat d'Accueil et d'Intégration (CAI)",
    },
    {
        key: "Convention de stage",
        text: "Convention de stage",
        value: "Convention de stage",
    },
    {
        key: "Contrat d'exercice libéral",
        text: "Contrat d'exercice libéral",
        value: "Contrat d'exercice libéral",
    },
]

export default function RelationTravail({ handleChange, disable }) {
    return (
        <Grid>
            <div className='autoCompletTitre'>Nature de la relation de travail</div>
            <Dropdown
                placeholder='Relation de travail'
                name='naturetravail'
                onChange={handleChange}
                disabled={disable}
                fluid
                selection
                options={data}
            />
        </Grid>
    )
}

