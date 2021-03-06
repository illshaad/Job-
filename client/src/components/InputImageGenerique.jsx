import React from "react";
import { Grid } from "semantic-ui-react";

export default function InputImageGenerique({
  title,
  name,
  handleChangeFile,
  disable,
}) {
  return (
    <Grid.Column>
      <Grid.Row>
        <h4>{title}</h4>
        <input
          type="file"
          name={name}
          disabled={disable}
          onChange={(e) => {
            handleChangeFile(e);
          }}
        />
      </Grid.Row>
    </Grid.Column>
  );
}
