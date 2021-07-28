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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (2,'Pérou','569856','/assets/images/1626439333975_perou.jpg','sjsjgs','2021-07-12 08:11:07',1,'2021-07-16 12:42:14','1626439333975_perou.jpg'),(3,'Chine','Pays magnifique','/assets/images/1626439320427_chine.jpg','chine','2021-07-16 12:42:00',1,'2021-07-23 13:01:34','1626439320427_chine.jpg'),(4,'japon','dfqghqghdqs','/assets/images/1626439352221_japon.jpg','japon','2021-07-16 12:42:32',1,'2021-07-16 12:42:32','1626439352221_japon.jpg'),(5,'usa','dfshzhjfqjdfqjqdjq','/assets/images/1626439380806_usa.jpg','usa','2021-07-16 12:43:00',1,'2021-07-16 12:43:00','1626439380806_usa.jpg'),(6,'Autriche','dgqdfaqsghqshqs','/assets/images/1626852620904_argentine.jpg','fghqsgQS','2021-07-16 12:53:53',1,'2021-07-23 13:02:01','1626852620904_argentine.jpg'),(7,'Australie','i lolve vacciniator !','/assets/images/1626447522723_1626074361049_australie.jpg','pays de l\'or noir','2021-07-16 14:58:42',1,'2021-07-16 14:58:42','1626447522723_1626074361049_australie.jpg'),(8,'Asian-women','Ceci est du contenu intéressant','/assets/images/1627397442538_femme-asiatique-chapeau.jpg','Femme-asiatique','2021-07-27 14:50:42',1,'2021-07-27 14:50:42','1627397442538_femme-asiatique-chapeau.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('superbe','2021-07-20 12:56:12',1,NULL,'2021-07-20 12:56:12','magnifique','1',33,7),('splendide','2021-07-26 08:18:53',2,NULL,'2021-07-26 08:18:53','Magnifique','2',34,6),('Ce site est pas très beau mais ça va théo fait moins bien','2021-07-27 14:47:08',5,NULL,'2021-07-27 14:47:08','Je suis un commentaire','5',35,7);
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
INSERT INTO `sessions` VALUES ('2Yc2ppwAXjT1KU6MTWp1eLnM0OKaggXv',1627472513,'{\"cookie\":{\"originalMaxAge\":99999999,\"expires\":\"2021-07-28T11:41:53.252Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('90pwYu1KjeBGq4KVh9u6ccCu0Il5WvLI',1627478029,'{\"cookie\":{\"originalMaxAge\":99999999,\"expires\":\"2021-07-27T12:23:14.719Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"name\":\"jo\",\"email\":\"jo@jo.com\",\"isAdmin\":1,\"isVerified\":0,\"isBann\":0,\"avatar\":null,\"id\":1},\"isAdmin\":true}'),('GbueOrbl80ClbPsC9UpPpJzcktHReEKs',1627472514,'{\"cookie\":{\"originalMaxAge\":99999999,\"expires\":\"2021-07-28T11:41:53.503Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('H3BPxjjJ8mFhr7FCv8P-31IIqaP3nKET',1627472375,'{\"cookie\":{\"originalMaxAge\":99999999,\"expires\":\"2021-07-28T11:39:35.443Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('NtbOybavnMJ_O5UOWArN1o-xXsRg_cO-',1627472513,'{\"cookie\":{\"originalMaxAge\":99999999,\"expires\":\"2021-07-28T11:41:53.320Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('OMIVq-Ibg3IQYD7CMbYIi9R4hlBPdnp1',1627472513,'{\"cookie\":{\"originalMaxAge\":99999999,\"expires\":\"2021-07-28T11:41:53.271Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('UbO3wOadIjDrsr2_QXQ1dszj2n77p-WT',1627472513,'{\"cookie\":{\"originalMaxAge\":99999999,\"expires\":\"2021-07-28T11:41:53.252Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('_9NWaPtCbO8O6nsvgnF_CCue3GPJrMGU',1627556751,'{\"cookie\":{\"originalMaxAge\":99999999,\"expires\":\"2021-07-28T18:28:07.856Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('mrjJIUuXv1TO315qW8mejyklqBXWjrG0',1627472513,'{\"cookie\":{\"originalMaxAge\":99999999,\"expires\":\"2021-07-28T11:41:53.316Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('oaw-Cv7onoC_VOhIwQd9LGI0ZwNfdYvE',1627497735,'{\"cookie\":{\"originalMaxAge\":99999999,\"expires\":\"2021-07-28T18:35:44.523Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"name\":\"jo\",\"email\":\"jo@jo.com\",\"isAdmin\":1,\"isVerified\":0,\"isBann\":0,\"avatar\":null,\"id\":1},\"isAdmin\":true}'),('wDY-6qxHm7vK_vd5k6tx3LotwN6ur6wS',1627472513,'{\"cookie\":{\"originalMaxAge\":99999999,\"expires\":\"2021-07-28T11:41:53.306Z\",\"httpOnly\":true,\"path\":\"/\"}}');
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jo','jo@jo.com','$2b$10$U.Av2GYDrya0FeNdmFe4vOGUORzFkSjeNr3DdXcGCvDE/58Ce/JKu',1,0,0,NULL),(2,'gh','gh@gh','$2b$10$hq3H8XuVOwc9Z8LBPiSoDuvRAqbDXVb01ZGpOaeo8ArFGuLRZmhx6',0,0,0,NULL),(3,'ced1','embarquementpoub@gmail.com','$2b$10$rwvDTbiOFMNNzCTK90D2bO2KcXDGiEreM.IHOEAOmsvfe6gM8vrFS',0,1,0,NULL),(5,'Billy le bg','billy@billy.com','$2b$10$VTmT//1rdtEUcu8fQL75MO.ElqE5ekPjlLM31E7ie23fzUeb1QyI6',0,0,0,NULL);
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

-- Dump completed on 2021-07-28 14:14:40
