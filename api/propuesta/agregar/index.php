<?php
	include("../../config.php");
	//exit("$_REQUEST[categoria]");
	//titulo,detalle,categoria,departamento,correo		
	$string = file_get_contents($rutaData_nivel3 . "/$_REQUEST[categoria].json");
	$tempArray = json_decode($string, true);
	$tempArray[] = array("propuesta"=>$_REQUEST["titulo"],"detalle"=>$_REQUEST["detalle"],"departamento"=>$_REQUEST["departamento"],"Correo"=>$_REQUEST["correo"]);	
	$jsonData = json_encode($tempArray);
	file_put_contents($rutaData_nivel3 . "/$_REQUEST[categoria].json", $jsonData);
	//print_r($jsonData);	
	
try {
	$Data = array('codigo' => '202', 'mensaje' => 'OK');    
	echo json_encode($Data);
} catch (Exception $e) {
    $Data = array('codigo' => '406', 'mensaje' => 'error');    
	echo json_encode($Data);
}
?>