define(['engine/scene', 'engine/schedule'], function(Scene, Schedule){
  
  var __scenes = [];

  var Logic = {

  };

  function transformEntity(entity, parentMatrix){
    var children = entity.children;
    var transformComponent = entity.components.transform;
    if(transformComponent){
      transformComponent.compute(parentMatrix);
      for (var k = children.length - 1; k >= 0; k--) {
        transformEntity(children[k], transformComponent.absoluteMatrix);
      };
    }
  }

  Schedule.on('update', function(){
    for (var i = __scenes.length - 1; i >= 0; i--) {
      var scene = __scenes[i];
      var entities = scene.entities;
      for (var j = entities.length - 1; j >= 0; j--) {
        transformEntity(entities[j]);
      };
    };
  });

  Scene.observer.subscribe('enabled', function(scene){
    __scenes.push(scene);
  });

  Scene.observer.subscribe('disabled', function(scene){
    __scenes.splice(__scenes.indexOf(scene), 1);
  });

  return Logic;

});