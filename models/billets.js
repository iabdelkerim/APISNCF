//importation de mongoose
const mongoose = require('mongoose');

//création d'un modèle poour pouvoir l'utiliser dans ma base de données
const ticketSchema = new mongoose.Schema({
    Regions: String,
    Trajet: String,
    Abonnement : String,
    Prix : Number,
});

//export
module.exports = mongoose.model('Billet',ticketSchema);

