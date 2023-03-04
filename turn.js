const colors =['red', 'blue', 'yellow', 'green'];

function randomColor() { //génère une couleur aléatoire
    return colors[Math.floor(Math.random() * colors.length)];
}
console.log(randomColor());