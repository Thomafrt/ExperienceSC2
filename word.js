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


/**
 * @return un élément aléatoire du tableau colors (génère une couleur aléatoire)
 */
export function randomColor() { //! pas utile pour le moment
  return colors[Math.floor(Math.random() * colors.length)];
}


/**
 * Renvoie la couleur incongruente de chaque paires rouge/vert et bleu/jaune
 * @param {string} color la couleur du mot
 * @return la chaine incongruente à la couleur du mot (majuscule/francais)
 */
export function randomName(color) {
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
    if(color=='red'){
      return names[0];
    }
    else if(color=='blue'){
      return names[1];
    }
    else if(color=='yellow'){
      return names[2];
    }
    else if(color=='green'){
      return names[3];
    }
}


/**
 * Mélange aléatoirement un tableau avec l'algorithme de Fisher-Yates
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
  let c1;
  let c2;
  //choix du MC et MI
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
    let w1=new Word(names[0], 'red');
    let w2=new Word(names[3], 'green');
    let w3=new Word(randomName('blue'), 'blue');
    let w4=new Word(randomName('yellow'), 'yellow');
    w1.typeCongr = addTypeCongr(1, mode);
    w2.typeCongr = addTypeCongr(1, mode);
    w3.typeCongr = addTypeCongr(1, mode);
    w4.typeCongr = addTypeCongr(1, mode);
    w1.block='Random';
    w2.block='RandomR';
    w3.block='Random';
    w4.block='Random';
    block.push(w1,w2,w3,w4)
  }
  for(let i = 0; i < c2; i++) {
    let w1=new Word(randomName('red'), 'red');
    let w2=new Word(randomName('green'), 'green')
    let w3=new Word(names[1], 'blue');
    let w4=new Word(names[2], 'yellow')
    w1.typeCongr = addTypeCongr(2, mode);
    w2.typeCongr = addTypeCongr(2, mode);
    w3.typeCongr = addTypeCongr(2, mode);
    w4.typeCongr = addTypeCongr(2, mode);
    w1.block='Random';
    w2.block='Random';
    w3.block='Random';
    w4.block='Random';
    block.push(w1,w2,w3,w4);
  }
 // block=shuffle(block) //mélange
  return block;
}

/**
 * Ajoute un attribut aux Words qui défini si il faisait parti des Mostly Congruent ou non
 * @param {Number} part boucle for() 1 ou 2
 * @param {Number} mode vaut 1 pour (ROUGE/red-VERT/green) de Mostly Congruent, 2 pour (BLEU/blue-JAUNE/yellow) MC
 * @returns le bon type en string
 */
export function addTypeCongr(part, mode){
  if(mode == 1 && part == 1 || mode == 2 && part == 2){
    return 'MC'
  }
  else if(mode == 1 && part == 2 || mode == 2 && part == 1){
    return 'MI';
  }
}


/**
 * génère un block suivant une séquence posée
 * @param {number} congru la congruence voulue
 * @param {number} nb nombre de trials total --> OBLIGATOIREMENT divisible par 8
 * @return block, un tableau de nb Words suivant la séquence
 */
export function generateBlockSequence(congru, nb) {
  let block = [];
  nb=nb/8;
  console.log((nb*congru),(nb*(1-congru)));
  for(let i = 0; i < nb*congru; i++){ //congruent
    for(let j = 0; j < sequence.length; j++){
      let w = new Word(sameName(sequence[j]), sequence[j]);
      //w.typeCongr = 'MC';
      w.blocks = 'Sequence';
      block.push(w);
    }
  }
  for(let i = 0; i < nb*(1-congru); i++){ //incongruent
    console.log('test')
    for(let j = 0; j < sequence.length; j++){
      let w = new Word(randomName(sequence[j]), sequence[j]);
      //w.typeCongr = 'MI';
      w.blocks = 'Sequence';
      block.push(w);
    }
  }
  return block;

  /**
   * Faire 4 tableaux (un par color) rempli avec le bon taux de congru
   * mélanger les tableaux
   * piocher dans chaque suivant la séquence
   */
}



//MAIN
//console.log(generateBlockRandom(0.5 , 160))
//console.log(generateBlockSequence(0.5 , 20))