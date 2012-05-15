define([], function(){
  
  var BASE_URL = "http://" + window.location.hostname + ":" + window.location.port;

  return {

    listLevels: function(){
      var xhr = new XMLHttpRequest();
      xhr.onload = function(){
        console.log(xhr.response);
      };
      xhr.open('GET', BASE_URL + '/list-levels');
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
      xhr.send(null);
    }

  };

});