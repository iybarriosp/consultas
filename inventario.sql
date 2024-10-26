-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-09-2024 a las 04:55:46
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `celular` int(12) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `direccion2` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `id_pedido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `apellido`, `email`, `celular`, `direccion`, `direccion2`, `descripcion`, `id_pedido`) VALUES
(1, 'Alan', 'Brito', 'alambre@gmail.com', 323399999, 'Calle ciega 123', 'Edi. Castilla', 'dejar el pedido en la porteria', 1),
(2, 'Zoyla', 'Vaca', 'vacalola@gmail.com', 322131444, 'Cra no se meta 12', 'casa 2', 'tocar el timbre 2 veces', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`id`, `id_pedido`, `id_producto`, `precio`, `cantidad`) VALUES
(1, 1, 12, 30000, 2),
(2, 1, 6, 22000, 1),
(3, 2, 13, 45000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `metodo_pago` enum('PSE','Contraentrega','Transferencia','') NOT NULL,
  `aumento` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `id_cliente`, `descuento`, `metodo_pago`, `aumento`, `fecha`) VALUES
(1, 1, 5000, 'PSE', 0, '2024-09-01 20:05:08'),
(2, 2, 0, 'Contraentrega', 5000, '2024-09-01 20:06:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `imagen` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `imagen`, `created_at`, `updated_at`) VALUES
(6, 'Red Printed T-Shirt', '...', 32000.00, 20, 'https://tiimg.tistatic.com/fp/1/007/621/red-and-half-sleeve-printed-t-shirt-for-mens-for-casual-and-formal-events-685.jpg', '2024-05-03 20:55:08', '2024-05-06 00:14:09'),
(7, 'Pantaloneta Verde Oscuro', '...', 65000.00, 30, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/117208024_01/w=800,h=800,fit=pad', '2024-05-03 22:26:11', '2024-05-04 21:08:25'),
(8, 'Camiseta Negro', '...', 35000.00, 20, 'https://cdn.deporvillage.com/cdn-cgi/image/h=576,w=576,dpr=1,f=auto,q=75,fit=contain,background=white/product/toh-dm0dm18263-bds_001.jpg', '2024-05-05 23:40:36', '2024-05-05 23:40:36'),
(9, 'Reebook Negro', '...', 260000.00, 30, 'https://prochampions.vtexassets.com/arquivos/ids/993239-800-800?v=638593298213100000&width=800&height=800&aspect=true', '2024-05-06 01:30:49', '2024-05-06 01:30:49'),
(10, 'Camiseta Azul', '...', 45000.00, 20, 'https://esportelegal.fbitsstatic.net/img/p/camiseta-adidas-own-the-run-masculina-112785/396845-1.jpg?w=800&h=800&v=no-change&qs=ignore', '2024-05-08 19:58:11', '2024-05-08 19:58:11'),
(11, 'Riñonera Gris Claro', '...', 30000.00, 2, 'https://acdn.mitiendanube.com/stores/001/220/810/products/rinonera-joggy-gris-0111-b5e4276e331a0cc61d16795431478417-1024-1024.jpg', '2024-05-08 19:58:33', '2024-05-08 19:58:33'),
(12, 'Reloj Sport', '...', 35000.00, 5, 'https://villarreal.com.co/440-large_default/reloj-casio-sport-digital-y-analogo-ads800wh-solar.jpg', '2024-05-08 19:58:52', '2024-05-08 19:58:52'),
(13, 'Reloj Inteligente', '...', 75000.00, 5, 'https://tmcmovil.b-cdn.net/159-large_default/smartwatch-reloj-inteligente-optimus-band-x-pro-smartwatch-p70-.jpg', '2024-05-08 19:59:10', '2024-05-08 19:59:10'),
(14, 'Reebook Azules', '...', 200000.00, 15, 'https://tiendavirtualfairplay.com/12167-large_default/tenis-reebok-para-nino-con-estilo-clasico-color-azul.jpg', '2024-05-08 19:59:52', '2024-05-08 19:59:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `usuario`, `contrasena`) VALUES
(1, 'administrador', 'admin', 'admin12345'),
(2, 'vendedor', 'vendedor', 'vende12355');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pedido_detalle` (`id_pedido`),
  ADD KEY `fk_producto_detalle` (`id_producto`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pedido_cliente` (`id_cliente`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `fk_pedido_detalle` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`),
  ADD CONSTRAINT `fk_producto_detalle` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_pedido_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
