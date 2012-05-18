define(["util/event", "util/observer"], function(Event, Observer){

  var requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
  })();

  var __phases = [
    'update',
    Event.flush,
    'render'
  ];

  var __schedule = {};

  var __stopFlag = true;

  function rafLoop(){
    if(!__stopFlag){
      for(var i=0, l=__phases.length; i<l; ++i){
        var phase = __phases[i];
        if(typeof(phase) === 'string'){
          __schedule.observer.notify(phase);
        }
        else if(typeof(phase) === 'function'){
          phase();
        }
      }
    }
    requestAnimFrame(rafLoop);
  }

  var namespace = {

    start: function(){
      __stopFlag = false;
      requestAnimFrame(rafLoop);
    },

    stop: function(){
      __stopFlag = true;
    },

    on: function(phaseName, fn){
      __schedule.observer.subscribe(phaseName, fn);
    },

    off: function(phaseName, fn){
      __schedule.observer.unsubscribe(phaseName, fn);
    }

  };

  Event.extend(__schedule);
  Observer.extend(__schedule);

  return namespace;

});