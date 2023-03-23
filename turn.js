import {addText, addColor, hideMenu, addEventExpe, hideStart, showPauseMenu} from './text.js';
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

    for(let i = 0; i < blocks.length-1; i++){
        if(blocks[i].color==blocks[i+1].color) {
        console.log('couleur similaire ligne : '+i)
        }
    }

    launch.addEventListener('click',hideMenu); //cache le menu
    start.addEventListener('click',() => { //lance un trial de l'expérience

        hideStart();
        let color=blocks.shift();
        trial(color, blocks.length, trials);

        //enregistrement des data
        recordMouse();
        //TODO: ajouter l'enregistreur de temps et le save des data
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


//MAIN
 turn(0.8, 40, 2);