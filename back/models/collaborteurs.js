const db = require('./db');

const collaborateursSchema = db.mongoose.Schema({
    //COLLABORATEUR INPUT//
    prenom: String,
    nom: String,
    genre: String,
    datenaissance: String,
    villedenaissance: String,
    nomnaissance: String,
    nationalite: String,
    numerosecurite: String,
    addresse: String,
    cp: String,
    ville: String,
    email: String,
    telephonePerso: String,
    telephoneDomicile: String,
    telephoneUrgence: String,
    rpps: String,
    numeroDepartemental: String,
    departementConseil: String,
    specialitePratiquee: String,
    //COLLABORATEUR IMG//
    carteIdentitePassport: String,
    carteVital: String,
    cv: String,
    carnetVaccination: String,
    diplomesRh: String,
    diplomes: String,
    photo: String,
    RIB: String,
    aptitudeMedicale: String,
    permisConduire: String,
    assuranceAutomobile: String,
    attestationAssuranceHabitation: String,
    contratsTravailCours: String,
    lettreMotivation: String,
    carteSejour: String,
    casierJudiciaire: String,
    RCP: String,
    ONCD: String,
    conseildelordre: String,
    radioProtectionPatients: String,
    radioProtectionTravailleurs: String,
    //INPUT RH//
    materiels: String,
    autreContratsTravailCours: String,
    declaration: String,
    fichedeposte: String,
    fichesynthetique: String,
    avantagesennature: String,
    mutuelle: String,
    onboarding: String,
    fonctiondigitalsecondaire: String,
    datePriseDeFonction: String,
    telephonetravail: String,
    telephonemobile: String,
    adressetravail: String,
    activite: String,
    emailresponsable: String,
    etablissement: String,
    fonctiondigital: String,
    juridique: String,
    collaborateur: String,
    convention: String,
    coefficient: String,
    erp: String,
    naturetravail: String,
    tempstravail: String,
    classification: String,
    niveau: String,
    indice: String,
    remunerationbrutemensuelle: String,
    remunerationbrutejournaliere: String,
    remunerationbruteannuelle: String,
    remunerationbrutehoraire: String,
    nombreheureshebdomadairedusalarie: String,
    nombreheuresmensueldusalarie: String,
});


const collaborateursModel = db.mongoose.model('collaborateurs', collaborateursSchema);

module.exports = collaborateursModel;