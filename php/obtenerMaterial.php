<?php 
	require_once '../conexion.php';
	try{
		$stmt = $conexion->prepare("SELECT * FROM inventario WHERE id_producto = ?");
		$stmt->bindParam(1,$_GET['_id']);
		$stmt->execute();
		if($stmt->rowCount()!=0){
			$res = $stmt->fetchAll();
			echo json_encode($res);
		}
	}catch(PDOException $e){
		echo $e->getMessage();
	}