import React, { useState, useEffect } from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'
import axios from 'axios'

export default function AutocompletJuridique({ handleChange }) {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:3000/juridiqueData',
            );
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <Grid>
            <div className='autoCompletTitre'>Structure Juridique</div>
            <Dropdown
                onChange={handleChange}
                placeholder='Structure Juridique'
                fluid
                search
                name='structurejuridique'
                selection
                options={data}
            />
        </Grid>

    )
}