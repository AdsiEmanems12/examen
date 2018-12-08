<?php

	require_once '../conexion.php';
	try{
		$stmt = $conexion->prepare("DELETE FROM lleva WHERE id_lleva = ?");
		$stmt->bindParam(1,$_POST['_id']);
		$stmt->execute();
		if($stmt->rowCount()!=0){
			echo 'Se eliminó';
		}else {
			echo 'No se elimino';
		}
	}catch(PDOException $e){
		echo $e->getMessage();
	}