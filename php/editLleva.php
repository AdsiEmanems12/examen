<?php
	require_once '../conexion.php';

	try{
		$stmt = $conexion->prepare("UPDATE lleva SET producto_lleva = ?, cantidad = ? WHERE id_lleva = ?");
		$stmt->bindParam(1,$_POST['mat']);
		$stmt->bindParam(2,$_POST['cant']);
		$stmt->bindParam(3,$_POST['_id']);
		$stmt->execute();
		if($stmt->rowCount()!=0){
			echo 'Se editó';
		}else{
			echo 'No se editó';
		}

	}catch(PDOException $e){
		echo $e->getMessage();
	}