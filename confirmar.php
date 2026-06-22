<?php

$nombre = $_POST["nombre"];

file_put_contents("confirmados.txt", $nombre . "\n", FILE_APPEND);

echo "ok";

?>