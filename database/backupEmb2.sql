-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: Embarquement
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.2

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
  `content` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `author_id` int NOT NULL,
  `edited_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_articles_user1_idx` (`author_id`),
  CONSTRAINT `fk_articles_user1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (10,'Argentine','grqgqgqghq','/assets/images/1632057367067_argentine.jpg','Pays de l\'or noir','2021-09-19 13:16:07',1,'2021-09-19 13:16:07','1632057367067_argentine.jpg'),(11,'Australie','qhqhqdfhqdhqdh','/assets/images/1632057381822_australie.jpg','gqshgqhq','2021-09-19 13:16:21',1,'2021-09-19 13:16:21','1632057381822_australie.jpg'),(12,'Chine','gfqdhqdhqdhq','/assets/images/1632057427592_chine.jpg','Gldg','2021-09-19 13:17:07',1,'2021-09-19 13:17:07','1632057427592_chine.jpg'),(13,'Japon','dmkjqhgjn','/assets/images/1632057451814_japon.jpg','ldkqngmkj','2021-09-19 13:17:31',1,'2021-09-19 13:17:31','1632057451814_japon.jpg'),(14,'Pérou','qsdgqsgdsqg','/assets/images/1632057479679_perou.jpg','qsdgsqd','2021-09-19 13:17:59',1,'2021-09-19 13:17:59','1632057479679_perou.jpg'),(15,'Thaïlande','qsgqsgqsdg','/assets/images/1632057505820_thailande.jpg','dgqg','2021-09-19 13:18:25',1,'2021-09-19 13:18:25','1632057505820_thailande.jpg'),(16,'USA','qsdgdqsgqs','/assets/images/1632057522026_usa.jpg','sqdgqsgdqsg','2021-09-19 13:18:42',1,'2021-09-19 13:18:42','1632057522026_usa.jpg');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `content` text NOT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `author_id` int NOT NULL,
  `ref_id` int DEFAULT NULL,
  `edited_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_user1_idx` (`author_id`),
  CONSTRAINT `fk_comments_user1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('superbe','2021-07-20 12:56:12',1,NULL,'2021-07-20 12:56:12','magnifique','1',33,7),('splendide','2021-07-26 08:18:53',2,NULL,'2021-07-26 08:18:53','Magnifique','2',34,6),('juste waouh','2021-09-19 13:19:41',1,NULL,'2021-09-19 13:19:41','Splendide destination','1',36,15);
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
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('X-4qZNHJ_ljnhL4NxYnG6CsI1eb7YadE',1632167786,'{\"cookie\":{\"originalMaxAge\":99999999,\"expires\":\"2021-09-20T16:59:20.881Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"name\":\"jo\",\"email\":\"jo@jo.com\",\"isAdmin\":1,\"isVerified\":0,\"isBann\":0,\"avatar\":null,\"id\":1},\"isAdmin\":true}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
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
  `nameAvatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jo','jo@jo.com','$2b$10$U.Av2GYDrya0FeNdmFe4vOGUORzFkSjeNr3DdXcGCvDE/58Ce/JKu',1,0,0,'/assets/images/1632057920365_avatar.jpg','1632057920365_avatar.jpg'),(2,'gh','gh@gh','$2b$10$hq3H8XuVOwc9Z8LBPiSoDuvRAqbDXVb01ZGpOaeo8ArFGuLRZmhx6',0,0,0,NULL,NULL),(3,'ced1','embarquementpoub@gmail.com','$2b$10$rwvDTbiOFMNNzCTK90D2bO2KcXDGiEreM.IHOEAOmsvfe6gM8vrFS',0,1,0,NULL,NULL),(5,'Billy le bg','billy@billy.com','$2b$10$VTmT//1rdtEUcu8fQL75MO.ElqE5ekPjlLM31E7ie23fzUeb1QyI6',0,0,0,NULL,NULL);
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

-- Dump completed on 2021-09-19 18:16:25
