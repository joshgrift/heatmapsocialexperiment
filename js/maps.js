var SelectMap = function(canvas,onComplete,config){
  var s = config.s;
  var p = config.p;

  var ctx = canvas.getContext("2d");
  var cursor = null;

  canvas.width = config.size[0] * (s + p);
  canvas.height = config.size[1] * (s + p);

  canvas.addEventListener('mousemove',hover);
  canvas.addEventListener('click',click);

  render();

  function click(e){
    destroy();
    onComplete(Math.floor(Math.abs(e.pageX - canvas.offsetLeft)/(s + p)),Math.floor(Math.abs(e.pageY - canvas.offsetTop)/(s + p)));
  }

  function hover(e){
    cursor = {x:Math.abs(e.pageX - canvas.offsetLeft),y:Math.abs(e.pageY - canvas.offsetTop)}
    render();
  }

  function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for(var x = 0; x < config.size[0]; x++){
      for(var y = 0; y < config.size[1]; y++){
        ctx.fillStyle = config.selectColor[0];
        var xtra = 0;
        if(cursor){
          var xPoint = ((x*s) + (x*p));
          var yPoint = ((y*s) + (y*p));

          if(Math.floor(cursor.x/(s + p)) == x && Math.floor(cursor.y/(s + p)) == y){
            ctx.fillStyle = config.selectColor[1];
            xtra = p;
          }
        }

        ctx.fillRect((x*s) + (x*p) - xtra,(y*s) + (y*p) - xtra,s + xtra*2,s + xtra*2);
      }
    }
  }

  function destroy(){
    canvas.removeEventListener('mousemove',hover);
    canvas.removeEventListener('click',click);
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }

  return{
    destroy: destroy
  }
}

var HeatMap = function(canvas,map,config){
  var s = config.s;
  var p = config.p;
  var ctx = canvas.getContext("2d");

  canvas.width = config.size[0] * (s + p);
  canvas.height = config.size[1] * (s + p);

  ctx.clearRect(0,0,canvas.width,canvas.height)

  var max = 0;

  for(var y = 0; y < map.length; y++){
    for(var x = 0; x < map[y].length; x++){
      if(map[y][x] > max){
        max = map[y][x];
      }
    }
  }

  ctx.font = config.font;
  ctx.textAlign = "center";
  for(var y = 0; y < map.length; y++){
    for(var x = 0; x < map[y].length; x++){
      var top = (y*s) + (y*p);
      var left = (x*s) + (x*p);

      var red = Math.floor(map[y][x]/max * (config.heatColor[1].r - config.heatColor[0].r)) + config.heatColor[0].r;
      var green = Math.floor(map[y][x]/max * (config.heatColor[1].g - config.heatColor[0].g)) + config.heatColor[0].g;
      var blue = Math.floor(map[y][x]/max * (config.heatColor[1].b - config.heatColor[0].b)) + config.heatColor[0].b;

      if(map[y][x]){
        ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
        ctx.fillRect(left,top,s,s);
        ctx.fillStyle = config.fontColor;
        ctx.fillText(map[y][x],left + (s/2),top + (s/2) + config.fontSize/3);
      }
    }
  }

  function destroy(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }

  return{
    destroy: destroy
  }
}
