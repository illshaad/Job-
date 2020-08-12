import React, { useState, useEffect } from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'
import axios from 'axios'

export default function AutocompletEmailResponsable({ handleChange, value, disable }) {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:3000/emailData',
            );
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <Grid>
            <div className='autoCompletTitre'>Adresse e-mail du responsable </div>
            <Dropdown
                onChange={handleChange}
                placeholder='Adresse e-mail du responsable'
                fluid
                search
                // defaultValue='test'
                disabled={disable}
                name='emailresponsable'
                selection
                options={data}
            />
        </Grid>

    )
}