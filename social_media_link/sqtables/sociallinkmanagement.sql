CREATE DATABASE  IF NOT EXISTS `smmanagement` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `smmanagement`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: smmanagement
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sociallinks`
--

DROP TABLE IF EXISTS `sociallinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sociallinks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `social_media_name` varchar(255) NOT NULL,
  `social_media_link` varchar(255) NOT NULL,
  `description` text,
  `isActive` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by_role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `updated_by_role_id` (`updated_by_role_id`),
  CONSTRAINT `sociallinks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `sociallinks_ibfk_2` FOREIGN KEY (`updated_by_role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sociallinks`
--

LOCK TABLES `sociallinks` WRITE;
/*!40000 ALTER TABLE `sociallinks` DISABLE KEYS */;
INSERT INTO `sociallinks` VALUES (1,9,'Twitter','https://twitter.com/testuser','Test user\'s Twitter account',0,'2024-08-21 13:54:20','2024-09-09 08:22:12',2),(2,9,'updated','fakebook','Updated descriptissson',0,'2024-08-21 13:54:40','2024-09-09 08:22:12',2),(3,10,'deneme mf','deneme mf','deneme mt',0,'2024-08-21 14:44:02','2024-09-09 08:02:33',1),(4,11,'Twitter','https://twitter.com/alican','Kişisel Twitter hesabım.',1,'2024-08-23 14:06:13','2024-08-23 14:06:13',2),(5,11,'İnstagram','https://İnstagram.com/alican','Kişisel ig hesabım.',1,'2024-08-23 14:06:36','2024-08-23 14:06:36',2),(6,11,'fb','https://fb.com/alicanaa','Kişisel fb hesabım.',0,'2024-08-23 14:07:06','2024-09-08 13:53:10',1),(7,11,'sdsasas','https://sasasa.com/alican','asasas aaaaa hesabım.',0,'2024-08-23 14:07:14','2024-08-23 14:15:46',2),(8,11,'denemelink','denemelink','denemelink',0,'2024-09-07 12:37:40','2024-09-08 00:31:12',1),(9,11,'asdasdas','asdasdasd','dasdasd',0,'2024-09-07 12:38:19','2024-09-08 00:31:12',1),(10,11,'kjsfbjksdfj','hasdhash','jskdfjkbsdfsdf',0,'2024-09-07 23:07:44','2024-09-08 00:31:11',1),(11,11,'dudeaaaaaaaaaaaaaaaaaaaaaaa','dudueaaaaa','dudeeeeaaaaaaaaaaaaa',0,'2024-09-07 23:08:18','2024-09-08 00:31:11',1),(12,11,'asdasd','asdasd','asd',0,'2024-09-07 23:48:24','2024-09-08 00:31:10',1),(13,11,'dasda','asdas','sdasd',0,'2024-09-07 23:48:49','2024-09-08 00:31:09',1),(14,11,'asdasd','asdasd','asdasd',0,'2024-09-07 23:49:25','2024-09-08 00:31:09',1),(15,11,'aaaaaaaaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',0,'2024-09-07 23:49:48','2024-09-08 00:31:08',1),(16,11,'ccccccccccccccccccssssssssssss','ccccccccs','cccccccccccccccccccccccsss',0,'2024-09-07 23:50:34','2024-09-08 00:31:05',1),(17,11,'qweqwe','qweqwe','qweqweqwe',0,'2024-09-07 23:52:08','2024-09-08 00:31:08',1),(18,11,'asasaccc','asasaccc','asasacccc',0,'2024-09-08 00:15:43','2024-09-08 00:31:02',1),(19,11,'sssaa','sssssaa','ssaa',0,'2024-09-08 00:20:06','2024-09-08 00:31:01',1),(20,11,'ssssssssss','s','sssssss',0,'2024-09-08 00:32:52','2024-09-08 13:52:31',1),(22,11,'github','https://www.github.com/en','github page',1,'2024-09-08 14:15:13','2024-09-08 14:15:13',1),(23,16,'yarendeneeeeeee','https://www.instagram.com','food, image ...',1,'2024-09-08 19:54:13','2024-09-09 08:08:39',1),(24,16,'yareny','https://www.facebook.com','anything',0,'2024-09-08 19:55:12','2024-09-08 19:55:22',2),(25,16,'yarennn','https://www.linkedln.com','',1,'2024-09-08 19:59:26','2024-09-08 19:59:26',2),(26,11,'denemeaaaa','https://www.example.com','denemedeneme',1,'2024-09-09 08:05:56','2024-09-09 08:06:23',1),(27,11,'added','https://www.example.com','aded',0,'2024-09-09 08:10:19','2024-09-09 08:10:23',1),(28,17,'denemeeee','https://www.denemeeee.com','deneme',0,'2024-09-09 08:30:00','2024-09-09 08:31:07',2),(29,17,'asd','https://www.example.cccc','asd',0,'2024-09-09 08:31:01','2024-09-09 08:31:43',2),(30,17,'sad','https://www.exampssssle.com','asdasd',0,'2024-09-09 08:31:15','2024-09-09 08:31:43',2);
/*!40000 ALTER TABLE `sociallinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `c_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `u_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role_id` int DEFAULT '2',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'alicandemene','ali.can@example.com','securePassword123',NULL,'2024-08-20 22:06:56','2024-08-20 22:11:17',2),(2,'alicaaandemene','ali.can@example.sscom','securePassworsssd123',NULL,'2024-08-20 22:09:34','2024-08-20 22:11:17',2),(3,'aliaaaacaaandemene','ali.can@example.saascom','securaaePassworsssd123',NULL,'2024-08-20 22:12:01','2024-08-20 22:12:01',1),(4,'alaae','alaaaa@gg.saascom','secu123',NULL,'2024-08-20 22:16:38','2024-08-20 22:16:38',NULL),(5,'alaaaae','alaaaa@gg.saaaaaaaaaaaaascom','secuaaaaa123',NULL,'2024-08-20 22:17:11','2024-08-20 22:17:11',NULL),(6,'john_asdsdoe','johsdddexample.com','$2a$10$Yz86bB4.uBhZY03QwYZUJe3Fwf0lU3ld9ZEpyzOZ/Wh94VWDSni1y',1,'2024-08-20 22:47:40','2024-08-20 22:47:40',2),(7,'acd','acd@acd@acd','$2a$10$55oZedNK.V1ctgPHu36CIeQR5KG4vZfcJP472KfADLjxrfan9y4M2',1,'2024-08-20 22:48:35','2024-08-20 22:48:35',2),(9,'testuser','testuser@example.com','$2b$10$hlnNjYNfh3nxaUqG/pcTh.8v7vqBroQ9pMVy.fATkUFKSp10QDCIO',0,'2024-08-21 13:50:52','2024-09-09 08:22:12',2),(10,'aliaaa','acd@gg.cc','$2b$10$RpxmE/WsapztyyXFZDr/VucOO.nsNcnkyY507r8uHv32beuxpRL/W',0,'2024-08-21 14:42:48','2024-09-09 08:01:05',2),(11,'Ali Can D','alican@mail.com','$2b$10$RU7MISgj0AUJTgYXWmQPlu/UU8IMNpzAjVMCR9FpYXe2W1FgM6xPy',1,'2024-08-23 14:00:09','2024-09-09 08:10:37',1),(12,'asd','asdads@gg.cc','$2b$10$kHOTqxqLUYkCJHhV8cDJH.RaCFcGT71H6E2OJzP1pGis4Pn6XTyne',1,'2024-09-02 15:13:19','2024-09-02 15:13:19',2),(13,'asdasdasd','asdas@sss','$2b$10$rdoQFKY.tJGz4Bt76x1v0OcKyx13aiYck6XKuOY13IT8SehfDy3n.',1,'2024-09-03 08:22:13','2024-09-03 08:22:13',2),(14,'ahmetcan','ahmetcan@mail.com','$2b$10$1d8yy78UodpYsNO9BTOyqu60jh7Nvr0GmqzXLLgujzxGZhG9YZKv6',1,'2024-09-08 13:19:37','2024-09-08 13:19:37',2),(15,'git','git@mobile.com','$2b$10$wDNekDu0WypqC/gvHkJtqugZEKVYDqOc.bH30CftvNiUuutB4y0T6',1,'2024-09-08 14:08:30','2024-09-08 14:08:30',2),(16,'yaren ','yaren@yopmail.com','$2b$10$/fSrpoY9IH9acA7Z9YhKSuQJayvx6VTrXKgT4B55RDBBG8FnxVdFi',1,'2024-09-08 19:52:09','2024-09-09 07:45:39',2),(17,'denemusersa','denemeuser@mail.com','$2b$10$iIrTvKW4cOfkKPwBfGenGecXxWngG62Q3w5Y/pkbOdl0yxzLY8eqG',0,'2024-09-09 08:29:02','2024-09-09 08:31:43',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-09 14:01:12
