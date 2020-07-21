const db = require('./db');

const collaborateursSchema = db.mongoose.Schema({
    prenom: String,
    nom: String,
    genre: String,
    dateDeNaissance: Date,
    villeDeNaissance: String,
    nomDeNaissance: String,
    nationalite: String,
    numerosecurite: Number,
    addresse: String,
    cp: Number,
    ville: String,
    email: String,
    telephonePerso: Number,
    telephoneDomicile: Number,
    telephoneUrgence: Number,
    rpps: Number,
    numeroDepartemental: Number,
    departementConseil: String,
    specialitePratiquee: String
});


const collaborateursModel = db.mongoose.model('collaborateurs', collaborateursSchema);

module.exports = collaborateursModel;