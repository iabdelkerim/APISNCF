
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const uri = "mongodb+srv://username:password@cluster.****.mongodb.net/apisncf?retryWrites=true&w=majority"
var fs=require('fs');

async function createDatabase(){
    // connect to your cluster
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // specify the DB's name
    const db = client.db("apisncf");
    // create database
    return db;
}

function getDataFromFile(path)
{
    var data = fs.readFileSync(path,"utf-8");
    return JSON.parse(data);
}


const ticketSchema = new mongoose.Schema({
    Regions: String,
    Trajet:String,
    Abonnement : String,
    Prix : Number,
});

const Billet = mongoose.model('Billet',ticketSchema);

const GareSchema = new mongoose.Schema({
    Gare: String,
    code_postal: String,
    Total_voyageur: Number,
});

const Gare = mongoose.model('Frequentation_gares',GareSchema);


function connectToDBMongoose(){
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    return db;
}


function populationDatabaseMongoose(){
    connectToDBMongoose().once('open', function(){
        console.log('connected to my database');
        let rawData = getDataFromFile("./tarifs-ter-par-od.json");
        let freqData = getDataFromFile("./frequentation-gares.json");

        //on recupere ici  les données qu'on a besoin du fichier tarifs-ter-par-od.json pour l'enregistrer sur notre base de données
        for(let i = 0 ; i < rawData.length; i ++) {
            let element = rawData[i].fields;
            
            const billet = new Billet({
                Regions: element.region,
                Trajet : element.origine+" - "+element.destination,
                Abonnement : element.tarif_normal_abo_jeune_abo_tout_public,
                Prix : element.prix_eu,
            });
            billet.save(function(err,billet){
                console.log(billet);
            });
        }
        
        //on recupere ici  les données qu'on a besoin du fichier frequentation-gares.json pour l'enregistrer sur notre base de données
        for(let i = 0 ; i < freqData.length; i ++) {
            let donnees = freqData[i].fields;
            
            const gare = new Gare({
                Gare: donnees.nom_gare,
                code_postal: donnees.code_postal,
                Total_voyageur: donnees.total_voyageurs_2019,
            });
            gare.save(function(err,gare){
                console.log(gare);
            });
        }
    });
}

//populationDatabaseMongoose();


//fonction pour trouver le type d'abonnement le plus vendu
async function countTicket(){

    let db = await createDatabase();
    let collection = await db.collection("billets");

    let ab = await collection.aggregate([ { $group : { _id : "$Abonnement",nb_abonnement:{$sum:1}}}]).toArray();

    console.log(ab);
    
}

//countTicket();



//top 5 des gares les plus frequentés par les voyageurs
function GareLesplusFrequentées(){
    connectToDBMongoose().once('open', function(){
        Gare.find().sort({Total_voyageur: -1}).limit(5).exec(function(err,Frequentation_gares) { console.log(Frequentation_gares); });

    });
}
//GareLesplusFrequentées();



//Top 10 des trajets les plus empruntées par les voyageurs
async function trajet(){

    let db = await createDatabase();
    let collection = await db.collection("billets");

    let ab = await collection.aggregate([{ $group : { _id : "$Trajet",total_trajet:{$sum:1}}},{$sort : {total_trajet:-1}}]).limit(10).toArray();

    console.log(ab);
    
}
//trajet();
