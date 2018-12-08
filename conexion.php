<?php 
	try{
		$conexion = new PDO("mysql:host=localhost;dbname=examenajax;charset=utf8","root","");
	}catch(PDOException $e){
		echo $e->getMessage();
	}