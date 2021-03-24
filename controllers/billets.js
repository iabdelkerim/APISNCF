//importation du modèle pour les données concernant le tarif des billets par trajet
const Billet = require('../models/billets');


//exportations des méthodes GET,POST,DELETE,UPDATE 
exports.createTicket = (req, res, next) => {
    delete req.body._id;
    const billet = new Billet({
        ...req.body
    });
    billet
        .save()
        .then(() => res.status(201).json({message: 'Billet ajouté'}))
        .catch(error => res.status(400).json({error}));
};

exports.getOneTicket = (req, res, next) => {
    Billet.findOne({_id: req.params.id})
        .then(billet => res.status(200).json(billet))
        .catch(error => res.status(404).json({error}));
};

exports.getAllTicket = (req, res, next) => {
    Billet.find()
        .then(billets => res.status(200).json(billets))
        .catch(error => res.status(400).json({error}));
};

exports.updateTicket= (req, res, next) => {
    Billet.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Billet modifié'}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteTicket= (req, res, next) => {
    Billet.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Billet supprimé'}))
        .catch(error => res.status(400).json({error}));
}