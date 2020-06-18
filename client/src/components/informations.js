import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

export default function Informations({ informations, handleChange }) {
    return (
        <Form>
            <label>Informations</label>
            <Form.Group inline>

                <Form.Radio
                    name="carnetVaccination"
                    label='Carnet de Vaccination'
                    value='carnetVaccination'
                    checked={informations.carnetVaccination === 'carnetVaccination'}
                    onChange={handleChange}
                />
                <Form.Radio
                    name="carteIdentitePassport"
                    label="Carte d'identité ou passeport"
                    value='carteIdentitePassport'
                    checked={informations.carteIdentitePassport === 'carteIdentitePassport'}
                    onChange={handleChange}
                />
                <Form.Radio
                    name="carteVital"
                    label='Carte Vital'
                    value='carteVital'
                    checked={informations.carteVital === 'carteVital'}
                    onChange={handleChange}
                />
                <Form.Radio
                    name="CV"
                    label='CV'
                    value='CV'
                    checked={informations.CV === 'CV'}
                    onChange={handleChange}
                />
                <Form.Radio
                    name="permisConduire"
                    label='Permis de conduire'
                    value='permisConduire'
                    checked={informations.permisConduire === 'permisConduire'}
                    onChange={handleChange}
                />
                <Form.Radio
                    name="assuranceAutomobile"
                    label='Assurance automobile'
                    value='assuranceAutomobile'
                    checked={informations.assuranceAutomobile === 'assuranceAutomobile'}
                    onChange={handleChange}
                />
                <Form.Radio
                    name="photo"
                    label='Photo'
                    value='photo'
                    checked={informations.photo === 'photo'}
                    onChange={handleChange}
                />
                <Form.Radio
                    name="RIB"
                    label='RIB'
                    value='RIB'
                    checked={informations.RIB === 'RIB'}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
            </Form.Group>
        </Form>

    )
}
