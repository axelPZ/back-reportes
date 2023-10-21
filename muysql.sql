-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.27 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para administrador_portales
DROP DATABASE IF EXISTS `administrador_portales`;
CREATE DATABASE IF NOT EXISTS `administrador_portales` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `administrador_portales`;

-- Volcando estructura para tabla administrador_portales.clientes
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `cliente_id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(200) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `edad` varchar(3) NOT NULL DEFAULT '0',
  `direccion` varchar(500) NOT NULL,
  `agencia` varchar(200) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `descripcion` varchar(300) NOT NULL DEFAULT '',
  `departamento` varchar(100) NOT NULL,
  `municipio` varchar(100) NOT NULL,
  PRIMARY KEY (`cliente_id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla administrador_portales.clientes: ~0 rows (aproximadamente)
DELETE FROM `clientes`;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;

-- Volcando estructura para tabla administrador_portales.descripcion_pedido
DROP TABLE IF EXISTS `descripcion_pedido`;
CREATE TABLE IF NOT EXISTS `descripcion_pedido` (
  `descripcion_id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int DEFAULT NULL,
  `pedido_id` int DEFAULT NULL,
  `cantidad` decimal(10,2) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`descripcion_id`),
  KEY `FK__productos_pedidos` (`producto_id`),
  KEY `FK_clientes_pedidod` (`pedido_id`),
  CONSTRAINT `FK__productos_pedidos` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`),
  CONSTRAINT `FK_clientes_pedidod` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`pedido_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla administrador_portales.descripcion_pedido: ~0 rows (aproximadamente)
DELETE FROM `descripcion_pedido`;
/*!40000 ALTER TABLE `descripcion_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `descripcion_pedido` ENABLE KEYS */;

-- Volcando estructura para tabla administrador_portales.pedido
DROP TABLE IF EXISTS `pedido`;
CREATE TABLE IF NOT EXISTS `pedido` (
  `pedido_id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT '0',
  `usuario_autorizo` varchar(150) NOT NULL,
  `cliente` varchar(150) NOT NULL,
  `fecha_autorizacion` datetime NOT NULL,
  `fecha_salida` datetime NOT NULL,
  `descripcion` varchar(500) NOT NULL DEFAULT '',
  PRIMARY KEY (`pedido_id`),
  KEY `FK__usuarios` (`usuario_autorizo`),
  KEY `FK__clientes` (`cliente`),
  CONSTRAINT `FK__clientes` FOREIGN KEY (`cliente`) REFERENCES `clientes` (`correo`),
  CONSTRAINT `FK__usuarios` FOREIGN KEY (`usuario_autorizo`) REFERENCES `usuarios` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla administrador_portales.pedido: ~0 rows (aproximadamente)
DELETE FROM `pedido`;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;

-- Volcando estructura para tabla administrador_portales.productos
DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `producto_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `proveedor` varchar(150) NOT NULL DEFAULT '--Sin Asignar--',
  `categoria` varchar(150) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `cantidad` decimal(10,2) NOT NULL DEFAULT '0.00',
  `precio` decimal(10,2) NOT NULL DEFAULT '0.00',
  `fecha_caducidad` datetime NOT NULL,
  `bodega` varchar(3) NOT NULL DEFAULT '',
  `estanteria` varchar(4) NOT NULL DEFAULT '',
  `ubicacion` varchar(10) NOT NULL DEFAULT '',
  `usuario` varchar(150) NOT NULL,
  PRIMARY KEY (`producto_id`),
  UNIQUE KEY `bodega` (`bodega`,`estanteria`,`ubicacion`),
  KEY `FK__usuarios_producotos` (`usuario`),
  CONSTRAINT `FK__usuarios_producotos` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla administrador_portales.productos: ~0 rows (aproximadamente)
DELETE FROM `productos`;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

-- Volcando estructura para tabla administrador_portales.usuarios
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usr` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `edad` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `direccion` varchar(500) NOT NULL DEFAULT '',
  `correo` varchar(150) NOT NULL,
  `rol` varchar(20) NOT NULL DEFAULT 'USUARIO',
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id_usr`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla administrador_portales.usuarios: ~0 rows (aproximadamente)
DELETE FROM `usuarios`;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id_usr`, `nombres`, `apellidos`, `edad`, `direccion`, `correo`, `rol`, `password`) VALUES
	(6, 'Axel Uriel', 'Páez Barrera', '27', '', 'APAEZB@NIU.SOLUTIONS', 'ADMINISTRADOR', '$2a$10$tp4uO27.6kz5s8u1R/AQO.eAeU3Li2k5DuSTdxAhjJ88oHZ.vg5KG');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
