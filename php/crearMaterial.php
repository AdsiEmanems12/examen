<?php

	require_once '../conexion.php';
	try{
		$stmt = $conexion->prepare("INSERT INTO inventario(nombre_producto,marca_producto,cantidad) VALUES(?,?,?)");
		$stmt->bindParam(1,$_POST['nombre']);
		$stmt->bindParam(2,$_POST['marca']);
		$stmt->bindParam(3,$_POST['cantidad']);
		$stmt->execute();
		if($stmt->rowCount()==0){
			echo 'Ya existe este producto';
		}else{
			echo "Se ingresó el producto $_POST[nombre] exitosamente";
		}
	}catch(PDOException $e){
		echo $e->getMessage();
	}