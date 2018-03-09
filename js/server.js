var Server = function(url){
  var tempMap = [];

  var fingerprint = new Fingerprint().get();

  var onValidation = function(){return null;}

  function post(x,y){
    var request = ajax({
      method: 'get',
      url: url + "?a=post&r=" + fingerprint + "-" + x + "-" + y,
    }).then(function(response){
      console.log(response);
    });

    while(!tempMap[y]){
      tempMap.push([]);
    }

    while(tempMap[y][x] != 0 && !tempMap[y][x]){
      tempMap[y].push(0);
    }

    tempMap[y][x] = parseInt(tempMap[y][x]) + 1;

    return tempMap;
  }

  return {
    validated: function(func){
      onValidation = func;

      var request = ajax({
        method: 'get',
        url: url + "?a=validate&r=" + fingerprint,
      }).then(function(response){
        tempMap = response.map;
        onValidation({map:tempMap,permissionGranted:response.permission});
      });

      return this;
    },
    post:post
  }
}
