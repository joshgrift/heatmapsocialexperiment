var config = {
  size:[8,8],
  s: 39, //sidelength
  p: 1, //padding
  fontColor: "#212121",
  font: "bold 16px Arial",
  fontSize: 16,
  selectColor: ['#3d62fe','#3d96fe'],
  heatColor: [{r:255,g:255,b:60},{r:255,g:0,b:222}],//heat map in three rgb values
  url: "https://labs.joshgrift.ca/heat/api.php"
}

var server = null;

window.onload = function(){
  FastClick.attach(document.body);

  server = new Server(config.url).validated(function(data){
    if(data.permissionGranted){
      new SelectMap(document.getElementById('canvas'),function(x,y){
        document.getElementById('before').style.display = 'none';
        var newMap = server.post(x,y);
        document.getElementById('after').style.display = 'block';
        new HeatMap(document.getElementById('canvas'),newMap,config);
      },config);
    } else {
      document.getElementById('after').style.display = 'block';
      new HeatMap(document.getElementById('canvas'),data.map,config);
      document.getElementById('before').style.display = 'none';
    }
  });
}
