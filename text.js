function addText(){
    const el=document.getElementById("text").firstChild;
    const val=el.nodeValue;
   // console.log(val)
    if(val===" "){ //si TRUE
        document.getElementById("text").innerHTML = 'COULEUR';
    }
    else{
        document.getElementById("text").innerHTML = " ";
    }

}