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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Australie42','542453454245423636','/assets/images/1626186830654_japon.jpg','L\'australie continent des jeunes452','2021-07-12 08:10:52',1,'2021-07-13 14:33:50','1626186830654_japon.jpg'),(2,'Pérou','569856','/assets/images/1626077467133_chine.jpg','sjsjgs','2021-07-12 08:11:07',1,'2021-07-13 08:19:38','1626077467133_chine.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('sgjsj','2021-07-13 07:53:20',1,NULL,'2021-07-13 07:53:20','jsj','sgjsgj',7,NULL),('sgjsj','2021-07-13 07:56:42',1,NULL,'2021-07-13 07:56:42','jsj','sgjsgj',8,NULL),('sjsjs','2021-07-13 07:58:05',1,NULL,'2021-07-13 07:58:05','sgfjsf','sgjsj',9,NULL),('qhqh','2021-07-13 07:59:34',1,NULL,'2021-07-13 07:59:34','fqdhq','qfhqh',10,NULL),('jqjq','2021-07-13 08:02:48',1,NULL,'2021-07-13 08:02:48','qdfjq','jqq',11,NULL),('ghsh','2021-07-13 08:03:01',1,NULL,'2021-07-13 08:03:01','gh','shsh',12,NULL),('qfhqh','2021-07-13 08:05:02',1,NULL,'2021-07-13 08:05:02','fhdq','qhqh',13,NULL),('gqgqfg','2021-07-13 08:05:43',1,NULL,'2021-07-13 08:05:43','qgq','qgfqgq',14,NULL),('qhfqhq','2021-07-13 08:08:44',1,NULL,'2021-07-13 08:08:44','fsbhq','fqhqfdhq',15,NULL),('fhjmlfj','2021-07-13 08:29:48',1,NULL,'2021-07-13 08:29:48','km','fjmlfjl',16,NULL),('gsjgfsj','2021-07-13 12:49:30',1,NULL,'2021-07-13 12:49:30','qfhqh','jo',17,NULL),('qgqgqg','2021-07-13 12:54:56',3,NULL,'2021-07-13 12:54:56','dgqgq','3',18,NULL),('fqhdfqshfqdh','2021-07-13 12:56:37',3,NULL,'2021-07-13 12:56:37','Australie','3',19,NULL),('fqdhfqdhq','2021-07-13 12:58:22',3,NULL,'2021-07-13 12:58:22','Australie','3',20,NULL),('qsdfhqfhqhqhqhq','2021-07-13 13:03:25',2,NULL,'2021-07-13 13:03:25','Australie','2',21,NULL),('sjqjqj','2021-07-13 13:07:08',1,NULL,'2021-07-13 13:07:08','fshdhjs','1',22,NULL),('sfhqhfqh','2021-07-13 13:12:40',1,NULL,'2021-07-13 13:12:40','fshsh','1',23,NULL),('fqhqhqdfh','2021-07-13 13:18:19',1,NULL,'2021-07-13 13:18:19','gshhs','1',24,NULL),('rzjzrj','2021-07-13 13:19:00',1,NULL,'2021-07-13 13:19:00','gje','1',25,NULL),('azeta','2021-07-13 13:23:42',1,NULL,'2021-07-13 13:23:42','ezgataz','1',26,NULL),('qfhfqh','2021-07-13 13:26:39',1,NULL,'2021-07-13 13:26:39','fsdhfdqs','1',27,NULL),('fqhqh','2021-07-13 13:31:02',1,NULL,'2021-07-13 13:31:02','dsghs','1',28,2),('ouah','2021-07-13 13:37:32',1,NULL,'2021-07-13 13:37:32','Australie','1',29,1),('gg','2021-07-13 13:37:54',1,NULL,'2021-07-13 13:37:54','super article','1',30,2),('super articles trop bien','2021-07-13 13:38:37',3,NULL,'2021-07-13 13:38:37','super article ','3',31,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jo','jo@jo.com','$2b$10$U.Av2GYDrya0FeNdmFe4vOGUORzFkSjeNr3DdXcGCvDE/58Ce/JKu',1,0,0,NULL),(2,'gh','gh@gh','$2b$10$hq3H8XuVOwc9Z8LBPiSoDuvRAqbDXVb01ZGpOaeo8ArFGuLRZmhx6',0,0,0,NULL),(3,'ced1','embarquementpoub@gmail.com','$2b$10$rwvDTbiOFMNNzCTK90D2bO2KcXDGiEreM.IHOEAOmsvfe6gM8vrFS',0,1,0,NULL);
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

-- Dump completed on 2021-07-15  9:34:22
