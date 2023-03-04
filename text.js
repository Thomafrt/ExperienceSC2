function addText(){
    const el=document.getElementById("text").firstChild;
    const val=el.nodeValue;
   // console.log(val)
    if(val===" "){ //si TRUE
        document.getElementById("text").innerHTML = 'COULEUR';
    }
    else{
        document.getElementById("text").innerHTML = " ";
    }
}

function hideMenu(){ //cache le menu et active le bouton de l'expérience
    if(document.getElementById("check").checked){//si checkbox cochée
        document.getElementById("menu").style.display="none";
        document.getElementById('start').disabled = false;
    }
    else{//si checkbox décochée
       alert("Vous devez d'abord confirmer votre consentement pour lancer l'expérience.")
    }
}