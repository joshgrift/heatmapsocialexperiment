<?php
function random() {
  return (float)rand()/(float)getrandmax();
}

function sangwa_key($value) {
  $sangwa_string = "1234567890-";
  $a = str_split($sangwa_string . $sangwa_string);
  if (gettype($value) === "string") {
    return strpos($sangwa_string, $value);
  } else if (gettype($value) === "double" || gettype($value) === "integer") {
    if ($value >= 0) {
      $a[$value];
      return $a[$value];
    } else {
      return $a[strlen($sangwa_string) + $value];
    }
  } else {
    return str_split($sangwa_string . $sangwa_string);
  }
}

function sangwa_encode($value) {
  $result = "";
  $rand = floor(random() * 6) + 2;
  $value = "A" . $value;
  for ($i = 0; $i < strlen($value); $i++) {
    $result = $result . sangwa_key(sangwa_key($value[$i]) + $rand);
  }
  return $result;
}

function sangwa_decode($value) {
  $result = "";
  $rand = intval(sangwa_key($value[0]) - sangwa_key("A"));
  for ($i = 1; $i < strlen($value);$i++) {
    $result = $result . sangwa_key(sangwa_key($value[$i]) - $rand);
  }
  return $result;
}
?>
