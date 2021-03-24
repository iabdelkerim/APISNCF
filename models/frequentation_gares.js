//importation de mongoose
const mongoose = require('mongoose');

//création d'un deuxième modèle poour pouvoir l'utiliser dans ma base de données
const GareSchema = new mongoose.Schema({
    Gare: String,
    code_postal: String,
    Total_voyageur: Number,
});

//export
module.exports = mongoose.model('Frequentation_gares',GareSchema);