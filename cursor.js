/**
 * Cache le curseur de souris
 */
function hideCursor(){ //! marche pas
    el = document.getElementsByTagName("body");
    el.style.backgroundColor = 'red';
    //setTimeout(showCursor(),3000)
}

/**
 * Affiche le curseur de souris
 */
function showCursor(){ //! marche pas
    document.getElementsByClassName("start").style.cursor='default'; 
}

/**
 * Renvoie la position coin haut gauche d'un objet passé en paramètre
 * @param {Object} a 
 * @returns un objet avec les coordonnées x et y de a en attributs
 */
function elementPositionL (a) { //
    return {
      clientX: a.offsetLeft,
      clientY: a.offsetTop,
    }
  }

  /**
   * Affiche la distance entre le coin haut/gauche du bouton start 
   * et les coins haut/gauche des boutons de gauche (rouge et bleu)
   */
function showPos(){
    let elb = document.getElementById('bleu');
    let elr = document.getElementById('rouge');
    let els = document.getElementById('start');
    let pb = elementPositionL(elb)
    let pr = elementPositionL(elr)
    let psL = elementPositionL(els)
    console.log((psL.clientX-pb.clientX)+(psL.clientY-pb.clientY))
    console.log((psL.clientX-pr.clientX)+(psL.clientY-pr.clientY))
}
