var config = {
  size:[8,8],
  attempts:10
}

var attempts = config.attempts;
var points = []

function go(){
  if(attempts > 0){
    new SelectMap(document.getElementById('canvas'),function(x,y){
      points.push({x:x,y:y});
      attempts = attempts - 1;
      go();
    },config.size);
  } else {
    var map = []
    for(var y = 0; y < config.size[1]; y++){
      map.push([]);
      for(var x = 0; x < config.size[0]; x++){
        map[y][x] = 0;
      }
    }

    for(p in points){
      map[points[p].y][points[p].x]++;
    }

    var heat = new HeatMap(document.getElementById('canvas'),map,config.size);
  }
}

window.onload = function(){
  go();
}
