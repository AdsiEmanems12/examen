<?php
	require_once '../conexion.php';
	try{
		$stmt = $conexion->prepare("INSERT INTO lleva(producto_lleva,cantidad) VALUES (?,?) ");
		$stmt->bindParam(1,$_POST['producto']);
		$stmt->bindParam(2,$_POST['cant']);
		$stmt->execute();
		if($stmt->rowCount()!=0){
			echo 'Se ingresó';
		}else{
			echo 'No se ingresó';
		}

	}catch(PDOException $e){
		echo $e->getMessage();
	}