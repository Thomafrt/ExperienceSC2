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



//ANIMATIONS

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

/**
 * Ajoute les events correspondants aux boutons 'couleur', 
 * qui disparaissent lorsque l'un d'eux est cliqué
 * @param {string} color la couleur du mot affiché (pour bouton de la bonne réponse)
 */
export function addEventExpe(color){ //TODO : mettre les boutons dans un tableau avec une boucle pour simplifier le code
    let controller = new AbortController();
    let signal = {signal : controller.signal};
    if(color=="red"){
        rouge.addEventListener('click', () => {deleteText(); controller.abort(); showStart(500);}, signal);
        bleu.addEventListener('click', () => {addError(); controller.abort(); showStart(2000)}, signal);
        jaune.addEventListener('click', () => {addError(); controller.abort(); showStart(2000)}, signal);
        vert.addEventListener('click', () => {addError(); controller.abort(); showStart(2000)}, signal);
    }
    else if (color=="blue"){
        rouge.addEventListener('click', () => {addError(); controller.abort(); showStart(2000)}, signal);
        bleu.addEventListener('click', () => {deleteText(); controller.abort(); showStart(500);}, signal);
        jaune.addEventListener('click', () => {addError(); controller.abort(); showStart(2000)}, signal);
        vert.addEventListener('click', () => {addError(); controller.abort(); showStart(2000)}, signal);
    }
    else if (color=="yellow"){
        rouge.addEventListener('click', () => {addError(); controller.abort(); showStart(2000)}, signal);
        bleu.addEventListener('click', () => {addError(); controller.abort(); showStart(2000)}, signal);
        jaune.addEventListener('click', () => {deleteText(); controller.abort(); showStart(500);}, signal);
        vert.addEventListener('click', () => {addError(); controller.abort(); showStart(2000)}, signal);
    }
    else if (color=="green"){
        rouge.addEventListener('click', () => {addError(); controller.abort(); showStart(2000)}, signal);
        bleu.addEventListener('click', () => {addError(); controller.abort(); showStart(2000)}, signal);
        jaune.addEventListener('click', () => {addError(); controller.abort(); showStart(2000)}, signal);
        vert.addEventListener('click', () => {deleteText(); controller.abort(); showStart(500);}, signal);
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
