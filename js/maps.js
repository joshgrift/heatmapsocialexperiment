var SelectMap = function(canvas,onComplete,size){
  if(size == null){
    size = [3,3];
  }
  var s = 39;//sidelength
  var p = 1; //padding
  var color = ['#3d62fe','#3d96fe']
  var ctx = canvas.getContext("2d");
  var cursor = null;

  canvas.width = size[0] * (s + p);
  canvas.height = size[1] * (s + p);

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
    for(var x = 0; x < size[0]; x++){
      for(var y = 0; y < size[1]; y++){
        ctx.fillStyle = color[0];
        var xtra = 0;
        if(cursor){
          var xPoint = ((x*s) + (x*p));
          var yPoint = ((y*s) + (y*p));

          if(Math.floor(cursor.x/(s + p)) == x && Math.floor(cursor.y/(s + p)) == y){
            ctx.fillStyle = color[1];
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

var HeatMap = function(canvas,map,size){
  if(size == null){
    size = [3,3];
  }
  var font = "bold 16px Arial";
  var fontSize = 16;
  var s = 39;//sidelength
  var p = 1; //padding
  var ctx = canvas.getContext("2d");

  canvas.width = size[0] * (s + p);
  canvas.height = size[1] * (s + p);


  ctx.clearRect(0,0,canvas.width,canvas.height)

  var max = 0;

  for(var y = 0; y < size[1]; y++){
    for(var x = 0; x < size[0]; x++){
      if(map[y][x] > max){
        max = map[y][x];
      }
    }
  }

  ctx.font = font;
  ctx.textAlign = "center";
  for(var y = 0; y < size[1]; y++){
    for(var x = 0; x < size[0]; x++){
      var top = (y*s) + (y*p);
      var left = (x*s) + (x*p);
      var blue = 0;
      var green = 255 - Math.floor(map[y][x]/max * 255);
      var red = 255;

      if(map[y][x]){
        ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
        ctx.fillRect(left,top,s,s);
        ctx.fillStyle = "#212121";
        ctx.fillText(map[y][x],left + (s/2),top + (s/2) + fontSize/3);
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
