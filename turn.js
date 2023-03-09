import {addText, deleteText, addColor, addError, hideMenu} from './text.js';
import {generateBlockRandom, generateBlockSequence} from './word.js';
import { recordMouse, stopMouseAndGetFrames} from './mouse_recorder.js';


//parametre pour activer les bouton qu'une fois
const once = {once: true}; 

/**
 * Déroule l'expérience
 */
function turn(congrence, trials){
    let launch = document.getElementById("launch");
    let start = document.getElementById("start");
    //les 5 blocks
    let blockTest = generateBlockRandom(0.5, 16);
    let block_S1 = generateBlockSequence(congrence,trials/8);
    let block_R1 = generateBlockRandom(congrence, trials);
    let block_S2 = generateBlockSequence(congrence, trials/8);
    let block_R2 = generateBlockRandom(congrence, trials);
    let blocks = blockTest.concat(block_R1, block_S1, block_R2, block_S2);
    console.log(blocks);

    launch.addEventListener('click',hideMenu); //cache le menu
    start.addEventListener('click',() => { //lance un trial de l'expérience
        let color=blockTest.shift();

        rouge.addEventListener('click', () => {addError();}, once);
        bleu.addEventListener('click', () => {addError();}, once);
        jaune.addEventListener('click', () => {addError();}, once);
        vert.addEventListener('click', () => {addError();}, once);

        recordMouse();
        trial(color);
    }); 



    

}

/**
 * Déroulé d'un essai : 
 * Affiche un mot et associe le bon bouton pour le supprimer.
 * Détecte si on est arrivé au bout du tableau de mots
 * @param {string} color 
 */
function trial(col){
    let rouge = document.getElementById("rouge");
    let bleu = document.getElementById("bleu");
    let jaune = document.getElementById("jaune");
    let vert = document.getElementById("vert");

    if(col == undefined){ //si le tableau est fini
        addText('Le tour est terminé');
    }
    else{
        addText(col.name);
        addColor(col.color);
        //supprime le texte avec le bouton associé
        if(col.color=='red'){
            rouge.addEventListener('click',deleteText, once);
            rouge.addEventListener('click',stopMouseAndGetFrames, once);
        }
        else if(col.color=='blue'){
            bleu.addEventListener('click',deleteText, once);
            bleu.addEventListener('click',stopMouseAndGetFrames, once);
        }
        else if(col.color=='yellow'){
            jaune.addEventListener('click',deleteText, once);
            jaune.addEventListener('click',stopMouseAndGetFrames, once);
        }
        else if(col.color=='green'){
            vert.addEventListener('click',deleteText, once); 
            vert.addEventListener('click',stopMouseAndGetFrames, once);
        }
    }
}



//MAIN
 turn(0.5, 160);