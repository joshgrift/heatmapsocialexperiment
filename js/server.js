var Server = function(url){
  var tempMap =  [[5, 4, 3, 2, 1, 0, 0, 0],
                  [6, 5, 4, 3, 2, 1, 0, 0],
                  [7, 6, 5, 4, 3, 2, 1, 0],
                  [8, 7, 6, 5, 4, 3, 2, 1],
                  [7, 6, 5, 4, 3, 2, 1, 0],
                  [6, 5, 4, 3, 2, 1, 0, 0],
                  [5, 4, 3, 2, 1, 0, 0, 0],
                  [4, 3, 2, 1, 0, 0, 0, 0]];

  var fingerprint = new Fingerprint().get();

  var onValidation = function(){return null;}

  function post(x,y){
    //make api call here

    tempMap[y][x] = tempMap[y][x] + 1;

    return tempMap;
  }

  return {
    validated: function(func){
      onValidation = func;

      //make api call here
        //on completed, call onValidation(data)
        //save tempmap
        onValidation({map:tempMap,permissionGranted:true})

      return this;
    },
    post:post
  }
}
