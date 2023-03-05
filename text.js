/**
 * Vérifie si du texte est déjà placé,
 * si ce n'est pas le cas, ajoute le texte placé en paramètre
 * @param {string} txt 
 */
export function addText(txt){
    const el=document.getElementById("text").firstChild;
    const val=el.nodeValue;
    if(val!=' '){ // évalue si il y a deja du texte
        alert('Merci de cliquer sur le bouton couleur associé au mot'); //TODO : à modifier car stoppe l'expérience pendant un record
    }
    else{
        document.getElementById("text").innerHTML = txt;
    }
}

/**
 * Supprime le texte
 */
export function deleteText(){
    document.getElementById("text").innerHTML =' ';
}

/**
 *  Cache le menu et active le bouton de l'expérience
 */
export function hideMenu(){
    if(document.getElementById("check").checked){//si checkbox cochée
        document.getElementById("menu").style.display="none";
        document.getElementById('start').disabled = false;
    }
    else{//si checkbox décochée
       alert("Vous devez d'abord confirmer votre consentement pour lancer l'expérience.")
    }
}