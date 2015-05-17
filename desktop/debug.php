<?php
	$string = file_get_contents("data/transporte.json");
	$tempArray = json_decode($string, true);
	$tempArray[] = array("Propuesta"=>"aaaaaa","detalle"=>"aaaaaaaaaaaaaaa","departamento"=>"Lima","Correo"=>"aaaa@bbbb.ccc");
	
	$jsonData = json_encode($tempArray);
	file_put_contents('data/transporte.json', $jsonData);
	print_r($jsonData)	;
?>