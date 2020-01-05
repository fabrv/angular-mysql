--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` JSON NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (null, '{"CUI": "3035727091105", "name": "Juan", "lastname": "Ramirez", "civilState": "soltero"}');
UNLOCK TABLES;