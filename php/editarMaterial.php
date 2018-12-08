<?php
	require_once '../conexion.php';
	try{
		$stmt = $conexion->prepare("UPDATE inventario SET nombre_producto = ? , marca_producto = ? , cantidad = ? WHERE id_producto = ? ");
		$stmt->bindParam(1,$_POST['nombre']);
		$stmt->bindParam(2,$_POST['marca']);
		$stmt->bindParam(3,$_POST['cantidad']);
		$stmt->bindParam(4,$_POST['_id']);
		$stmt->execute();
		if($stmt->rowCount()!=0){
			echo 'Se actualizó';
		}else{
			echo 'No se pudo actualizar';
		}

	}catch(PDOException $e){
		echo $e->getMessage();
	}