var buildObject, displayResult, enregistrer, registerToServer, save, saveToServer, sendSex, surligne, validerDate, validerTel, verifChamp, verifModifChamp, verifSaveChamp;

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
      alert("Saisissez la date avec ce format: yyyy-mm-dd");
      surligne(prix, true);
     return false;  
    }
    surligne(prix, false);
    return true;
  } else {
    alert("Saisissez la date avec ce format: yyyy-mm-dd");
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

