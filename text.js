export function addText(txt){
    const el=document.getElementById("text").firstChild;
    const val=el.nodeValue;
    if(val!=' '){ // si il y a deja du texte
        alert('merci de cliquer sur une couleur');
    }
    else{
        document.getElementById("text").innerHTML = txt;
    }
    
}
export function deleteText(){
    document.getElementById("text").innerHTML =' ';
}

export function hideMenu(){ //cache le menu et active le bouton de l'expérience
    if(document.getElementById("check").checked){//si checkbox cochée
        document.getElementById("menu").style.display="none";
        document.getElementById('start').disabled = false;
    }
    else{//si checkbox décochée
       alert("Vous devez d'abord confirmer votre consentement pour lancer l'expérience.")
    }
}

/* Evaluer un text

    const el=document.getElementById("text").firstChild;
    const val=el.nodeValue;
    if(val===' '){

*/
