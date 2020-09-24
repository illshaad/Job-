import React, { useState } from "react";
import { Container, Image, Segment } from "semantic-ui-react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Google({ setDataFromAPI }) {
  let history = useHistory();
  //Envoie de la donnée au back//
  // Utilisation du localStorage pour sauvergarder email apres le click du button google//
  const responseGoogle = async (response) => {
    const emailResponse = await response.rt.$t;
    //envoie EMAIL RESPONSE  A DIMITRI//
    await axios
      .post(
        "https://gsuite-api-dot-projet-test-doctegestio.uc.r.appspot.com/getGsuiteUser",
        { email: emailResponse }
      )
      .then((res) => {
        setDataFromAPI(res.data);
      });

    const nomPrenom = await emailResponse.split("@")[0].replace(".", "/");
    localStorage.setItem("name", emailResponse);
    await axios
      .post("http://localhost:3000/gestionPerso", {
        email: localStorage.getItem("name"),
      })
      .then((response) => {
        {
          history.push(`/collaborateur/${nomPrenom}`);
        }
      });
  };
  return (
    <div>
      <Image
        style={{ marginTop: 100 }}
        src="./Doctegestio.png"
        size="medium"
        centered="true"
      />
      <Image
        src="./pcDocte.png"
        style={{ marginTop: 30 }}
        size="small"
        centered="true"
      />
      <Container>
        <Segment style={{ marginTop: 30 }}>
          <p style={{ textAlign: "center" }}>
            Nous avons besoin de vous authentifier pour vous donner l'accès à
            l'application.
          </p>
          <div className="google">
            <GoogleLogin
              icon="false"
              clientId="939765445894-gkfl9fd7gpd2vehkhdp1ju8g7760p2ca.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Se connecter avec Doctegestio
                </button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </Segment>
      </Container>
    </div>
  );
}
