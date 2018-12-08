<?php 
	require '../conexion.php';
	try{
		$stmt = $conexion->prepare("SELECT * FROM inventario ");
		$stmt->execute();
		if($stmt->rowCount()!=0){
			$res = $stmt->fetchAll();
			echo json_encode($res);
		}
	}catch(PDOException $e){
		echo $e->getMessage();
	}