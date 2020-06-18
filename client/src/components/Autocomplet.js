import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'


export default function AutocompletCorrespondant({ handleChange }) {
    const data = [
        { key: 'ro', value: 'ro', text: 'Romain.Farrel' },
        { key: 'gr', value: 'gr', text: 'Gramos.immerie' },
        { key: 'ge', value: 'ge', text: 'George.Nassopulos' },
    ]
    return (
        <Dropdown
            name='correspondant'
            onChange={handleChange}
            placeholder='Selectionné votre correspondant'
            fluid
            search
            selection
            options={data}
        />
    )
}





