import React from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'


export default function AutocompletCollaborateur({ handleChange, disable }) {
    const data = [
        { key: 'actionnaire-1', value: 'actionnaire', text: 'Actionnaire' },
        { key: 'administrateur', value: 'administrateur', text: 'Administrateur' },
        { key: 'Administration', value: 'Administration', text: 'Administration' },
        { key: 'Agent de maîtrise', value: 'Agent de maîtrise', text: 'Agent de maîtrise' },
        { key: 'Alternant', value: 'Alternant', text: 'Alternant' },
        { key: 'Cadre', value: 'Cadre', text: 'Cadre' },
        { key: 'Client', value: 'Client', text: 'Client' },
        { key: 'Compte partagé externe', value: 'Compte partagé externe', text: 'Compte partagé externe' },
        { key: 'Compte partagé interne', value: 'Compte partagé interne', text: 'Compte partagé interne' },
        { key: 'Consultant', value: 'Consultant', text: 'Consultant' },
        { key: 'Employé', value: 'Employé', text: 'Employé' },
        { key: 'Etablissement', value: 'Etablissement', text: 'Etablissement' },
        { key: 'Fournisseur', value: 'Fournisseur', text: 'Fournisseur' },
        { key: 'Institution Financière ', value: 'Institution Financière ', text: 'Institution Financière ' },
        { key: 'Mandataire', value: 'Mandataire', text: 'Mandataire' },
        { key: 'Ouvrier', value: 'Ouvrier', text: 'Ouvrier' },
        { key: 'Praticien libéral', value: 'Praticien libéral', text: 'Praticien libéral' },
        { key: 'Praticien salarié', value: 'Praticien salarié', text: 'Praticien salarié' },
        { key: 'Prestataire extérieur', value: 'Prestataire extérieur', text: 'Prestataire extérieur' },
        { key: 'actionnaire', value: 'actionnaire', text: 'Actionnaire' },
        { key: 'Robot', value: 'Robot', text: 'Robot' },
        { key: 'Sorti', value: 'Sorti', text: 'Sorti' },
        { key: 'Stagiaire', value: 'Stagiaire', text: 'Stagiaire' },
        { key: 'Technicien', value: 'Technicien', text: 'Technicien' },
    ]

    return (
        <Grid>
            <div className='autoCompletType'>Type de collaborateur</div>
            <Dropdown
                name='collaborateur'
                onChange={handleChange}
                placeholder='Type'
                fluid
                search
                selection
                disabled={disable}
                options={data}
            />
        </Grid>

    )
}