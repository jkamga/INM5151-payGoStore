var mongo = require('mongodb');
var BSON = mongo.BSONPure;
var url = "/public/css/iamges/";
var tab_categorie = ['Desktops','Laptops','Accessoires','Logiciels','PDAs','photo','LecteursMP3'];
module.exports = function(app, db) {
    var artBd = db.collection('article');
    var memBd = db.collection('membre');
    
    app.get("/", function(req, res) {
        //inserer();
        db.collection('article', function(err, collection) {
            collection.find().toArray(function(err, objets) {
                if(err) {
                    console.log("Erreur sur la récupération de l'article!");
                    res.send(500, 'Erreur interne');
                }
                console.log(objets);
             res.render("index2",{ 'donnee':objets}); 
            });
        });
       
    });
    
    app.get("/categorie/:idCategori", function(req, res) {
        //var cat = res.params.idCategori;
        db.collection('article', function(err, collection) {
            collection.find().toArray(function(err, objets) {
                if(err) {
                    console.log("Erreur sur la récupération de l'article!");
                    res.send(500, 'Erreur interne');
                }
             res.render("categorie",{ 'donnee':objets}); 
            });
        });
    });
    
    app.put('/sauvegarde', function(req, res) {
        var objectSauve = req.body;
        var article = req.body;
        var id = article.id;
        var art;
        db.collection('article', function(err, collection) {
            collection.update( 
                 { idArticle : article.id},
                 { $set: {  
                          nom: article.nom,
                          prix: article.prix,
                          description: article.description,
                          marque: article.marque,
                          model: article.model,
                          url: article.url  
                          }
                 },
                 function(err, collection){
                    console.log("on y est: ");
                 } 
            );
         });

         res.send(200,article.id.toString());
    });
    
    app.get("/admin/mettre_a_jour", function(req, res) {
        var nom = "Dell Inspiron";
        db.collection('article', function(err, collection) {
            collection.find().toArray(function(err, objets) {
                if(err) {
                    console.log("Erreur sur la récupération de l'article!");
                    res.send(500, 'Erreur interne');
                }
                var art;
                   for(var i = 0; i < objets.length; i++) {
                      if(nom == objets[i].nom){
                       art = objets[i];
                      }
                   }
                console.log(objets);
             res.render("miseAJourArticle",{ 'monArticle':art}); 
            });
        });
    });
    
    app.post("/enregistrement/article", function(req, res) {
        var art = {};
        console.log("dans la récupératoin des articles");
        console.log(req.body);
        art = creerArticle(req.body);
        
        curseur = artBd.find();
        curseur.each(function(err, doc) {
            if(err) {
                console.log("Erreur lors de la récupératoin des articles");
                throw err;
            }

           if(doc){
                console.log("id_article: "+ doc.id);
                if(art.id == doc.id) res.render('errCreationArt',{ 'monArticle':art});
           }
        });
        
        artBd.insert(art, {safe: true}, function(err, doc) {
            if(err) {
                console.log("Erreur lors de l'ajout du billet");
                throw err;
            }

        });
        res.redirect("/article/" + art.nom);
    });
    
    app.get("/admin/article/supprimer/:nomArticle", function(req, res) {
        var id = req.body.params;
        var art;
        curseur = artBd.find();
        curseur.each(function(err, doc) {
            if(err) {
                console.log("Erreur lors de la récupératoin des articles");
                throw err;
            }

           if(doc){
             console.log("id_article: "+ doc.id);
             if(id == doc.id){ doc = art;
                artBd.remove(art, {'article': true}, function(err, numberOfRemovedDocs) {
                   console.log(numberOfRemovedDocs + " billet supprimé (doit être 1) numore est: "+id);
                });
                res.render('index2');
              }
           }
        });
        res.render('index2');
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
    
    app.get("/connexion", function(req, res) {
        res.render('connection');
    });
    app.get("/contact", function(req, res) {
        res.render('contact');
    });
    app.get("/AproposDeNous", function(req, res) {
        res.render('AproposDeNous');
    });
    app.get("/confidentialite", function(req, res) {
        res.render('confidentialite');
    });


    app.get("/article/:nomArticle", function(req, res) {
        var nom = req.params.nomArticle;
        db.collection('article', function(err, collection) {
            collection.find().toArray(function(err, objets) {
                if(err) {
                    console.log("Erreur sur la récupération de l'article!");
                    res.send(500, 'Erreur interne');
                }
                var art;
                   for(var i = 0; i < objets.length; i++) {
                      if(nom == objets[i].nom){
                       art = objets[i];
                      }
                   }
                console.log(objets);
             res.render("article",{ 'moArticle':art}); 
            });
        });
    });
    
    var inserer = function() {
            var date                 = new Date();
            mois                     = date.getMonth() + 1;
            jour                     = date.getDate();
            if (mois < 10) mois      = "0" + mois;
            if (jour < 10) jour      = "0" + jour;
            
             
            var article = {
            
                "nom"              : "Dell Inspiron",
                "prix"             : "$509.99",
                "description"      : "Oridinateur de bureau",
                "categorie"        : "Informatique",
                "marque"           : "DELL",
                "model"            : "660s",
                "url"              : 'css/images/slide-img2.jpg',
                "dateDeCreation"   : '0',
                "idDuCreateur"     : "kaizeurk",
                "idArticle"        : ''
            };
            article.dateDeCreation = date.getFullYear() + "-" + mois + "-" + jour;
            article.idArticle      = "" + article.dateDeCreation + article.nom ;
            db.collection('article', function(err, collection) {
                collection.find().toArray(function(err, objets) {
                    if(err) {
                        console.log('Erreur sur la récupération de wiki!');
                        res.send(500, 'Erreur interne');
                    }
                    
                    collection.insert(article, {safe:true}, function(err, result) {});
                });
         });

    };
    
    app.use(function(req, res, next){
        res.setHeader('Content-Type');
        res.send(404, 'Page introuvable !');
    });
};

creerArticle = function(art){
    var article = {};
    article = art;

    article.url              = url;
    var date                 = new Date();
    mois                     = date.getMonth() + 1;
    jour                     = date.getDate();
    if (mois < 10) mois      = "0" + mois;
    if (jour < 10) jour      = "0" + jour;
    article.dateDeCreation   = date.getFullYear() + "-" + mois + "-" + jour;
    article.idDuCreateur;
    article.idArticle        = ("" + (article.marque).substring(0,3) + article.nom).toUpperCase() ;
    
  return article;
    
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

determinerCategori = function (cat){
    for(var i = 0; i < tab_categorie.length;i++)
       if(tab_categorie[i] == cat) return i;
};
