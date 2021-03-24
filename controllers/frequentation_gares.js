//importation du modèle pour les données concernant la fréquentations des gares
const Frequentation_gares = require('../models/frequentation_gares');


//exportations des méthodes GET,POST,DELETE,UPDATE 

exports.createStation = (req, res, next) => {
    delete req.body._id;
    const frequentation_gares = new Frequentation_gares({
        ...req.body
    });
    frequentation_gares
        .save()
        .then(() => res.status(201).json({message: 'Gare ajouté'}))
        .catch(error => res.status(400).json({error}));
};

exports.getOneStation = (req, res, next) => {
    Frequentation_gares.findOne({_id: req.params.id})
        .then(frequentation_gares => res.status(200).json(frequentation_gares))
        .catch(error => res.status(404).json({error}));
};

exports.getAllStation = (req, res, next) => {
    Frequentation_gares.find()
        .then(frequentation_gares => res.status(200).json(frequentation_gares))
        .catch(error => res.status(400).json({error}));
};


exports.updateStation = (req, res, next) => {
    Frequentation_gares.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Gare modifié'}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteStation = (req, res, next) => {
    Frequentation_gares.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Gare supprimé'}))
        .catch(error => res.status(400).json({error}));
}