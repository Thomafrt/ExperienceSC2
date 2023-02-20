var recorder = {
    
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

recorder.state = 2; //1 = Recording | 2 = Stopped
recorder.frames = [];

/*
* Listen for the mouse movements
*/
recorder.moveListener();