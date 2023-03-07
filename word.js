//ensemble des couleurs
const colors =['red', 'blue', 'yellow', 'green'];
//ensemble des noms
const names = ['ROUGE', 'BLEU', 'JAUNE', 'VERT']

//séquence posée : 13243142 avec 1 red, 2 blue, 3 yellow, 4 green
const sequence = ['red', 'yellow', 'blue', 'green', 'yellow','red', 'green', 'blue']


class Word{
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
function randomColor() { //! pas utile pour le moment
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Génère un nom de couleur aléatoire
 * @param {string} color la couleur à ne pas générer
 * @return une couleur aléatoire différente de color, en francais en majuscule
 */
function randomName(color) {
  let names = ['ROUGE', 'BLEU', 'JAUNE', 'VERT']
    if(color=='red'){
      names.splice(0,1);
    }
    else if(color=='blue'){
      names.splice(1,1);
    }
    else if(color=='yellow'){
      names.splice(2,1);
    }
    else if(color=='green'){
      names.splice(3,1);
    }
  return names[Math.floor(Math.random() * names.length)] ;
}


/**
 * Mélange aléatoirement un tableau avec l'algorithme de Fisher-Yates
 * @param {array} array
 * @returns le tableau mélangé
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  for (let i = 1; i < array.length-1; i++) {//! risque sur le dernier et erreur 
    if(array[i].color == array[i-1].color){
      let j=i+1;
      
      //TODO
      //si dernier=avant dernier --> erreur
      //si avant dernier=avant avant dernier --> deux derniers egaux

      while(j < array.length && array[i].color == array[j].color){
        j++;
      }
      j=array[j]
      array[i]=j;
      array[j]=array[i];
    }
  }
  console.log(array[0].color+'/'+array[157].color+','+array[158].color+','+array[159].color);
  return array;
}


/**
 * Génère un bloc d'éléments aléatoires
 * (sans 2 même couleurs de suite et un nombre de chaque couleurs equivalent)
 * @param {number} congru le pourcentage de congrence dans le block (format : 0.0)
 * @param {number} nb le nombre de trial par block (normalement 160)-> multiple de 4 OBLIGATOIRE
 * @return block, un tableau de nb Words randomisés
 */
function generateBlockRandom(congru, nb) {
  let block = [];
  nb=nb/4
  //avec congruence
  for(let i =0; i < (nb*congru); i++){
    block.push(new Word('ROUGE', 'red'));
    block.push(new Word('BLEU', 'blue'));
    block.push(new Word('JAUNE', 'yellow'));
    block.push(new Word('VERT', 'green'));
  }
  //sans congruence
  for(let i = 0; i < (nb*(1-congru)); i++) {
    block.push(new Word(randomName('red'), 'red'));
    block.push(new Word(randomName('blue'), 'blue'));
    block.push(new Word(randomName('yellow'), 'yellow'));
    block.push(new Word(randomName('green'), 'green'));
  }
  block=shuffle(block) //mélange
  return block;
}


//MAIN

console.log(generateBlockRandom(0.5 , 160))
