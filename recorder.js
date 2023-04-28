var mouse_recorder = {
    
  moveListener:function() {
    var that = this;



    document.onmousemove = (function(e) {
      if(that.state == 1) {
        that.frames.push([e.clientX, e.clientY]);
      }
    });

  },


  record:function() {
    var that = this;
    that.frames = [];//reinitialize
    that.state = 1;
    that.startTime = new Date().getTime()/1000;
  },

  stop:function() {
    var that = this;
    that.state = 2;
    that.endTime = new Date().getTime()/1000;
  },

};

mouse_recorder.state = 2; //1 = Recording | 2 = Stopped
mouse_recorder.frames = [];

/*
* Listen for the mouse movements
*/
mouse_recorder.moveListener();

////////////////////////////////

export function recordMouse() {
  mouse_recorder.record();
}

export function stopMouseAndGetFrames() {
  mouse_recorder.stop();
  return mouse_recorder.frames;
}


/**
 * Soustrait le temps passé en paramètre au temps actuel (en ms)
 * @param {Number} startTime un temps pris précédement
 * @returns un nombre de ms
 */
export function getFinalTime(startTime){
  return Date.now()-startTime;
}


/////////////////////////////////////////////////////////////////////////////////////////////

var points;
var time_start;

export function start_recording() {
   // Réinitialisation de la liste des points de la sourie
   points = { X: [], Y: [], times: [] };
   time_start = Date.now();
   window.addEventListener("mousemove", calculate_event_AUC);
}

export function stop_recording() {
   window.removeEventListener("mousemove", calculate_event_AUC);
   return calculate_AUC(points);
}

export function calculate_event_AUC(event) {
   let current_time = Date.now();
   points.X.push(event.clientX);
   points.Y.push(event.clientY);
   points.times.push((current_time-time_start));              
}

export function calculate_AUC(points) {
   // Obtenir les coordonnées des points de départ et d'arrivée
   const startX = points.X[0];
   const startY = points.Y[0];
   const endX = points.X[points.X.length - 1];
   const endY = points.Y[points.Y.length - 1];
   // Calculer la distance en ligne droite (pytagor ma geule)
   const distance = Math.sqrt(Math.pow((endX - startX),2) + Math.pow((endY - startY),2));
   // Calculer Air Under Curve
   let area = 0;
   for (let ii = 1; ii < points.X.length; ii++) {
       const x1 = points.X[ii - 1];
       const y1 = points.Y[ii - 1];
       const x2 = points.X[ii];
       const y2 = points.Y[ii];
       const dx = x2 - x1;
       const dy = y2 - y1;
       const distanceToLine = (dx === 0 && dy === 0) ? 0 : Math.abs(dy * startX - dx * startY + x2 * y1 - y2 * x1) / Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
       area += distanceToLine;
   }
   const AUC = area / distance;
   return AUC; 
}






var time_start_moved =[];

export function event_mouse_move() {
  let current_time = Date.now();
  let timeDifference = current_time - time_start;
  console.log("MM: " + timeDifference);
  time_start_moved.push(timeDifference)
  btnstart.removeEventListener("mouse_move", event_mouse_move);
}