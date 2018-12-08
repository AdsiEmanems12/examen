<?php
	require_once '../conexion.php';

	try{
		$stmt = $conexion->prepare("SELECT * FROM lleva WHERE id_lleva = ?");
		$stmt->bindParam(1,$_POST['_id']);
		$stmt->execute();
		if($stmt->rowCount()!=0){
			$res = $stmt->fetchAll();
			echo json_encode($res);
		}
	}catch(PDOException $e){
		echo $e->getMessage();
	}