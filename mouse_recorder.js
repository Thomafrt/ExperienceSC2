var mouse_recorder = {
    
  moveListener:function() {
    var that = this;

    $(window).mousemove(function(e) {
      if(that.state == 1) {
        that.frames.push([e.clientX, e.clientY]);
      }
    });
  },

  record:function() {
    var that = this;
    that.frames = [];
    that.state = 1;
    that.startTime = new Date().getTime()/1000;
      
    $('button.r').text('recording..');
    $('button.p').text('stop & play');
    
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
  mouse_recorder.frames = [];//reinitialize
  mouse_recorder.record();
}

export function stopMouse() {
  mouse_recorder.state = 2;
  $('button.r').text('stop & play');
}

export function getFrames() {
  return mouse_recorder.frames;
}