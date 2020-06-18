import React, { useState } from 'react'

export default function Uploads() {

    const [fileUpload, setFileUpload] = useState([{
        carnetVaccination: "",
        carteIdentitePassport: "",
        carteVital: "",
        CV: "",
        permisConduire: "",
        assuranceAutomobile: "",
        photo: "",
        RIB: "",
    }])

    const onChangeCarnetVaccination = (e, file) => {
        setFileUpload({
            ...fileUpload, [e.target.file || file]: e,
        });
    }

    return (
        <div>
            <input type="file" file={'cu'} onChange={onChangeCarnetVaccination} style={{ display: "hidden" }} />
        </div>
    )
}





