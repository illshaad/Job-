import React, { useState, useEffect } from "react";
import axios from "axios";
import InputImageGenerique from "./InputImageGenerique";
import InputAutoCompletGenre from "./menuDeroulant/genre";
import InputImageCv from "./inputImageCv";
import InputRH from "./inputRH";
import { useHistory } from "react-router-dom";
import {
  Menu,
  Dropdown,
  Form,
  Container,
  Grid,
  Segment,
  Button,
  Message,
  Image,
  Label,
  Sidebar,
  Icon,
} from "semantic-ui-react";

import config from "../config";

export default function Presentation({ dataFromAPI, setDataFromAPI }) {
  console.log(dataFromAPI);

  const [informations, setInformations] = useState({
    _id: "",
    prenom: "",
    nom: "",
    genre: "",
    nomnaissance: "",
    datenaissance: "",
    villedenaissance: "",
    nationalite: "",
    numerosecurite: "",
    ville: "",
    addresse: "",
    cp: "",
    email: "",
    telephonePerso: "",
    telephoneDomicile: "",
    telephoneUrgence: "",
    rpps: "",
    numeroDepartemental: "",
    departementConseil: "",
    specialitePratiquee: "",
    carnetVaccination: "",
    carteIdentite: "",
    cartePassport: "",
    carteSejour: "",
    carteVital: "",
    cv: "",
    diplomes: "",
    permisConduire: "",
    assuranceAutomobile: "",
    photo: "",
    RIB: "",
    conseildelordre: "",
    ONCD: "",
    RCP: "",
    radioProtectionPatients: "",
    radioProtectionTravailleurs: "",
    matériels: "",
    déclaration: "",
    fichedeposte: "",
    fichesynthetique: "",
    avantagesennature: "",
    mutuelle: "",
    onboarding: "",
    adli: "",
    aptitudeMedicale: "",
    attestationAssuranceHabitation: "",
    autreContratsTravailCours: "",
    lettreMotivation: "",
    casierJudiciaire: "",
    genre: "",
  });

  let history = useHistory();
  const [message, setMessage] = useState("");
  // const [error, setError] = useState({});
  const [collabo, setCollabo] = useState({});
  const [update, setUpdate] = useState({ email: localStorage.getItem("name") });
  const [updateFile, setUpdateFile] = useState();
  const [valueEmail, setValueEmail] = useState("");
  const [dataCollaborateurs, setDataCollaborateurs] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios
      .post(`${config.url}/gestionPerso`, {
        email: localStorage.getItem("name"),
      })
      .then((response) => {
        setCollabo(response.data.isCollabo);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(`${config.url}/idCollaborateur`, {
        email: localStorage.getItem("name"),
      });

      setDataCollaborateurs(result.data);
    };
    fetchData();
  }, []);

  //Recuperation du IsCollabo true || False pour faire des conditions //
  useEffect(() => {
    if (collabo) {
      setInformations({
        prenom: dataFromAPI.name.givenName ? dataFromAPI.name.givenName : "",
        nom: dataFromAPI.name.familyName ? dataFromAPI.name.familyName : "",
        genre: dataFromAPI.customSchemas.Attributs_personnaliss.Sexe
          ? dataFromAPI.customSchemas.Attributs_personnaliss.Sexe
          : "",
        nomnaissance: dataFromAPI.name.familyName
          ? dataFromAPI.name.familyName
          : "",
        datenaissance: dataFromAPI.customSchemas.Attributs_personnaliss
          .Date_de_naissance
          ? dataFromAPI.customSchemas.Attributs_personnaliss.Date_de_naissance
          : "",
        addresse: dataFromAPI.customSchemas.Attributs_personnaliss
          .Adresse_personnel
          ? dataFromAPI.customSchemas.Attributs_personnaliss.Adresse_personnel
          : "",
        cp: dataFromAPI.customSchemas.Attributs_personnaliss
          .Code_postal_personnel
          ? dataFromAPI.customSchemas.Attributs_personnaliss
              .Code_postal_personnel
          : "",
        ville: dataFromAPI.customSchemas.Attributs_personnaliss
          .Commune_personnel
          ? dataFromAPI.customSchemas.Attributs_personnaliss.Commune_personnel
          : "",
        villedenaissance: dataFromAPI.customSchemas.Attributs_personnaliss
          .Lieu_de_naissance
          ? dataFromAPI.customSchemas.Attributs_personnaliss.Lieu_de_naissance
          : "",
        numerosecurite: dataFromAPI.customSchemas.Attributs_personnaliss
          .Scurit_sociale
          ? dataFromAPI.customSchemas.Attributs_personnaliss.Scurit_sociale
          : "",
        nationalite: dataFromAPI.customSchemas.Attributs_personnaliss.Nationalit
          ? dataFromAPI.customSchemas.Attributs_personnaliss.Nationalit
          : "",
        email: dataFromAPI.emails ? dataFromAPI.emails[0].address : "",

        telephonePerso: dataFromAPI.recoveryPhone
          ? dataFromAPI.recoveryPhone
          : "",

        telephoneDomicile: dataFromAPI.customSchemas.Attributs_personnaliss
          .Tlphone_domicile
          ? dataFromAPI.customSchemas.Attributs_personnaliss.Tlphone_domicile
          : "",
        telephoneUrgence: dataFromAPI.customSchemas.Attributs_personnaliss
          .Tlphone__appeler_en_cas_durgence
          ? dataFromAPI.customSchemas.Attributs_personnaliss
              .Tlphone__appeler_en_cas_durgence
          : "",
      });
    }
  }, [collabo, dataFromAPI]);

  console.log(informations, "API ");

  const handleChange = (e, { value, name }) => {
    setInformations({ ...informations, [e.target.name || name]: value });
    setUpdate({ ...update, [e.target.name || name]: value });
    setValueEmail({ ...valueEmail, [name]: value });
  };

  const handleChangeFile = (e) => {
    setInformations({ ...informations, [e.target.name]: e.target.files[0] });
    setUpdateFile({ ...updateFile, [e.target.name]: e.target.files[0] });
  };

  const buttonRedirect = async () => {
    await axios
      .post(
        "https://gsuite-api-dot-projet-test-doctegestio.uc.r.appspot.com/getGsuiteUser",
        { email: valueEmail.email }
      )
      .then((res) => {
        setDataFromAPI(res.data);
        const nomPrenom = valueEmail.email.split("@")[0].replace(".", "/");
        history.push(`/collaborateur/${nomPrenom}`);
      });
  };

  const buttonRedirectRh = async () => {
    const email = localStorage.getItem("name");
    await axios
      .post(
        "https://gsuite-api-dot-projet-test-doctegestio.uc.r.appspot.com/getGsuiteUser",
        { email: email }
      )
      .then((res) => {
        setDataFromAPI(res.data);
      });
    const nomPrenom = email.split("@")[0].replace(".", "/");
    history.push(`/collaborateur/${nomPrenom}`);
  };

  const sendData = async () => {
    try {
      const keys = Object.keys(updateFile);
      const data = new FormData();
      const sendEmailFile = localStorage.getItem("name");
      data.append("email", sendEmailFile);
      for (const i in keys) {
        data.append(keys[i], updateFile[keys[i]]);
      }
      const response = await axios({
        method: "post",
        url: "https://gsuite-api-dot-projet-test-doctegestio.uc.r.appspot.com/updateGSuiteUser",
        data: update,
        // ",
      });
      const responseFile = await axios({
        method: "post",
        url: `${config.url}/file`,
        data: data,
      });
      setUpdate({});
      // setInformations(response.data)
      setMessage("Donnée enregistrer");
    } catch (error) {
      console.log(error);
    }
    history.push("/ok");
  };

  return (
    <>
      <Menu size="massive">
        {collabo ? (
          <Icon
            className="burger"
            name="bars"
            size="large"
            onClick={() => setVisible(true)}
            label={{ children: <code>visible</code> }}
          />
        ) : null}
        <Menu.Item name="Embarquer" />
        <Menu.Menu position="right">
          <Menu.Item>{localStorage.getItem("name")}</Menu.Item>
        </Menu.Menu>
      </Menu>
      <Grid.Column>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width="wide"
          >
            <Menu.Item>
              <h5 className="informations" onClick={buttonRedirectRh}>
                Mes informations
              </h5>
              <h5>Mes collaborateurs</h5>

              <h5>Les collaborateurs de mon périmètre (RH)</h5>

              <Dropdown
                name="email"
                onChange={handleChange}
                placeholder="Collaborateur"
                fluid
                search
                options={dataCollaborateurs}
              />

              <Button className="buttonRh" size="mini" onClick={buttonRedirect}>
                Ok
              </Button>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <Container>
              {collabo ? (
                <Image src="/rh.jpg" size="huge" centered="true" />
              ) : (
                <Image src="/Embarquer.png" size="huge" centered="true" />
              )}
              <Grid.Row>
                <Label circular size="massive">
                  1
                </Label>
                <h3>Informations à remplir par le collaborateur (5/15)</h3>
              </Grid.Row>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <b>Prenom</b>
                    <Form.Input
                      fluid
                      name="prenom"
                      value={informations.prenom}
                      onChange={handleChange}
                      placeholder="Prénom"
                    />
                    <br />
                    <Form.Input
                      fluid
                      name="datenaissance"
                      value={informations.datenaissance}
                      onChange={handleChange}
                      label="Date de naissance"
                      placeholder="Date de naissance"
                    />
                    <br />
                    <Form.Input
                      fluid
                      name="addresse"
                      value={informations.addresse}
                      onChange={handleChange}
                      label="Addresse"
                      placeholder="Addresse"
                    />
                    <br />
                    <Form.Input
                      fluid
                      name="email"
                      value={informations.email}
                      onChange={handleChange}
                      label="Email (personnel)"
                      placeholder="Email (personnel)"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Input
                      fluid
                      name="nom"
                      value={informations.nom}
                      onChange={handleChange}
                      label="Nom"
                      placeholder="Nom"
                    />
                    <br />
                    <Form.Input
                      fluid
                      name="villedenaissance"
                      value={informations.villedenaissance}
                      onChange={handleChange}
                      label="Ville de naissance"
                      placeholder="Ville de naissance"
                    />
                    <br />
                    <Form.Input
                      fluid
                      name="cp"
                      value={informations.cp}
                      onChange={handleChange}
                      label="Code postal"
                      placeholder="Code postal"
                    />
                    <br />
                    <Form.Input
                      fluid
                      name="numerosecurite"
                      value={informations.numerosecurite}
                      onChange={handleChange}
                      label="N° sécurite social"
                      placeholder="N° sécurite social"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <InputAutoCompletGenre
                      title="Genre"
                      name="genre"
                      informations={informations.genre}
                      handleChange={handleChange}
                    />
                    <br />
                    <Form.Input
                      fluid
                      name="nomnaissance"
                      value={informations.nomnaissance}
                      onChange={handleChange}
                      label="Nom de naissance"
                      placeholder="Nom de naissance"
                    />
                    <br />
                    <Form.Input
                      fluid
                      name="ville"
                      value={informations.ville}
                      onChange={handleChange}
                      label="Ville"
                      placeholder="Ville"
                    />
                    <br />
                    <Form.Input
                      fluid
                      name="nationalite"
                      value={informations.nationalite}
                      onChange={handleChange}
                      label="Nationalité"
                      placeholder="Nationalité"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Input
                      fluid
                      name="telephonePerso"
                      value={informations.telephonePerso}
                      onChange={handleChange}
                      label="Téléphone portable (personnel)"
                      placeholder="Téléphone portable (personnel)"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Input
                      fluid
                      name="telephoneDomicile"
                      value={informations.telephoneDomicile}
                      onChange={handleChange}
                      label="Téléphone domicile"
                      placeholder="Téléphone domicile"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Input
                      fluid
                      name="telephoneUrgence"
                      value={informations.telephoneUrgence}
                      onChange={handleChange}
                      label="Téléphone à appeler en cas d'urgence"
                      placeholder="Téléphone à appeler en cas d'urgence"
                    />
                  </Grid.Column>
                  <Grid.Column></Grid.Column>
                </Grid.Row>
              </Grid>
              <Form>
                <br />
                <Segment className="segmentPerso" size="small">
                  Réservé aux praticiens (1/4)
                </Segment>
                <Grid columns={3}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        name="rpps"
                        onChange={handleChange}
                        value={informations.rpps}
                        label="N° RPPS"
                        placeholder="N° RPPS"
                      />
                      <Form.Input
                        fluid
                        name="numeroDepartemental"
                        value={informations.numeroDepartemental}
                        onChange={handleChange}
                        label="N° Départemental Conseil de l’Ordre"
                        placeholder="N° Départemental Conseil de l’Ordre"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        name="departementConseil"
                        value={informations.departementConseil}
                        onChange={handleChange}
                        label="Département Conseil de l’Ordre"
                        placeholder="Département Conseil de l’Ordre"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        name="specialitePratiquee"
                        value={informations.specialitePratiquee}
                        onChange={handleChange}
                        label="Spécialité pratiquée au centre"
                        placeholder="Spécialité pratiquée au centre"
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <br />
                <br />
                <h3>Documents à fournir par le collaborateur (10/15)</h3>
                <Grid columns={3} divided>
                  <Grid.Row>
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Carte national ou passport "
                      handleChangeFile={handleChangeFile}
                      name={"carteIdentitePassport"}
                    />
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Carte Vital"
                      handleChangeFile={handleChangeFile}
                      name="carteVital"
                    />
                    <InputImageCv
                      informations={informations}
                      setInformations={setInformations}
                      title="CV"
                      handleChangeFile={handleChangeFile}
                      name="cv"
                    />
                  </Grid.Row>
                </Grid>
                <Grid columns={3} divided>
                  <Grid.Row>
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Carnet Vaccinal"
                      handleChangeFile={handleChangeFile}
                      name="carnetVaccination"
                    />
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Diplômes"
                      handleChangeFile={handleChangeFile}
                      name="diplomes"
                    />
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Photo"
                      handleChangeFile={handleChangeFile}
                      name="photo"
                    />
                  </Grid.Row>
                </Grid>
                <Grid columns={3} divided>
                  <Grid.Row>
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="RIB"
                      handleChangeFile={handleChangeFile}
                      name="RIB"
                    />
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Aptitude médicale au travail"
                      handleChangeFile={handleChangeFile}
                      name="aptitudeMedicale"
                    />
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Permis de conduire"
                      handleChangeFile={handleChangeFile}
                      name="permisConduire"
                    />
                  </Grid.Row>
                </Grid>
                <Grid columns={3} divided>
                  <Grid.Row>
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Assurance automobile"
                      handleChangeFile={handleChangeFile}
                      name="assuranceAutomobile"
                    />
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Attestation assurance habitation"
                      handleChangeFile={handleChangeFile}
                      name="attestationAssuranceHabitation"
                    />
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Autres contrats de travail en cours"
                      handleChangeFile={handleChangeFile}
                      name="autreContratsTravailCours"
                    />
                  </Grid.Row>
                </Grid>
                <Grid columns={3} divided>
                  <Grid.Row>
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Lettre de motivation"
                      handleChangeFile={handleChangeFile}
                      name="lettreMotivation"
                    />
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Carte de séjour"
                      handleChangeFile={handleChangeFile}
                      name="carteSejour"
                    />
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Extrait de casier judiciaire "
                      handleChangeFile={handleChangeFile}
                      name="casierJudiciaire"
                    />
                  </Grid.Row>
                </Grid>
                <Segment className="segmentPerso" size="small">
                  Réservé aux praticiens (3/5)
                </Segment>
                <Grid columns={3} divided>
                  <Grid.Row>
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Attestion d'assurance RCP"
                      handleChangeFile={handleChangeFile}
                      name="RCP"
                    />
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="ONCD"
                      handleChangeFile={handleChangeFile}
                      name="ONCD"
                    />
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Attestation d’inscription au tableau du conseil de l’Ordre"
                      handleChangeFile={handleChangeFile}
                      name="conseildelordre"
                    />
                  </Grid.Row>
                </Grid>
                <Grid columns={3} divided>
                  <Grid.Row>
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Attestation de formation à la Radioprotection patients"
                      handleChangeFile={handleChangeFile}
                      name="radioProtectionPatients"
                    />
                    <InputImageGenerique
                      informations={informations}
                      setInformations={setInformations}
                      title="Attestation de formation à la Radioprotection travailleurs"
                      handleChangeFile={handleChangeFile}
                      name="radioProtectionTravailleurs"
                    />
                  </Grid.Row>
                </Grid>
                {collabo !== true ? (
                  <Button primary onClick={sendData}>
                    Enregistrer les données
                  </Button>
                ) : null}
              </Form>
              {/* je passe le props  disable et la condition au composant RH (SI collaborateur n'est pas RH je lui donne pas les droits au composant RH) */}
              <InputRH
                dataFromAPI={dataFromAPI}
                id={informations._id}
                informationsRH={informations}
                updateCollaborateur={update}
                updateFileCollaborateur={updateFile}
                disable={collabo !== true}
              />
              {message ? (
                <Message positive>
                  <Message.Header>Donnée enregistrer</Message.Header>
                </Message>
              ) : null}
            </Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </>
  );
}
