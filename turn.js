import {addText, deleteText, hideMenu} from './text.js';

const colors =['red', 'blue', 'yellow', 'green'];

//13243142 avec 1 red, 2 blue, 3 yellow, 4 green
let sequence = ['red', 'yellow', 'blue', 'green', 'yellow','red', 'green', 'blue']

const once = {once: true}; //parametre pour activer les bouton qu'une fois


function randomColor() { //génère une couleur aléatoire
    return colors[Math.floor(Math.random() * colors.length)];
}


function turn(){ // deroulé d'un tour
    let launch = document.getElementById("launch");
    let start = document.getElementById("start");
    let rouge = document.getElementById("rouge");
    let bleu = document.getElementById("bleu");
    let jaune = document.getElementById("jaune");
    let vert = document.getElementById("vert");

    let seqClone=sequence;


    launch.addEventListener('click',hideMenu); //cache menu

    start.addEventListener('click',() => { //lance une sequence d'expérience
        let color=seqClone.shift();

        if(color == undefined){ //si au bout du tableau
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
    }); 
    

}

function trials(seq){ //déoulement d'un essai
    let seqChange = seq;
    addText(seqChange.shift());
}



//main
 turn();

