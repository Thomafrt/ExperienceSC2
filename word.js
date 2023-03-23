//ensemble des couleurs
const colors =['red', 'blue', 'yellow', 'green'];
//ensemble des noms
const names = ['ROUGE', 'BLEU', 'JAUNE', 'VERT']
 
//séquence posée : 13243142 avec 1 red, 2 blue, 3 yellow, 4 green
const sequence = ['red', 'yellow', 'blue', 'green', 'yellow','red', 'green', 'blue']


export class Word{
  /**
   * Crée des objets de type Word avec 3 attributs
   * @param {string} name le nom de la couleur en francais et en majuscule
   * @param {string} color le nom de la couleur en anglais et en minuscule
   * @param {boolean} congruent true si les attributs name et colors sont congruents
   */
    constructor(name, color) {
        this.name=name;
        this.color=color;
        if(this.name == "ROUGE" && this.color== 'red' || this.name == "BLEU" && this.color== 'blue' || 
        this.name == "JAUNE" && this.color== 'yellow' || this.name == "VERT" && this.color== 'green'){
          this.congruent=true;
        }
        else{
          this.congruent=false;
        }
      }
}


//GENERAL


/**
 * Renvoie la couleur incongruente de chaque paires rouge/vert et bleu/jaune
 * @param {string} color la couleur du mot
 * @return la chaine incongruente à la couleur du mot (majuscule/francais)
 */
export function otherName(color) {
    if(color=='red'){ return 'VERT';}
    else if(color=='blue'){return 'JAUNE';}
    else if(color=='yellow'){return 'BLEU';}
    else if(color=='green'){return 'ROUGE';}
}

/**
 * Renvoie le nom de couleur congruent, en francais majuscule
 * @param {string} color 
 * @returns la couleur
 */
export function sameName(color) {
    if(color=='red'){return names[0];}
    else if(color=='blue'){return names[1];}
    else if(color=='yellow'){return names[2];}
    else if(color=='green'){return names[3];}
}

/**
 * Ajoute un attribut aux Words qui défini si il faisait parti des Mostly Congruent ou non
 * @param {Number} part boucle for() 1 ou 2
 * @param {Number} mode vaut 1 pour (ROUGE/red-VERT/green) de Mostly Congruent, 2 pour (BLEU/blue-JAUNE/yellow) MC
 * @returns true si MC, false si pas MC
 */
export function addMC(part, mode){
  if(mode == 1 && part == 1 || mode == 2 && part == 2){
    return true;
  }
  else if(mode == 1 && part == 2 || mode == 2 && part == 1){
    return false;
  }
}



//BLOCK RANDOM

/**
 * Mélange aléatoirement un tableau avec l'algorithme de Fisher-Yates Pour block Random
 * @param {array} array
 * @returns le tableau mélangé
 */
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  for (let i = 1; i < array.length-2; i++) {
    if(array[i].color == array[i-1].color){
      let j=i+1;
        while(j < array.length && array[i].color == array[j].color){
          j+=1;
        }
        if(j > array.length-1){
          //console.log('La valeur de j dépasse la taille du tableau, on relance shuffle() à la fin');
        }
        else{
          let cloneJ=array[j]
          array[j]=array[i];
          array[i]=cloneJ;
        }
      }
    }
  //si 2 elements se suivent dans les 3 dernier, on relance
  if(array[array.length-1].color==array[array.length-2].color || array[array.length-2].color==array[array.length-3].color){
    shuffle(array);
  }
  return array;
}

/**
 * Génère un bloc d'éléments aléatoires
 * (sans 2 même couleurs de suite et un nombre de chaque couleurs equivalent).
 * Fonctionne pour chaque paires de couleur MC (choix du mode)
 * @param {number} congru le pourcentage de congrence dans le block (format : 0.0)
 * @param {number} nb le nombre de trial par block (normalement 160)-> multiple de 4 OBLIGATOIRE (voir meme de 8)
 * @param {number} mode vaut 1 pour (ROUGE/red-VERT/green) de Mostly Congruent, 2 pour (BLEU/blue-JAUNE/yellow) MC
 * @return block, un tableau de nb Words randomisés
 */
export function generateBlockRandom(congru, nb, mode) {
  let block = [];
  nb=nb/4;
  let c1, c2;
  if (mode == 1){
    c1 = nb*congru;
    c2 = nb*(1-congru);
  }
  else if (mode == 2){
    c1 = nb*(1-congru);
    c2 = nb*congru;
  }
  //remplissage
  for(let i = 0; i < c1; i++){
    let w1=new Word(sameName('red'), 'red');
    let w2=new Word(sameName('green'), 'green');
    let w3=new Word(otherName('blue'), 'blue');
    let w4=new Word(otherName('yellow'), 'yellow');
    w1.MC = addMC(1, mode);
    w2.MC = addMC(1, mode);
    w3.MC = addMC(1, mode);
    w4.MC = addMC(1, mode);
    w1.block='Random';
    w2.block='Random';
    w3.block='Random';
    w4.block='Random';
    block.push(w1,w2,w3,w4)
  }
  for(let i = 0; i < c2; i++) {
    let w1=new Word(otherName('red'), 'red');
    let w2=new Word(otherName('green'), 'green')
    let w3=new Word(sameName('blue'), 'blue');
    let w4=new Word(sameName('yellow'), 'yellow')
    w1.MC = addMC(2, mode);
    w2.MC = addMC(2, mode);
    w3.MC = addMC(2, mode);
    w4.MC = addMC(2, mode);
    w1.block='Random';
    w2.block='Random';
    w3.block='Random';
    w4.block='Random';
    block.push(w1,w2,w3,w4);
  }
  block=shuffle(block) //mélange
  return block;
}



//BLOCK SEQUENCE

/**
 * Mélange aléatoirement un tableau avec l'algorithme de Fisher-Yates pour block Sequence
 * @param {array} array
 * @returns le tableau mélangé
 */
export function shuffleSequence(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * génère un block suivant une séquence posée
 * @param {number} congru la congruence voulue
 * @param {number} nb nombre de trials total --> OBLIGATOIREMENT divisible par 8
 * @param {number} mode vaut 1 pour (ROUGE/red-VERT/green) de Mostly Congruent, 2 pour (BLEU/blue-JAUNE/yellow) MC
 * @return block, un tableau de nb Words suivant la séquence
 */
export function generateBlockSequence(congru, nb, mode) {
  let block = [];
  nb=nb/4;
  let blockR = [];
  let blockB = [];
  let blockY = [];
  let blockG = [];
  let c1,c2;
  if (mode == 1){
    c1 = nb*congru;
    c2 = nb*(1-congru);
  }
  else if (mode == 2){
    c1 = nb*(1-congru);
    c2 = nb*congru;
  }
  for(let i = 0; i < c1; i++){
    let w1=new Word(sameName('red'), 'red');
    let w2=new Word(sameName('green'), 'green');
    let w3=new Word(otherName('blue'), 'blue');
    let w4=new Word(otherName('yellow'), 'yellow');
    w1.MC = addMC(1, mode);
    w2.MC = addMC(1, mode);
    w3.MC = addMC(1, mode);
    w4.MC = addMC(1, mode);
    w1.block='Sequence';
    w2.block='Sequence';
    w3.block='Sequence';
    w4.block='Sequence';
    blockR.push(w1);
    blockG.push(w2);
    blockB.push(w3);
    blockY.push(w4);
  }
  for(let i = 0; i < c2; i++) {
    let w1=new Word(otherName('red'), 'red');
    let w2=new Word(otherName('green'), 'green')
    let w3=new Word(sameName('blue'), 'blue');
    let w4=new Word(sameName('yellow'), 'yellow')
    w1.MC = addMC(2, mode);
    w2.MC = addMC(2, mode);
    w3.MC = addMC(2, mode);
    w4.MC = addMC(2, mode);
    w1.block='Sequence';
    w2.block='Sequence';
    w3.block='Sequence';
    w4.block='Sequence';
    blockR.push(w1);
    blockG.push(w2);
    blockB.push(w3);
    blockY.push(w4);
  }
  shuffleSequence(blockR);
  shuffleSequence(blockB);
  shuffleSequence(blockY);
  shuffleSequence(blockG);
  for(let i = 0; i < nb/2; i++){
    for (let j=0; j < sequence.length; j++){
      let col = sequence[j];
      if(col=='red'){
        block.push(blockR.shift());
      }
      else if(col=='blue'){
        block.push(blockB.shift());
      }
      else if(col=='yellow'){
        block.push(blockY.shift());
      }
      else if(col=='green'){
        block.push(blockG.shift());
      }
    }
  }
  return block;
}



//MAIN
//console.log(generateBlockRandom(0.5 , 160))
//console.log(generateBlockSequence(0.5 , 20))