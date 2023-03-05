import {addText, deleteText, hideMenu} from './text.js';



//séquence posée : 13243142 avec 1 red, 2 blue, 3 yellow, 4 green
const sequence = ['red', 'yellow', 'blue', 'green', 'yellow','red', 'green', 'blue'] //TODO : supprimer quand word.js sera fini et ajouter parametre a turn()
//parametre pour activer les bouton qu'une fois
const once = {once: true}; 

/**
 * Déroule l'expérience
 */
function turn(){ // deroulé d'un tour
    let launch = document.getElementById("launch");
    let start = document.getElementById("start");
    
    let seqClone=sequence;
    //TODO: générer les 4 blocks et les concatener à la suite

    launch.addEventListener('click',hideMenu); //cache le menu
    start.addEventListener('click',() => { //lance un trial de l'expérience
        let color=seqClone.shift();
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
function trial(color){
    let rouge = document.getElementById("rouge");
    let bleu = document.getElementById("bleu");
    let jaune = document.getElementById("jaune");
    let vert = document.getElementById("vert");
    if(color == undefined){ //si le tableau est fini
        addText('Le tour est terminé');
    }
    else{
        addText(color); //affiche le premier element du tableau clone (et l'enleve)
        //supprime le texte avec le bouton associé
        if(color=='red'){
            rouge.addEventListener('click',deleteText, once);
        }
        else if(color=='blue'){
            bleu.addEventListener('click',deleteText, once);
        }
        else if(color=='yellow'){
            jaune.addEventListener('click',deleteText, once);
        }
        else if(color=='green'){
            vert.addEventListener('click',deleteText, once); 
        }
    }
}



//MAIN
 turn();

