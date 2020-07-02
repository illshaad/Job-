import React, { useState, useEffect } from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'
import axios from 'axios'

export default function AutocompletFonctionDigital({ handleChange }) {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:3000/fonctionData',
            );
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <Grid>
            <div className='autoCompletTitre'>Fonction Digital</div>
            <Dropdown
                onChange={handleChange}
                placeholder='Fonction Digital'
                fluid
                search
                name='fonctiondigital'
                selection
                options={data}
            />
        </Grid>

    )


}