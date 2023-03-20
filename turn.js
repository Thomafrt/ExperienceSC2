import {addText, addColor, hideMenu, addEventExpe, hideStart, showPauseMenu} from './text.js';
import {generateBlockRandom, generateBlockSequence} from './word.js';
import { recordMouse, stopMouseAndGetFrames} from './mouse_recorder.js';


/**
 * Déroule l'expérience
 * @param {string} congruence - le taux de congruence voulu pour l'expérience (format 0.00)
 * @param {string} trials - le nombre d'essais par block voulu (multiple de 8 OBLIGATOIRE)
 */
function turn(congrence, trials){
    let launch = document.getElementById("launch");
    let start = document.getElementById("start");
    //les 5 blocks
    let blockTest = generateBlockRandom(0.5, 16);
    let block_S1 = generateBlockSequence(congrence,trials);
    let block_R1 = generateBlockRandom(congrence, trials);
    let block_S2 = generateBlockSequence(congrence, trials);
    let block_R2 = generateBlockRandom(congrence, trials);
    let blocks = blockTest.concat(block_R1, block_S1, block_R2, block_S2);
    console.log(blocks);

    launch.addEventListener('click',hideMenu); //cache le menu
    start.addEventListener('click',() => { //lance un trial de l'expérience

        hideStart();
        let color=blocks.shift();
        trial(color,blocks.length);

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
 */
function trial(col,nbBlocks){
    if(col == undefined){ //si le tableau est fini
        addText("L'expérience est terminé");
    }
    else{
        setTimeout(() => {
            addText(col.name);
            addColor(col.color);
            addEventExpe(col.color);
        }, 300);
    }
   /* MENU PAUSE
   console.log(nbBlocks)
    if(nbBlocks==654 ){ //639
        showPauseMenu();
    }
    else if(nbBlocks==652 || nbBlocks==650 || nbBlocks==648){ //479-319-159 !!! manque 1
    
    }*/
}


//MAIN
 turn(0.5, 160);