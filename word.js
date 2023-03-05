//ensemble des couleurs
const colors =['red', 'blue', 'yellow', 'green'];
//ensemble des noms
const names = ['ROUGE', 'BLEU', 'JAUNE', 'VERT']

//séquence posée : 13243142 avec 1 red, 2 blue, 3 yellow, 4 green
const sequence = ['red', 'yellow', 'blue', 'green', 'yellow','red', 'green', 'blue']


class Word{
  /**
   * Crée des objets de type Word avec 2 attributs : name et color
   * @param {string} name 
   * @param {string} color 
   */
    constructor(name, color) {
        this.name = name;
        this.color=color;
      }
}


/**
 * @return un élément aléatoire du tableau colors (génère une couleur aléatoire)
 */
function randomColor() { //génère une couleur aléatoire
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * @return un élément aléatoire du tableau colors (génère une couleur aléatoire)
 */
function randomName() { //génère une couleur aléatoire
  return names[Math.floor(Math.random() * colors.length)];
}

/**
 * Génère un bloc d'éléments aléatoires
 * (sans 2 même couleurs de suite et un nombre de chaque couleurs equivalent)
 * @param {number} congru le pourcentage de congrence dans le block
 * @return block, un tableau de 160 words randomisés
 */
function generateBlockRandom(congru) {
  let block = [];
  for(let i = 0; i < 160; i++) {
    block.push(new Word(randomName(), randomColor()));
  }
  return block;

}

/*
Comment choisir la congruence ?
- générer les couleurs à partir d'un tableau avec le bon nombre de couleurs de chaque
- associer à chaque couleur le bon nombre de nom congruent et random (sans la dite couleur) pour les autres

Comment randomiser sans repetition ?
- shuffle le tableau pour changer la couleur de départ
- placer l'élément entre deux différents dans la suite du tableau suffit ? à tester...
*/



//MAIN
let mot=new Word(names[1], randomColor());
console.log(generateBlockRandom())