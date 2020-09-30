import React from "react";
import { Dropdown, Grid } from "semantic-ui-react";

export default function Genre({ handleChange, disable, informations }) {
  const data = [
    { key: "Homme", value: "Homme", text: "Homme" },
    { key: "Femme", value: "Femme", text: "Femme" },
  ];
  console.log(informations, "GENRE");
  return (
    <Grid>
      <div className="autoCompletTitre">Genre</div>
      <Dropdown
        onChange={handleChange}
        placeholder="Genre"
        fluid
        search
        name="genre"
        disabled={disable}
        selection
        value={informations}
        options={data}
      />
    </Grid>
  );
}
