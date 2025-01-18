-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: MealOrder26.mysql.database.azure.com    Database: Meal_Order
-- ------------------------------------------------------
-- Server version	8.0.39-azure

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
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customer` (
  `Customer_ID` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(256) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `Name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`Customer_ID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES (1,'59@gmail.com','password','test');
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Meal`
--

DROP TABLE IF EXISTS `Meal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Meal` (
  `Meal_ID` int NOT NULL AUTO_INCREMENT,
  `Vendor_ID` int NOT NULL,
  `Meal_Name` varchar(512) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Description` varchar(512) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Price` int NOT NULL,
  `Inventory` json NOT NULL,
  `Image_url` varchar(8192) NOT NULL,
  `Default_Inventory` int NOT NULL,
  PRIMARY KEY (`Meal_ID`),
  KEY `Vendor_ID` (`Vendor_ID`),
  CONSTRAINT `Meal_ibfk_1` FOREIGN KEY (`Vendor_ID`) REFERENCES `Vendor` (`Vendor_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Meal`
--

LOCK TABLES `Meal` WRITE;
/*!40000 ALTER TABLE `Meal` DISABLE KEYS */;
INSERT INTO `Meal` VALUES (8,2,'麻辣雪花牛肉片麵','',100,'{\"1\": 99, \"2\": 98.0, \"3\": 99, \"4\": 99, \"5\": 95.0, \"6\": 99, \"7\": 99}','https://MealOrder.blob.core.windows.net/image/2025-01-06T18%3A44%3A04.611_affc812b-fbd1-48c8-94d9-bfd4d241e24b_spicybeefnoodles.png?sp=racwdl&st=2025-01-05T10:17:31Z&se=2025-12-31T18:17:31Z&sip=0.0.0.0-255.255.255.255&spr=https&sv=2022-11-02&sr=c&sig=rnnxGmMF6gfW5szTTCo7FkNPpBo3SZeVwZo66heKw6Y%3D',99),(14,2,'59乾麵','',65,'{\"1\": 99, \"2\": 99, \"3\": 99, \"4\": 99, \"5\": 96.0, \"6\": 99, \"7\": 99}','https://MealOrder.blob.core.windows.net/image/2025-01-06T19%3A30%3A25.481_32fe9689-8ad5-4cbc-9d91-1720765672f6_59noodles.png?sp=racwdl&st=2025-01-05T10:17:31Z&se=2025-12-31T18:17:31Z&sip=0.0.0.0-255.255.255.255&spr=https&sv=2022-11-02&sr=c&sig=rnnxGmMF6gfW5szTTCo7FkNPpBo3SZeVwZo66heKw6Y%3D',99);
/*!40000 ALTER TABLE `Meal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order` (
  `Order_ID` int NOT NULL AUTO_INCREMENT,
  `Customer_ID` int NOT NULL,
  `Vendor_ID` int NOT NULL,
  `Status` enum('IN_CART','WAIT_FOR_APPROVAL','PREPARING','READY_FOR_PICKUP','PICKED_UP','CANCELLED_UNCHECKED','CANCELLED_CHECKED') NOT NULL,
  `Pickup_Time` datetime NOT NULL,
  `Meal_List` json NOT NULL,
  `Cash_Amount` int NOT NULL,
  PRIMARY KEY (`Order_ID`),
  KEY `Customer_ID` (`Customer_ID`),
  KEY `Vendor_ID` (`Vendor_ID`),
  CONSTRAINT `Order_ibfk_1` FOREIGN KEY (`Customer_ID`) REFERENCES `Customer` (`Customer_ID`) ON DELETE CASCADE,
  CONSTRAINT `Order_ibfk_2` FOREIGN KEY (`Vendor_ID`) REFERENCES `Vendor` (`Vendor_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
INSERT INTO `Order` VALUES (1,1,2,'PICKED_UP','2025-01-07 20:45:00','[{\"Amount\": 1, \"Meal_ID\": 8}]',100),(2,1,2,'PICKED_UP','2025-01-10 00:15:00','[{\"Amount\": 1, \"Meal_ID\": 8}, {\"Amount\": 1, \"Meal_ID\": 14}]',165),(4,1,2,'PICKED_UP','2025-01-10 02:00:00','[{\"Amount\": 1, \"Meal_ID\": 8}, {\"Amount\": 1, \"Meal_ID\": 14}]',165),(5,1,2,'PICKED_UP','2025-01-10 02:00:00','[{\"Amount\": 1, \"Meal_ID\": 8}, {\"Amount\": 1, \"Meal_ID\": 14}]',165),(6,1,2,'WAIT_FOR_APPROVAL','2025-01-10 05:30:00','[{\"Amount\": 1, \"Meal_ID\": 8}]',100);
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vendor`
--

DROP TABLE IF EXISTS `Vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vendor` (
  `Vendor_ID` int NOT NULL AUTO_INCREMENT,
  `Type` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Address` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Image_url` varchar(8192) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Status` tinyint(1) DEFAULT NULL,
  `Email` varchar(256) NOT NULL,
  `Password` varchar(30) NOT NULL,
  PRIMARY KEY (`Vendor_ID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vendor`
--

LOCK TABLES `Vendor` WRITE;
/*!40000 ALTER TABLE `Vendor` DISABLE KEYS */;
INSERT INTO `Vendor` VALUES (2,'台灣美食','五九麵館','106台北市大安區和平東路二段118巷59號','https://MealOrder.blob.core.windows.net/image/2025-01-05T14%3A21%3A59.203_666f655a-7362-4154-a601-893d4dc9eace_59logo.png?sp=racwdl&st=2025-01-05T10:17:31Z&se=2025-12-31T18:17:31Z&sip=0.0.0.0-255.255.255.255&spr=https&sv=2022-11-02&sr=c&sig=rnnxGmMF6gfW5szTTCo7FkNPpBo3SZeVwZo66heKw6Y%3D',1,'59@gmail.com','password'),(3,'義大利美食','I’m Pasta','106台北市大安區和平東路二段118巷50號','https://MealOrder.blob.core.windows.net/image/2025-01-05T16%3A42%3A48.998_d084808a-9959-496c-a343-c9e967dcd181_2024-06-29.jpg?sp=racwdl&st=2025-01-05T10:17:31Z&se=2025-12-31T18:17:31Z&sip=0.0.0.0-255.255.255.255&spr=https&sv=2022-11-02&sr=c&sig=rnnxGmMF6gfW5szTTCo7FkNPpBo3SZeVwZo66heKw6Y%3D',1,'pasta@gmail.com','password'),(4,'中式美食','test','test','https://MealOrder.blob.core.windows.net/image/2025-01-06T12%3A10%3A39.178_10079713-8e4c-4c54-9236-51e1c74a8f5d_2024-06-29.jpg?sp=racwdl&st=2025-01-05T10:17:31Z&se=2025-12-31T18:17:31Z&sip=0.0.0.0-255.255.255.255&spr=https&sv=2022-11-02&sr=c&sig=rnnxGmMF6gfW5szTTCo7FkNPpBo3SZeVwZo66heKw6Y%3D',1,'test@gmail.com','test');
/*!40000 ALTER TABLE `Vendor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-11 23:54:05
