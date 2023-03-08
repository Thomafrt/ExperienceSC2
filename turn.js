import {addText, deleteText, addColor, hideMenu} from './text.js';
import {generateBlockRandom, generateBlockSequence} from './word.js';



//séquence posée : 13243142 avec 1 red, 2 blue, 3 yellow, 4 green
const sequence = ['red', 'yellow', 'blue', 'green', 'yellow','red', 'green', 'blue'] //TODO : supprimer quand word.js sera fini et ajouter un parametre a turn()
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
        trial(color);
        //TODO: ajouter l'enregistreur de temps et de position de souris ici (entre clic "start" et clic "couleur" et le stocker dans un tableau)
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
        }
        else if(col.color=='blue'){
            bleu.addEventListener('click',deleteText, once);
        }
        else if(col.color=='yellow'){
            jaune.addEventListener('click',deleteText, once);
        }
        else if(col.color=='green'){
            vert.addEventListener('click',deleteText, once); 
        }
    }
}



//MAIN
 turn(0.5, 160);

