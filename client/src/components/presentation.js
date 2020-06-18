import React, { useState } from 'react'
import AutocompletCorrespondant from './Autocomplet'
import Informations from './informations'
import Uploads from './uploadtest'
import { Form } from 'semantic-ui-react'




export default function Presentation() {
    const [informations, setInformations] = useState({
        prenom: "",
        nom: "",
        genre: "",
        operateur: "",
        carnetVaccination: "",
        carteIdentitePassport: "",
        carteVital: "",
        CV: "",
        permisConduire: "",
        assuranceAutomobile: "",
        photo: "",
        RIB: "",
        correspondant: ""
    })


    const handleChange = (e, { value, name }) => setInformations({ ...informations, [e.target.name || name]: value })

    return (
        <Form>
            <Form.Group widths='equal'>
                <Form.Input fluid name='prenom' onChange={handleChange} label='Prenom' placeholder='Prenom' />
                <Form.Input fluid name='nom' onChange={handleChange} label='Nom' placeholder='Nom' />
            </Form.Group>
            <Form.Group inline>
                <Form.Radio
                    name="genre"
                    label='Homme'
                    value='homme'
                    checked={informations.genre === 'homme'}
                    onChange={handleChange}
                />
                <Form.Radio
                    name="genre"
                    label='Femme'
                    value='femme'
                    checked={informations.genre === 'femme'}
                    onChange={handleChange}
                />
            </Form.Group>

            <label>Opérateurs</label>
            <Form.Group inline>
                <Form.Radio
                    name="operateur"
                    label='Doctegestio'
                    value='doctegestio'
                    checked={informations.operateur === 'doctegestio'}
                    onChange={handleChange}
                />
                <Form.Radio
                    name="operateur"
                    label='Doctocare'
                    value='doctocare'
                    checked={informations.operateur === 'doctocare'}
                    onChange={handleChange}
                />
                <Form.Radio
                    name="operateur"
                    label='Amapa'
                    value='amapa'
                    checked={informations.operateur === 'amapa'}
                    onChange={handleChange}
                />
                <Form.Radio
                    name="operateur"
                    label='Poppins'
                    value='poppins'
                    checked={informations.operateur === 'poppins'}
                    onChange={handleChange}
                />
                <AutocompletCorrespondant handleChange={handleChange} />
            </Form.Group>
            <Form.Group>
                {/* <Informations informations={informations} handleChange={handleChange} /> */}
            </Form.Group>
            <Form.Group >
                {/* <Uploads /> */}
            </Form.Group>
        </Form>

    )
}
