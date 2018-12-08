-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-12-2018 a las 02:00:09
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `examenajax`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(40) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `marca_producto` varchar(25) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_producto`, `nombre_producto`, `marca_producto`, `cantidad`) VALUES
(12, 'cpu', 'po', 13),
(13, 'teclado', 'alien war', 200),
(14, 'cualquiera', 'cualquiera', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lleva`
--

CREATE TABLE `lleva` (
  `id_lleva` int(11) NOT NULL,
  `producto_lleva` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `lleva`
--

INSERT INTO `lleva` (`id_lleva`, `producto_lleva`, `cantidad`) VALUES
(9, 14, 2),
(10, 12, 1),
(11, 12, 1),
(12, 12, 1),
(13, 12, 1),
(14, 12, 1),
(15, 14, 1);

--
-- Disparadores `lleva`
--
DELIMITER $$
CREATE TRIGGER `actualizarInventario` AFTER INSERT ON `lleva` FOR EACH ROW BEGIN 
	UPDATE inventario SET inventario.cantidad = inventario.cantidad - new.cantidad WHERE id_producto = NEW.producto_lleva;
    
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `actualizarinventario3` BEFORE UPDATE ON `lleva` FOR EACH ROW BEGIN 
	UPDATE inventario SET inventario.cantidad = (inventario.cantidad+old.cantidad) - new.cantidad  WHERE inventario.id_producto = new.producto_lleva;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `actulizarInventario2` BEFORE DELETE ON `lleva` FOR EACH ROW BEGIN
	UPDATE inventario SET inventario.cantidad = inventario.cantidad + old.cantidad WHERE inventario.id_producto=old.producto_lleva;
end
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `lleva`
--
ALTER TABLE `lleva`
  ADD PRIMARY KEY (`id_lleva`),
  ADD KEY `producto_lleva` (`producto_lleva`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `lleva`
--
ALTER TABLE `lleva`
  MODIFY `id_lleva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `lleva`
--
ALTER TABLE `lleva`
  ADD CONSTRAINT `lleva_ibfk_1` FOREIGN KEY (`producto_lleva`) REFERENCES `inventario` (`id_producto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
