define(['util/lang', 'util/observer'], function(LangUtils, Observer){
  
  var __groups = [];
  var __loaders = {};
  var __assets = {};

  function LoadGroup(items, callback){
    var _toLoad = items.length;
    var _loaded = 0;
    var _loadedItems = {};

    if(callback){
      Loader.observer.subscribe('loaded', function loaded(){
        callback(_loadedItems);
        Loader.observer.unsubscribe('loaded', loaded);
      });
    }

    return {
      load: function(internalCallback){
    
        function load(item){
          var loadFunction = item.load;
          var url = item.url;
          loadFunction(url, function(item){
            __assets[url] = item;
            _loadedItems[url] = item;
            if(++_loaded === _toLoad){
              internalCallback(_loadedItems);
            }
          });
        }

        for (var i = items.length - 1; i >= 0; i--) {
          if(!__assets[items[i].url]){
            load(items[i]);
          }
          else{
            ++_loaded;
            setTimeout(internalCallback, 0);
          }
        }
      },

      getProgress: function(){
        return _loaded/_toLoad;
      }

    };
  }


  function startLoad(groups){
    var toLoad = groups.length;
    var loaded = 0;
    var loadedItems = [];

    function onLoaded(items){
      loadedItems = loadedItems.concat(items);
      if(++loaded === toLoad){
        Loader.observer.notify('loaded', loadedItems);
      }
    }
    for (var i = groups.length - 1; i >= 0; i--) {
      groups[i].load(onLoaded);
    };
  }

  var Loader = Observer.extend({

    add: function(items, callback){
      if(!Array.isArray(items)){
        items = [items];
      }
      var loaders = [];
      for (var i = items.length - 1; i >= 0; i--) {
        var loaderType = items[i].type;
        var url = items[i].url;
        loaders.push(Loader.create(loaderType, url));
      };
      __groups.push(LoadGroup(loaders, callback));
    },

    load: function(groupCallback){
      var groups = __groups;
      __groups = [];
      Loader.observer.subscribe('loaded', function loaded(items){
        groupCallback(items);
        Loader.observer.unsubscribe('loaded', loaded);
      });
      startLoad(groups);
    },

    register: function(name, ctor){
      var loader = {
        create: function(url){
          return {
            url: url,
            load: ctor
          };
        }
      };

      __loaders[name] = loader;

      return loader;
    },

    create: function(loaderName){
      var namespace = __loaders[loaderName];
      if(namespace){
        var args = LangUtils.getArgsFrom(arguments, 1);
        return namespace.create.apply(namespace, args);
      }
      throw Error('Loader ' + loaderName + ' not defined');      
    },

    getTypes: function(){
      return Object.keys(__entities);
    }

  });

  return Loader;

});