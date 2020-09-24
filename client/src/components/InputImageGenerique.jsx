import React, { useState } from "react";
import { Grid, Segment, Icon } from "semantic-ui-react";
import config from "../config";

export default function InputImageGenerique({
  informations,
  setInformations,
  title,
  name,
  handleChangeFile,
  disable,
}) {
  const [previewImage, setPreviewImage] = useState("");
  const deleteImage = () => {
    setPreviewImage("");
    setInformations({ ...informations, [name]: "" });
  };
  // NE PAS OUBLIER DE FAIRE LA CONDITION  L 24 //
  return (
    <Grid.Column>
      <Segment textAlign="center">{title}</Segment>
      <input
        type="file"
        name={name}
        disabled={disable}
        onChange={(e) => {
          handleChangeFile(e);
          setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <div className="closeImage">
        <Icon
          name="close"
          color="red"
          className="icon-cross"
          onClick={deleteImage}
        />
        <img
          src={previewImage || `${config.url}/static/${informations[name]}`}
        />
      </div>
    </Grid.Column>
  );
}
