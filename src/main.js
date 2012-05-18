require(['./include', 'engine/scene', 'engine/entity', 'engine/schedule', 'engine/loader'],
  function(Include, Scene, Entity, Schedule, Loader){

  Schedule.start();

  var scene = Scene.create();
  var parentEntity = Entity.create('test', 'herp', 'derp');
  var childEntity = Entity.create('test', 'horp', 'dorp');

  scene.addEntity(parentEntity);
  parentEntity.addChild(childEntity);

  Loader.load(function(items){
  });

  parentEntity.components.transform.position[0] = 1;
  childEntity.components.transform.position[2] = 1;
  Schedule.on('render', function(){
  });
  
});