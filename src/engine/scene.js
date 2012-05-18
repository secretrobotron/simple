define(['util/observer'], function(Observer){
  
  var __scenes = [];

  var Scene = {

    create: function(inputObject){
      var _entites = [];

      var scene = {
        addEntity: function(entity){
          _entites.push(entity);
          return entity;
        },
        removeEntity: function(entity){
          var idx = _entites.indexOf(entity);
          if(idx > -1){
            _entites.splice(idx, 1);
          }
          return entity;
        },
        enable: function(){
          Scene.observer.notify('enabled', scene);
        },
        disable: function(){
          Scene.observer.notify('disabled', scene);
        },
        destroy: function(){
          scene.disable();
        }
      };

      scene.entities = _entites;

      scene.enable();

      __scenes.push(scene);

      return scene;

    }
  };

  Scene.scenes = __scenes;

  Observer.extend(Scene);

  return Scene;

});