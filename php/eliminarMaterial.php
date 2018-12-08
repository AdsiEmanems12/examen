<?php 
	require_once '../conexion.php';
	try{
		$stmt = $conexion->prepare("DELETE FROM inventario WHERE id_producto = ?");
		$stmt->bindParam(1,$_POST['_id']);
		$stmt->execute();
		if($stmt->rowCount()==0){
			echo 'No se pudo eliminar';
		}else{
			echo 'Se eliminó';
		}
	}catch(PDOException $e){
		echo $e->getMessage();
	}