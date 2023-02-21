function hideCursor(){
    el = document.getElementsByTagName("body");
    el.style.backgroundColor = 'red';
    //setTimeout(showCursor(),3000)
}

function showCursor(){
    document.getElementsByClassName("start").style.cursor='default';

}

el = document.getElementById("start");
console.log(el)
el.addEventListener('click',hideCursor,false); //!Erreur

function startButton(){
    //inserer toutes les actions
}
