<?php

include 'sangwa.php';
include 'grift.ca_mysql_config.php';

$database = new GriftMySQL('heat');
$action = $_GET["a"];
$string = $_GET["r"];

class Data {
  public $map = [];
  public $permission = false;
}

function addFingerprint($fingerprint){
  global $database;

  $database->query("INSERT INTO `connected` (`fingerprint`, `ip`) VALUES ('" . $fingerprint . "', '" . $_SERVER['REMOTE_ADDR'] . "')");
  $result = $database->query("SELECT * FROM `saves` WHERE `fingerprint` = '" . $fingerprint . "'");

  if(count($result) > 0){
    return false;
  } else {
    return true;
  }
}

function addPoint($fingerprint,$x,$y){
  global $database;

  $database->query("INSERT INTO `saves` (`fingerprint`, `ip`,`x`,`y`) VALUES ('" . $fingerprint . "', '" . $_SERVER['REMOTE_ADDR'] . "','" . $x ."','" . $y . "')");
}

function checkFingerprint($fingerprint){
  global $database;

  $valid = true;

  $result = $database->query("SELECT * FROM `connected` WHERE `fingerprint` = '" . $fingerprint . "'");

  if(count($result) == 0){
    $valid = false;
  }

  $result = $database->query("SELECT * FROM `saves` WHERE `fingerprint` = '" . $fingerprint . "'");

  if(count($result) > 0){
    $valid = false;
  }

  return $valid;
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
    $fingerprint = $string;

    $data = new Data();
    $data->permission = addFingerprint($fingerprint);
    $data->map = getMap();

    echo json_encode($data);

  } else if($action == "post"){
    //$string = sangwa_decode($string);
    list($fingerprint,$x,$y) = explode('-',$string);

    if(checkFingerprint($fingerprint)){
      addPoint($fingerprint,$x,$y);

      echo getMap();
    } else {
      echo "Error: Invalid Fingerprint";
    }


  } else {
    echo "Error: Unknown action";
  }
} else {
  echo "Error: missing argument";
}

?>
