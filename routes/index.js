var mongo = require('mongodb');
var BSON = mongo.BSONPure;
var url = "/public/css/iamges/";
module.exports = function(app, db) {

    app.get("/", function(req, res) {
        db.collection('article', function(err, collection) {
            collection.find().toArray(function(err, objets) {
                if(err) {
                    console.log("Erreur sur la récupération de l'article!");
                    res.send(500, 'Erreur interne');
                }
                console.log(objets);
             res.render("index",{ 'donnee':objets}); 
            });
        });
       
    });
    
       
    app.get("/admin/publier", function(req, res) {
        res.render('formulaire');
    });
    
    app.get("/enregistrement/nouveau_membre", function(req, res) {
        res.render('enregistrer');
    });
    
    app.get("/membre/profile", function(req, res) {
        res.render('profile');
    });
    
    app.get("/administrateur", function(req, res) {
        res.render('administrer');
    });
    
    
    app.use(function(req, res, next){
        res.setHeader('Content-Type');
        res.send(404, 'Page introuvable !');
    });
};

creerArticle = function(art){
    var article;
    
    article.nom              = art.getElementById("nom");
    article.prix             = art.getElementById("prix");
    article.description      = art.getElementById("desc");
    article.categorie        = art.getElementById("categorie");
    article.url              = url + "" + art.getElementById();
    var date                 = new Date();
    mois                     = date.getMonth() + 1;
    jour                     = date.getDate();
    if (mois < 10) mois      = "0" + mois;
    if (jour < 10) jour      = "0" + jour;
    article.dateDeCreation   = date.getFullYear() + "-" + mois + "-" + jour;
    article.idDuCreateur     = art.getElementById();
    article.idArticle        = "" + article.dateDeCreation + article.nom ;
    
  return arcticle;
    
}; 

creerMembre = function (document){
    var membre;
       
    membre.courriel      = document.getElementById(); 
    if(document.getElementById()) membre.userName = document.getElementById();
    else membre.userName = membre.courriel;
    membre.nom           = document.getElementById();
    membre.prenom        = document.getElementById();
    membre.adresse       = document.getElementById();
    membre.codePostal    = document.getElementById();
    membre.pays          = document.getElementById();    
    membre.sex           = document.getElementById();
    membre.idMembre      = membre.courriel;
    membre.statut        = 'membre'; //M pour membre,  C pour commercial, A pour admin
};
