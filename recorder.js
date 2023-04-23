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

