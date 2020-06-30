const db = require('./db');

const collaborateursSchema = db.mongoose.Schema({
    prenom: String,
    nom: String,
    genre: String,
    date: Date,
    lieuNaissance: String,
    nationalite: String,
    securiteSocial: Number,
    addresse: String,
    cp: Number,
    email: String,
    telephone: String,
    praticiens: {
        rpps: Number,
        numeroDepartemental: Number,
        departementConseil: Number,
        specialitePratiquee: String
    }

});


const collaborateursModel = db.mongoose.model('collaborateurs', collaborateursSchema);

module.exports = collaborateursModel;