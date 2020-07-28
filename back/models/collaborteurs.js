const db = require('./db');

const collaborateursSchema = db.mongoose.Schema({
    prenom: String,
    nom: String,
    genre: String,
    dateDeNaissance: String,
    villeDeNaissance: String,
    nomDeNaissance: String,
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
    specialitePratiquee: String
});


const collaborateursModel = db.mongoose.model('collaborateurs', collaborateursSchema);

module.exports = collaborateursModel;