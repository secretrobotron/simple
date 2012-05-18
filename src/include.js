(function(){

  var componentSources = [
    'transform',
    'model'
  ];

  var entitySources = [
    'test'
  ];

  var engineSources = [
    'graphics',
    'logic'
  ];

  var loaderSources = [
    'image'
  ];

  var moduleList = [];

  function addModules(sources, prefix){
    prefix = prefix || ''
    for (var i = sources.length - 1; i >= 0; i--) {
      moduleList.push(prefix + sources[i]);
    }
  }

  addModules(loaderSources, 'loaders/');
  addModules(componentSources, 'components/');
  addModules(entitySources, 'entities/');
  addModules(engineSources, 'engine/');

  define(moduleList, function(){
    return arguments;
  });

}());