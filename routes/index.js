var mongo = require('mongodb');
var BSON = mongo.BSONPure;

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
