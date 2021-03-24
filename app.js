//imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();

const ticketRoutes = require('./routes/billets');
const gareRoutes = require('./routes/frequentation_gares');

mongoose.connect("mongodb+srv://username:password@cluster.****.mongodb.net/apisncf?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((e) => console.log('Connexion à MongoDB échouée !'));


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/billets', ticketRoutes);
app.use('/api/frequentation-gares', gareRoutes);


module.exports = app;
