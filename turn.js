import {addText, deleteText, addError, addColor, hideMenu, showPauseMenu, hideStart, showStart} from './text.js';
import {generateBlockRandom, generateBlockSequence, generateBlockTest} from './word.js';
import { recordMouse, stopMouseAndGetFrames, getFinalTime, start_recording, stop_recording} from './recorder.js';
import {savedata} from './savedata2.js';

const data = []; //le tableau au tout est stocké pour être converti en Json
let time = 0; //la variable qui stocke les temps de départ de chaque essais


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
        trial(color, blocks.length, trials);

        recordMouse();
        start_recording();
        time=Date.now();
    });
}

/**
 * Déroulé d'un essai :
 * Détecte si on est arrivé au bout du tableau de mots, sinon
 * après 300 ms d'attente, affiche un mot et associe le bon bouton pour le supprimer ou affiche une erreur.
 * @param {string} col la couleur de la bonne réponse
 * @param {number} nbBlocks le nb d'essais restants
 * @param {number} trials le nb d'essai par bloc voulu
 */
function trial(col,nbBlocks,trials){
    let totalTrials = (trials*4)+16;

    data.push(col); //enregistrement des informations de l'essai
    console.log(data);

    if(col == undefined){ //si le tableau est fini
        addText("L'expérience est terminé");
        savedata(data); //enregistrement final
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
            deleteText(); controller.abort(); showStart(500); showPauseMenu(nb); addAnswer(true);}, signal);
        bleu.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false);}, signal);
        jaune.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false);}, signal);
        vert.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false);}, signal);
    }
    else if (color=="blue"){
        rouge.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false);}, signal);
        bleu.addEventListener('click', () => {//la bonne réponse
            deleteText(); controller.abort(); showStart(500); showPauseMenu(nb); addAnswer(true);}, signal);
        jaune.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false);}, signal);
        vert.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false);}, signal);
    }
    else if (color=="yellow"){
        rouge.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false);}, signal);
        bleu.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false);}, signal);
        jaune.addEventListener('click', () => {//la bonne réponse
            deleteText(); controller.abort(); showStart(500); showPauseMenu(nb); addAnswer(true);}, signal);
        vert.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false);}, signal);
    }
    else if (color=="green"){
        rouge.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false);}, signal);
        bleu.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false);}, signal);
        jaune.addEventListener('click', () => {
            addError(); controller.abort(); showStart(2000); showPauseMenu(nb); addAnswer(false);}, signal);
        vert.addEventListener('click', () => {//la bonne réponse
            deleteText(); controller.abort(); showStart(500); showPauseMenu(nb); addAnswer(true);}, signal);
    }
}

/**
 * Enregistre dans le tableau final la réponse du participant au stimuli, et son temps de réponse total
 * @param {boolean} type false si réponse fausse, true si elle est vraie
 */
function addAnswer(type){
        let tab = data[data.length-1];
        tab.answer=type;
        tab.totalTime=getFinalTime(time);
        tab.mouse_info=stopMouseAndGetFrames();
        tab.AUC=stop_recording();
        console.log(tab);
}

//MAIN
 turn(0.8, 40, 1);