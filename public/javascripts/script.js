var buildObject, displayResult, enregistrer, envoyerVerServer, save, saveToServer, sendSex, surligne, validerDate, validerTel, verifChamp, verifModifChamp, verifSaveChamp;

validerTel = function(tel) {
  var patron, vExpression;
  patron = /^[0-9]{3}\s+[0-9]{3}-[0-9]{4}$/;
  vExpression = new RegExp(patron);
  if (vExpression.test(tel.value)) {
    surligne(tel, false);
    return true;
  } else {
    alert("Saisissez le numero avec ce format: XXX XXX-XXXX");
    surligne(tel, true);
    return false;
  }
};

validerDate = function(date) {
  var patron, vExpression;
  patron = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
  vExpression = new RegExp(patron);
  if (vExpression.test(date.value)) {
    surligne(date, false);
    return true;
  } else {
    alert("Saisissez la date avec ce format: yyyy-mm-dd");
    surligne(date, true);
    return false;
  }
};

sendSex = function(sexe) {
  if (sexe.value === "M") {
    return sexe.value = 1;
  } else {
    if (sexe.value === "F") return sexe.value = 2;
  }
};

verifPrix = function(prix){
  var patron, vExpression;
  patron = /^[0-9]+.[0-9]{2}$/;
  vExpression = new RegExp(patron);
  if (vExpression.test(prix.value)) {
    if(prix <= 0.00){
      alert("Saisissez le prix avec ce format: XX.XX");
      surligne(prix, true);
     return false;  
    }
    surligne(prix, false);
    return true;
  } else {
    alert("Saisissez le prix avec ce format: XX.XX");
    surligne(prix, true);
    return false;
  }
};

surligne = function(champ, erreur) {
  if (erreur) {
    return champ.style.backgroundColor = "#fba";
  } else {
    return champ.style.backgroundColor = "";
  }
};

verifChamp = function(champ) {
  if (!champ.value || (champ.value.length < 2)) {
    alert("Le champ en surbrillance doit contenir au moins 2 carateres ");
    surligne(champ, true);
    return false;
  } else {
    surligne(champ, false);
    return true;
  }
};

verifModifChamp = function(corps){
  saveToServer  

};

enregistrer = function() {
  var objectToSave;
  objectToSave = buildObject();
  return envoyerVerServer(objectToSave, displayResult);
};

buildObject = function() {
  var date, desc, jour, mois, para, premier, result, second, tail, temp;
  var article = {};
    article.nom              = document.getElementById("nom");
    article.prix             = document.getElementById("prix");
    article.description      = document.getElementById("desc");    
    article.categorie        = document.getElementById("categorie");
    article.marque           = document.getElementById("marque");
    article.model            = document.getElementById("model");
    article.url              = document.getElementById("url");
    article.idArticle        = document.getElementById("idArticle");
  return article;
};

displayResult = function(savedObject) {
  return console.log("Document sauvegardé : " + JSON.stringify(savedObject));
};

envoyerVerServer = function(objectToSave, callback) {
  var jsonData, xhr;
  xhr = new XMLHttpRequest();
  console.log("dans save");
  xhr.open("PUT", "/sauvegarde", true);
  jsonData = JSON.stringify(objectToSave);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(jsonData);
  return xhr.onreadystatechange = function() {
    var ent;
    if (xhr.readyState === 4 && xhr.status !== 500) {
      ent = parseInt(xhr.responseText);
      return window.location.replace("/" + ent);
    }
  };
};
