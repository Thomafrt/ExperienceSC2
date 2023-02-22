function hideCursor(){
    el = document.getElementsByTagName("body");
    el.style.backgroundColor = 'red';
    //setTimeout(showCursor(),3000)
}

function showCursor(){
    document.getElementsByClassName("start").style.cursor='default';

}

function elementPositionL (a) { //renvoie la position coin haut gauche d'un objet
    return {
      clientX: a.offsetLeft,
      clientY: a.offsetTop,
    }
  }

function showPos(a,){ //affiche la distance entre le coin haut gauche du bouton start au coin haut gauche des boutons de gauche
    let elb = document.getElementById('bleu');
    let elr = document.getElementById('rouge');
    let els = document.getElementById('start');
    let pb = elementPositionL(elb)
    let pr = elementPositionL(elr)
    let psL = elementPositionL(els)
    console.log((psL.clientX-pb.clientX)+(psL.clientY-pb.clientY))
    console.log((psL.clientX-pr.clientX)+(psL.clientY-pr.clientY))
}

//el.addEventListener('click',hideCursor); //!Erreur



function startButton(){
    //inserer toutes les actions
}
