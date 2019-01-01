<?php

include 'db.php';
include 'config.php';

$database = new DBConnection($USERNAME,$PASSWORD,$DATABASE);
$action = $_GET["a"];
$string = $_GET["r"];

class Data {
  public $map = [];
  public $permission = true;
}

function addPoint($x,$y){
  global $database;

  $database->query("INSERT INTO `saves` (`ip`,`x`,`y`) VALUES ('" . $_SERVER['REMOTE_ADDR'] . "','" . $x ."','" . $y . "')");
}

function getMap(){
  global $database;
  $map = [];
  $result = $database->query("SELECT `x`,`y` FROM `saves` WHERE `banned` = 0");

  for($i = 0; $i < count($result); $i++){
    if(count($map) - 1 < $result[$i]['y']){
      while(count($map) - 1 < $result[$i]['y']){
        array_push($map,[]);
      }
    }

    if(count($map[$result[$i]['y']]) - 1 < $result[$i]['x']){
      while(count($map[$result[$i]['y']]) - 1 < $result[$i]['x']){
        array_push($map[$result[$i]['y']],0);
      }
    }

    $map[$result[$i]['y']][$result[$i]['x']]++;
  }

  return $map;
}

if($action != "" || $string != ""){
  if($action == "validate"){
    $data = new Data();
    $data->map = getMap();

    echo json_encode($data);

  } else if($action == "post"){
    list($x,$y) = explode('-',$string);

    addPoint($x,$y);
    echo getMap();

  } else {
    echo "Error: Unknown action";
  }
} else {
  echo "Error: missing argument";
}

?>
