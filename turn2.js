import {addText, deleteText, addError, addColor, hideMenu, showPauseMenu, hideStart, showStart} from './text.js';
import {generateBlockRandom, generateBlockSequence, generateBlockTest} from './word.js';
import { recordMouse, stopMouseAndGetFrames} from './mouse_recorder.js';

const data=[];//le tableau ou tout est stocké pour être converti en Json


/**
 * Déroule l'expérience
 * @param {string} congruence - le taux de congruence voulu pour l'expérience (format 0.00)
 * @param {string} trials - le nombre d'essais par block voulu (multiple de 8 OBLIGATOIRE)
 * @param {number} mode - vaut 1 pour ROUGE/red-VERT/green Mostly Congruent, 2 pour BLEU/blue-JAUNE/yellow MC
 */
function turn(congrence, trials, mode){
    let launch = document.getElementById("launch");
    let start = document.getElementById("start");

    //les 5 blocks
    let blockTest = generateBlockTest(0.5, 16, mode);
    let block_S1 = generateBlockSequence(congrence, trials, mode);
    let block_R1 = generateBlockRandom(congrence, trials, mode);
    let block_S2 = generateBlockSequence(congrence, trials, mode);
    let block_R2 = generateBlockRandom(congrence, trials, mode);
    let blocks = blockTest.concat(block_S1, block_R1, block_S2, block_R2);
    console.log(blocks);

    /*//check d'éventuelles suites de couleurs
    for(let i = 0; i < blocks.length-1; i++){ 
        if(blocks[i].color==blocks[i+1].color) {
        console.log('couleurs similaires ligne (15, 55, 95, 135 exclus): '+i)
        }
    }*/

    launch.addEventListener('click',hideMenu); //cache le menu
    start.addEventListener('click',() => { //lance un trial de l'expérience

        hideStart();
        let color=blocks.shift();
        //console.log(data);
        trial(color, blocks.length, trials);

        //enregistrement des data
        recordMouse();
        start_recording();
        //! lancer enregistrement du temps si besoin
    });
}

/**
 * Déroulé d'un essai :
 * Détecte si on est arrivé au bout du tableau de mots, sinon
 * après 300 ms d'attente, affiche un mot et associe le bon bouton pour le supprimer ou affiche une erreur.
 * @param {string} color la couleur de la bonne réponse
 * @param {number} nbBlocks le nb d'essais restants
 * @param {number} trials le nb d'essai par bloc voulu
 */
function trial(col,nbBlocks,trials){
    let totalTrials = (trials*4)+16;

    data.push(col);
    console.log(data);


    if(col == undefined){ //si le tableau est fini
        addText("L'expérience est terminé");
        
        //! ajouter savedata(data);
    }
    else{
        setTimeout(() => {
            addText(col.name);
            addColor(col.color);
                //pause fin test
                if(nbBlocks==totalTrials-16){ 
                    addEventExpe(col.color, 0);
                }
                //pause fin block
                else if(nbBlocks==totalTrials-16-trials || nbBlocks==totalTrials-16-(2*trials) || nbBlocks==totalTrials-16-(trials*3)){
                    addEventExpe(col.color, 1);
                }
                else{
                    addEventExpe(col.color, 2);
                }
        }, 300);
    }
}


//GESTION ÉVÉNEMENTS/RÉPONSES

/**
 * Ajoute les events correspondants aux boutons 'couleur', 
 * qui disparaissent lorsque l'un d'eux est cliqué
 * @param {string} color la couleur du mot affiché (pour bouton de la bonne réponse)
 * @param {number} nb vaut 0 si 1ere pause, 1 si pause suivante, 2 si pas de pause
 */
export function addEventExpe(color, nb){ //! ajouter la fonction fin d'enregistrement souris et temps dans tous les addEvent
    let controller = new AbortController();
    let signal = {signal : controller.signal};
    if(color=="red"){
        rouge.addEventListener('click', () => {//la bonne réponse
            deleteText(); controller.abort(); showStart(500); showPauseMenu(nb); addAnswer(true); end_trial(false);}, signal);
        bleu.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false); end_trial(true);}, signal);
        jaune.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false); end_trial(true);}, signal);
        vert.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false); end_trial(true);}, signal);
    }
    else if (color=="blue"){
        rouge.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false); end_trial(true);}, signal);
        bleu.addEventListener('click', () => {//la bonne réponse
            deleteText(); controller.abort(); showStart(500); showPauseMenu(nb); addAnswer(true); end_trial(false);}, signal);
        jaune.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false); end_trial(true);}, signal);
        vert.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false); end_trial(true);}, signal);
    }
    else if (color=="yellow"){
        rouge.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false); end_trial(true);}, signal);
        bleu.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false); end_trial(true);}, signal);
        jaune.addEventListener('click', () => {//la bonne réponse
            deleteText(); controller.abort(); showStart(500); showPauseMenu(nb); addAnswer(true); end_trial(false);}, signal);
        vert.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false); end_trial(true);}, signal);
    }
    else if (color=="green"){
        rouge.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false); end_trial(true);}, signal);
        bleu.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false); end_trial(true);}, signal);
        jaune.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false); end_trial(true);}, signal);
        vert.addEventListener('click', () => {//la bonne réponse
            deleteText(); controller.abort(); showStart(500); showPauseMenu(nb); addAnswer(true); end_trial(false);}, signal);
    }
}

/**
 * Enregistre dans le tableau final la réponse du participant au stimuli
 * @param {*} type false si réponse fausse, 1 si vraie
 */
function addAnswer(type){
        data[data.length-1].answer=type;
}

//MAIN
 turn(0.8, 40, 2);





var mouse_info = [];
var failed_trial= [];
var times = [];
var AUC = [];

function end_trial(as_failed_trial) {
    failed_trial.push(as_failed_trial);
    mouse_info.push(stopMouseAndGetFrames());
    console.log("mouse info : " + mouse_info);
    AUC.push(stop_recording());
    times.push(Date.now()-time_start);
}


 var points;
 var time_start;

 function start_recording() {
    // Réinitialisation de la liste des points de la sourie
    points = { X: [], Y: [], times: [] };
    time_start = Date.now();
    window.addEventListener("mousemove", calculate_event_AUC);
}

function stop_recording() {
    window.removeEventListener("mousemove", calculate_event_AUC);
    return calculate_AUC(points);
}

function calculate_event_AUC(event) {
    let current_time = Date.now();
    points.X.push(event.clientX);
    points.Y.push(event.clientY);
    points.times.push((current_time-time_start));              
}

function calculate_AUC(points) {
    // Obtenir les coordonnées des points de départ et d'arrivée
    const startX = points.X[0];
    const startY = points.Y[0];
    const endX = points.X[points.X.length - 1];
    const endY = points.Y[points.Y.length - 1];
    
    // Calculer la distance en ligne droite
    const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    
    // Calculer Air Under Curve
    let area = 0;
    for (let i = 1; i < points.X.length; i++) {
        const x1 = points.X[i - 1];
        const y1 = points.Y[i - 1];
        const x2 = points.X[i];
        const y2 = points.Y[i];
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distanceToLine = (dx === 0 && dy === 0) ? 0 : Math.abs(dy * startX - dx * startY + x2 * y1 - y2 * x1) / Math.sqrt(dx ** 2 + dy ** 2);

        //const distanceToLine = Math.abs(dy * startX - dx * startY + x2 * y1 - y2 * x1) / Math.sqrt(dx ** 2 + dy ** 2);
        area += distanceToLine;
    }

    const AUC = area / distance;
    return AUC; 
}