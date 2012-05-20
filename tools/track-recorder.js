(function(){
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

  var A_MINUTE = 60000;

  var __audio;

  var __beatStartTime = -1;
  var __bps = 0;

  var __numTracks = 0;

  var __beatPulser, __tracker, __playhead;

  var __lastTime = 0;

  var CELL_HEIGHT_FACTOR = 2;

  var __keyFunctions = {

    'v': function(){
      __audio.paused ? __audio.play() : __audio.pause();
    },

    'z': function(){
      __audio.currentTime = 0;
    },

    'q': function(){
      setBPS(__bps-1);
      __beatStartTime = -1;
    },

    'e': function(){
      setBPS(__bps+1);
      __beatStartTime = -1;
    },

    'r': function(){
      setBPS(__bps);
    },

    'w': function(){
      if(__beatStartTime === -1){
        __beatStartTime = Date.now();
        __beatPulser.classList.remove('pulse');
      }
      else {
        var duration = Date.now() - __beatStartTime;
        __beatStartTime = -1;
        setBPS(A_MINUTE/duration);
      }
    }

  };

  function addTrack(title){
    ++__numTracks;
    var track = document.createElement('div');
    track.className = 'track';
    __tracker.appendChild(track);
    var trackIndex = 0;
    for (var i = __tracker.childNodes.length - 1; i >= 0; i--) {
      var node = __tracker.childNodes[i];
      if(node.classList.contains('track')){
        node.style.width = __tracker.offsetWidth / __numTracks + 'px';
        node.style.left = __tracker.offsetWidth / __numTracks * trackIndex++ + 'px';
      }
    }
    
  }

  function loop(){
    var time = Date.now();
    __lastTime = time;
    requestAnimFrame(loop);
    __playhead.style.top = __audio.currentTime / __audio.duration * __tracker.offsetHeight + 'px';
  }

  function setBPS(bps){
    __bps = Math.round(bps);
    var time = A_MINUTE/__bps;
    __beatPulser.style.MozAnimation = 'pulse ' + time + ' infinite';
    __beatPulser.style.webkitAnimation = 'pulse ' + time + ' infinite';
    __beatPulser.style.animation = 'pulse ' + time + ' infinite';
    __beatPulser.classList.add('pulse');
    document.getElementById('bpm').innerHTML = __bps;
    __tracker.style.height = __bps * __audio.duration / 7.5 + 'px';
  }

  document.addEventListener('DOMContentLoaded', function(){
    __audio = document.getElementById('audio-source');
    __beatPulser = document.getElementById('beat-pulser');
    __tracker = document.getElementById('tracker');
    __playhead = document.getElementById('play-head');

    __audio.load();

    __audio.addEventListener('loadedmetadata', function(){
      setBPS(120);
      requestAnimFrame(loop);
    });

    document.addEventListener('keydown', function(e){
      var key = String.fromCharCode(e.which).toLowerCase();
      if(__keyFunctions[key]){
        __keyFunctions[key](e);
      }
    }, false);

    addTrack('Beats');
    addTrack('Track 1');
    addTrack('Track 2');
    addTrack('Track 3');
    addTrack('Track 4');
    addTrack('Track 5');

  }, false);

}());