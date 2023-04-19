import {addText, deleteText, addError, addColor, hideMenu, showPauseMenu, hideStart, showStart} from './text.js';
import {generateBlockRandom, generateBlockSequence} from './word.js';
import { recordMouse, stopMouseAndGetFrames} from './mouse_recorder.js';


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
    let blockTest = generateBlockRandom(0.5, 16, mode);
    let block_S1 = generateBlockSequence(congrence, trials, mode);
    let block_R1 = generateBlockRandom(congrence, trials, mode);
    let block_S2 = generateBlockSequence(congrence, trials, mode);
    let block_R2 = generateBlockRandom(congrence, trials, mode);
    let blocks = blockTest.concat(block_S1, block_R1, block_S2, block_R2);
    console.log(blocks);

    //check d'éventuelles suites de couleurs
    for(let i = 0; i < blocks.length-1; i++){ 
        if(blocks[i].color==blocks[i+1].color) {
        console.log('couleurs similaires ligne (15, 55, 95, 135 exclus): '+i)
        }
    }

    launch.addEventListener('click',hideMenu); //cache le menu
    start.addEventListener('click',() => { //lance un trial de l'expérience

        hideStart();
        let color=blocks.shift();
        trial(color, blocks.length, trials);

        //enregistrement des data
        recordMouse();
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
    if(col == undefined){ //si le tableau est fini
        addText("L'expérience est terminé");

        //! savedata ici
    }
    else{
        setTimeout(() => {
            addText(col.name);
            addColor(col.color);
                if(nbBlocks==totalTrials-16){ 
                    addEventExpe(col.color, 0);
                }
                else if(nbBlocks==totalTrials-16-trials || nbBlocks==totalTrials-16-(2*trials) || nbBlocks==totalTrials-16-(trials*3)){
                    addEventExpe(col.color, 1);
                }
                else{
                    addEventExpe(col.color);
                }
        }, 300);
    }
}


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


//MAIN
 turn(0.8, 40, 2);