-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: Embarquement
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `Embarquement`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Embarquement` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `Embarquement`;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author_id` int NOT NULL,
  `edited_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_articles_user1_idx` (`author_id`),
  CONSTRAINT `fk_articles_user1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (59,'vnwd','gjsxjngfxs','/assets/images/1625732378286_avatar.png',',hxkjfs','2021-07-08 08:19:38',1,NULL,'1625732378286_avatar.png'),(60,'vnwd','gjsxjngfxs','/assets/images/1625732386315_avatar.png',',hxkjfs','2021-07-08 08:19:46',1,NULL,'1625732386315_avatar.png'),(61,'vnwd','gjsxjngfxs','/assets/images/1625732432050_avatar.png',',hxkjfs','2021-07-08 08:20:32',1,NULL,'1625732432050_avatar.png'),(62,'vnwd','gjsxjngfxs','/assets/images/1625732505938_avatar.png',',hxkjfs','2021-07-08 08:21:45',1,NULL,'1625732505938_avatar.png'),(63,'vnwd','gjsxjngfxs','/assets/images/1625732522696_avatar.png',',hxkjfs','2021-07-08 08:22:02',1,NULL,'1625732522696_avatar.png'),(64,'vnwd','gjsxjngfxs','/assets/images/1625732557297_avatar.png',',hxkjfs','2021-07-08 08:22:37',1,NULL,'1625732557297_avatar.png'),(65,'vnwd','gjsxjngfxs','/assets/images/1625732795236_avatar.png',',hxkjfs','2021-07-08 08:26:35',1,NULL,'1625732795236_avatar.png'),(66,'vnwd','gjsxjngfxs','/assets/images/1625733002645_avatar.png',',hxkjfs','2021-07-08 08:30:02',1,NULL,'1625733002645_avatar.png'),(67,'vnwd','gjsxjngfxs','/assets/images/1625733071261_avatar.png',',hxkjfs','2021-07-08 08:31:11',1,NULL,'1625733071261_avatar.png'),(68,'vnwd','gjsxjngfxs','/assets/images/1625733080746_avatar.png',',hxkjfs','2021-07-08 08:31:20',1,NULL,'1625733080746_avatar.png'),(69,'vnwd','gjsxjngfxs','/assets/images/1625733120533_avatar.png',',hxkjfs','2021-07-08 08:32:00',1,NULL,'1625733120533_avatar.png'),(70,'vnwd','gjsxjngfxs','/assets/images/1625733139481_avatar.png',',hxkjfs','2021-07-08 08:32:19',1,NULL,'1625733139481_avatar.png');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `content` varchar(255) NOT NULL,
  `creation_date` date NOT NULL,
  `author_id` int NOT NULL,
  `ref_id` int NOT NULL,
  KEY `fk_comments_user1_idx` (`author_id`),
  CONSTRAINT `fk_comments_user1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `isRead` tinyint NOT NULL,
  `subject` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_message_user1_idx` (`author_id`),
  CONSTRAINT `fk_message_user1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isAdmin` tinyint NOT NULL DEFAULT '0',
  `isVerified` tinyint NOT NULL DEFAULT '0',
  `isBann` tinyint NOT NULL DEFAULT '0',
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jo','jo@jo.com','$2b$10$v0Yi.C9fcb29ojWkvwyMBOCEq/k.kGkalV2Lz1h/JL9YNeGvUxXWq',1,0,0,NULL),(34,'ced','embarquementpoub@gmail.com','$2b$10$JeRH6LCLB7EN979qMvgXyuLmFX9S8wBdgT494WJjQu8E2CU9.GNVy',0,1,0,NULL),(36,'ghh','gh@gh','$2b$10$yl1pAAEfcT2g34kfNwW4fenbhHljtJCdK8oHpj01oIpPZySnHg4ui',0,0,0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-08 11:21:29
