import React, { useState, useEffect } from 'react'
import { Grid, Dropdown } from 'semantic-ui-react'
import axios from 'axios'

export default function InputAutocompletGenerique({ url, informations, informationsRH, title, name, handleChange, disable }) {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                url ,
            );
            setData(result.data);
        };
        fetchData();
    }, []);


    return (
        <Grid>
            <div className='autoCompletTitre'>{title}</div>
            <Dropdown
                onChange={handleChange}
                placeholder={title}
                fluid
                search
                name={name}
                disabled={disable}
                selection
                value={informations[name] || informationsRH[name]}
                options={data}
            />
        </Grid>
    )
}


//Mettre le [Name] selectionne le props//