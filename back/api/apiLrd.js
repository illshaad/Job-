const express = require("express");
const router = express.Router();
const axios = require("axios");
const keysTest = "AIzaSyDrV4JRyQejPvpgYk-H4ls2IwhxQOm6xx4";

//TEMPS DE TRAVAIL
router.get("/tempsTravail", async function (req, res, next) {
  const responseTempsTravail = await axios.get(
    `https://test.api.dg.fr/workdurations?api_key=${keysTest}`
  );
  const object = responseTempsTravail.data.map((e) => {
    return {
      key: e.label,
      text: e.label,
      value: e.label,
    };
  });

  res.status(200).json(object);
});

//TYPE USER //
router.get("/user", async function (req, res, next) {
  const responseUser = await axios.get(
    `https://test.api.dg.fr/usertypes?api_key=${keysTest}`
  );
  const object = responseUser.data.map((e) => {
    return {
      key: e.label,
      text: e.label,
      value: e.label,
    };
  });
  res.status(200).json(object);
});

//ACTIVITE//
router.get("/activities", async function (req, res, next) {
  const responseActivities = await axios.get(
    `https://test.api.dg.fr/activities?api_key=${keysTest}`
  );
  const object = responseActivities.data.map((e) => {
    return {
      key: e.name,
      text: e.name,
      value: e.name,
    };
  });
  res.status(200).json(object);
});

//ETABLISSEMENT DIRECTION//
router.get("/etablissement", async function (req, res, next) {
  const responseEtablissement = await axios.get(
    `https://test.api.dg.fr/establishments/digitalnames?api_key=${keysTest}`
  );
  const object = responseEtablissement.data.map((e) => {
    return {
      key: e.digitalName,
      text: e.digitalName,
      value: e.digitalName,
    };
  });
  res.status(200).json(object);
});

//FONCTION//
router.get("/fonction", async function (req, res, next) {
  const responseFonction = await axios.get(
    `https://test.api.dg.fr/functions?api_key=${keysTest}`
  );
  const object = responseFonction.data.map((e) => {
    return {
      key: e.name,
      text: e.name,
      value: e.name,
    };
  });
  res.status(200).json(object);
});

module.exports = router;
