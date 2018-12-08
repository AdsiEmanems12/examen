<?php

	require_once '../conexion.php';

	try{
		$stmt = $conexion->prepare("SELECT * FROM lleva");
		$stmt->execute();
		$res = $stmt->fetchAll();
		echo json_encode($res);
	}catch(PDOException $e){
		echo $e->getMessage();
	}