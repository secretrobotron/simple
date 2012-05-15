define(["util/event"], function(Event){
  
  return {

    Entity: function(){
      var _this = {};
      var _children = [];
      var _components = {};

      Event.extend(_this);

      _this.components = _components;

      _this.addComponent = function(name, component){
        _components[name] = component;
        _this.event.dispatch('component-added', component);
      };

      _this.removeComponent = function(name){
        var component = _components[name];
        if(component){
          delete _components[name];
          _this.event.dispatch('component-removed', component);          
        }
      };

      return _this;
    }

  };

});