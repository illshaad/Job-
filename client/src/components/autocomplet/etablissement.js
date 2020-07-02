import React, { useState, useEffect } from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'
import axios from 'axios'

export default function AutocompletEtablissement({ handleChange }) {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:3000/etablissementData',
            );
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <Grid>
            <div className='autoCompletTitre'>Etablissement Digital</div>
            <Dropdown
                onChange={handleChange}
                placeholder='Etablissement'
                fluid
                search
                name='etablissement'
                selection
                options={data}
            />
        </Grid>

    )


}