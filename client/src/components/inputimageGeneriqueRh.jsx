import React, { useState } from 'react'
import { Grid, Container, Segment, Icon } from 'semantic-ui-react'

export default function InputImageGeneriqueRh({ informations, setInformations, title, name, handleChangeFile, disable }) {
    const [previewImage, setPreviewImage] = useState("")
    const deleteImage = () => {
        setPreviewImage("")
        setInformations({ ...informations, [name]: "" })
    }

    return (
        <Grid.Column>
            <Segment textAlign='center'>{title}</Segment>
            <input
                type="file"
                name={name}
                disabled={disable}
                onChange={(e) => {
                    handleChangeFile(e)
                    setPreviewImage(URL.createObjectURL(e.target.files[0]))
                }}
            /> <div className="closeImage">
                <Icon name='close' color="red" className="icon-cross" onClick={deleteImage} />
                <img src={previewImage || `http://localhost:3000/static/${informations[name]}`} />
            </div>
        </Grid.Column>
    )
}
