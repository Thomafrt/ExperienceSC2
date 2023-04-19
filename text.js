const once = {once: true}; 

const rouge = document.getElementById("rouge");
const bleu = document.getElementById("bleu");
const jaune = document.getElementById("jaune");
const vert = document.getElementById("vert");


//GESTION DU TEXTE

/**
 * Vérifie si du texte est déjà placé,
 * si ce n'est pas le cas, ajoute le texte placé en paramètre
 * @param {string} txt 
 */
export function addText(txt){
    const el=document.getElementById("text").firstChild;
    const val=el.nodeValue;
    if(val!=' '){ // évalue si il y a deja du texte
        //alert("Merci d'attendre la fin de l'affichage avant de cliquer START"); //TODO : à modifier car stoppe l'expérience pendant un record
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
 * Ajoute un message d'erreur
 */
export function addError(){
    deleteText();
    addText('X');
    document.getElementById("text").style.color='red';
    setTimeout(deleteText, 2000);
}

/**
 * ajoute le css color au mot
 * @param {string} col la couleur du mot affiché
 */
export function addColor(col){
    document.getElementById("text").style.color = col;
}



//GESTION ELEMENTS

/**
 * Cache le menu et active le bouton de l'expérience
 */
export function hideMenu(){
    if(document.getElementById("check1").checked && document.getElementById("check2").checked){//si checkbox cochée
        document.getElementById("menu").style.visibility='hidden';
        document.getElementById('start').disabled = false;
    }
    else{//si checkbox décochée
       alert("Vous devez d'abord confirmer votre consentement pour lancer l'expérience.")
    }
}

/**
 * @param {number} mode
 */
export function showPauseMenu(mode){
    let menu = document.getElementById('menu');
    menu.style.fontSize='200%';
    if(mode == 0){// première pause
        document.getElementById("menu").style.visibility='visible';
        let oldTitre = document.getElementById('titreMenu');
        let parentTitre = oldTitre.parentNode;
        //Supprime consent, deroule et textMenu2
        menu.removeChild(document.getElementById('consent'));
        menu.removeChild(document.getElementById('deroule'));
        menu.removeChild(document.getElementById('textMenu2'));
        //titre
        let titre = document.createElement("h1");
        let titreValue = document.createTextNode("PAUSE");
        titre.appendChild(titreValue);
        parentTitre.replaceChild(titre, document.getElementById("titreMenu"));
        //text
        let text = document.createElement("p");
        text.setAttribute('id', 'textMenu');
        let textValue = document.createTextNode("C'est la fin des essais d'entrainement. Maintenant que vous avez compris le fonctionnement, cliquez sur le bouton ci-dessous pour commencer réellement l'expérience.");
        text.appendChild(textValue);
        menu.replaceChild(text, document.getElementById("textMenu"));
        //bouton
        let next = document.createElement("input");  //changer style
        next.type = 'button';
        next.value = "Continuer"
        next.style.width = '50%';
        next.style.height = '40%';
        next.style.background = 'white';
        next.style.color = 'black';
        next.onclick = function(){document.getElementById('menu').style.visibility='hidden'};
        menu.replaceChild(next, document.getElementById('launch'));
    }
    else if (mode == 1){ //pauses suivantes
        document.getElementById("menu").style.visibility='visible';
        let text = document.createElement("p");
        text.setAttribute('id', 'textMenu');
        let textValue = document.createTextNode("Vous pouvez souffler avant de reprendre l'expérience. Quand vous êtes prêts, cliquez sur le bouton si dessous pour continuer.");
        text.appendChild(textValue);
        menu.replaceChild(text, document.getElementById("textMenu"));
    }
}

/**
 * Cache le bouton start
 * Fonction appelée dans
 */
export function hideStart(){
    document.getElementById("start").style.visibility='hidden';
}

/**
 * Affiche le bouton start après un temps d'attente
 * @param {number} tps le temps d'attente en ms (2000 si erreur, 500 sinon)
 */
export function showStart(tps){
    setTimeout(() => {document.getElementById("start").style.visibility="visible";}, tps);
}



//GESTION EVENTS


/**
 * Ajoute les events correspondants aux boutons 'couleur', 
 * qui disparaissent lorsque l'un d'eux est cliqué
 * @param {string} color la couleur du mot affiché (pour bouton de la bonne réponse)
 * @param {number} nb vaut 0 si 1ere pause, 1 si pause suivante, 2 si pas de pause
 */
export function addEventExpe(color, nb){ //TODO : mettre les boutons dans un tableau avec une boucle pour simplifier le code
    let controller = new AbortController();
    let signal = {signal : controller.signal};
    if(color=="red"){
        rouge.addEventListener('click', () => {deleteText(); controller.abort(); showStart(500); showPauseMenu(nb);}, signal);
        bleu.addEventListener('click', () => {addError(); controller.abort(); showStart(2000); showPauseMenu(nb);}, signal);
        jaune.addEventListener('click', () => {addError(); controller.abort(); showStart(2000); showPauseMenu(nb);}, signal);
        vert.addEventListener('click', () => {addError(); controller.abort(); showStart(2000); showPauseMenu(nb);}, signal);
    }
    else if (color=="blue"){
        rouge.addEventListener('click', () => {addError(); controller.abort(); showStart(2000); showPauseMenu(nb);}, signal);
        bleu.addEventListener('click', () => {deleteText(); controller.abort(); showStart(500); showPauseMenu(nb);}, signal);
        jaune.addEventListener('click', () => {addError(); controller.abort(); showStart(2000); showPauseMenu(nb);}, signal);
        vert.addEventListener('click', () => {addError(); controller.abort(); showStart(2000); showPauseMenu(nb);}, signal);
    }
    else if (color=="yellow"){
        rouge.addEventListener('click', () => {addError(); controller.abort(); showStart(2000); showPauseMenu(nb);}, signal);
        bleu.addEventListener('click', () => {addError(); controller.abort(); showStart(2000); showPauseMenu(nb);}, signal);
        jaune.addEventListener('click', () => {deleteText(); controller.abort(); showStart(500); showPauseMenu(nb);}, signal);
        vert.addEventListener('click', () => {addError(); controller.abort(); showStart(2000); showPauseMenu(nb);}, signal);
    }
    else if (color=="green"){
        rouge.addEventListener('click', () => {addError(); controller.abort(); showStart(2000); showPauseMenu(nb);}, signal);
        bleu.addEventListener('click', () => {addError(); controller.abort(); showStart(2000); showPauseMenu(nb);}, signal);
        jaune.addEventListener('click', () => {addError(); controller.abort(); showStart(2000); showPauseMenu(nb);}, signal);
        vert.addEventListener('click', () => {deleteText(); controller.abort(); showStart(500); showPauseMenu(nb);}, signal);
    }
}
