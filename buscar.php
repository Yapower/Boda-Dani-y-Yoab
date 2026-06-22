<?php

$archivo = fopen("invitados.csv", "r");

$invitados = [];

while(($datos = fgetcsv($archivo, 1000, ",")) !== false){

if($datos[0] != "NOMBRE"){

$nombre = $datos[0] . " " . $datos[1];

$invitados[] = $nombre;

}

}

fclose($archivo);

echo json_encode($invitados);

?>