-- MySQL dump 10.13  Distrib 8.4.5, for Win64 (x86_64)
--
-- Host: localhost    Database: pharmacy_record
-- ------------------------------------------------------
-- Server version	8.4.5

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
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `C_ID` int NOT NULL,
  `C_Fname` varchar(50) DEFAULT NULL,
  `C_Lname` varchar(50) DEFAULT NULL,
  `C_Age` int DEFAULT NULL,
  `C_Gender` char(1) DEFAULT NULL,
  `C_Phone` varchar(15) DEFAULT NULL,
  `C_Mail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`C_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1001,'Michael','Smith',42,'M','503-555-1001','msmith@email.com'),(1002,'Jennifer','Davis',35,'F','503-555-1002','jdavis@email.com'),(1003,'David','Wilson',67,'M','503-555-1003','dwilson@email.com'),(1004,'Lisa','Martinez',29,'F','503-555-1004','lmartinez@email.com'),(1005,'Thomas','Anderson',51,'M','503-555-1005','tanderson@email.com'),(1006,'Maria','Garcia',44,'F','503-555-1006','mgarcia@email.com'),(1007,'James','Brown',73,'M','503-555-1007','jbrown@email.com'),(1008,'Emma','Taylor',31,'F','503-555-1008','etaylor@email.com'),(1009,'William','Lee',58,'M','503-555-1009','wlee@email.com'),(1010,'Sophia','Nguyen',26,'F','503-555-1010','snguyen@email.com');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emplogin`
--

DROP TABLE IF EXISTS `emplogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emplogin` (
  `E_Username` varchar(50) NOT NULL,
  `E_Password` varchar(255) DEFAULT NULL,
  `E_ID` int DEFAULT NULL,
  PRIMARY KEY (`E_Username`),
  KEY `E_ID` (`E_ID`),
  CONSTRAINT `emplogin_ibfk_1` FOREIGN KEY (`E_ID`) REFERENCES `employee` (`E_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emplogin`
--

LOCK TABLES `emplogin` WRITE;
/*!40000 ALTER TABLE `emplogin` DISABLE KEYS */;
INSERT INTO `emplogin` VALUES ('admin','admin',101),('jpatel','password',104),('rchen','pass',102),('user','user',103);
/*!40000 ALTER TABLE `emplogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `E_ID` int NOT NULL,
  `E_Fname` varchar(50) DEFAULT NULL,
  `E_Lname` varchar(50) DEFAULT NULL,
  `Bdate` date DEFAULT NULL,
  `E_Age` int DEFAULT NULL,
  `E_Gender` char(1) DEFAULT NULL,
  `E_Type` varchar(50) DEFAULT NULL,
  `E_Jdate` date DEFAULT NULL,
  `E_Add` varchar(255) DEFAULT NULL,
  `E_Mail` varchar(100) DEFAULT NULL,
  `E_Phone` varchar(15) DEFAULT NULL,
  `E_Sal` decimal(10,2) DEFAULT NULL,
  `Designation` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`E_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (101,'Sarah','Johnson','1985-06-15',39,'F','Full Time','2018-03-10','234 Oak St, Portland, OR 97205','sarah.j@pharmamail.com','503-555-2345',75000.00,'Manager'),(102,'Robert','Chen','1978-11-03',46,'M','Full Time','2015-01-22','567 Pine Ave, Portland, OR 97209','robert.c@pharmamail.com','503-555-3456',95000.00,'Owner'),(103,'Emily','Rodriguez','1990-04-25',35,'F','Full Time','2019-07-15','890 Maple Dr, Portland, OR 97214','emily.r@pharmamail.com','503-555-4567',68000.00,'Pharmacist'),(104,'Jason','Patel','1995-09-12',29,'M','Part Time','2021-02-01','123 Cedar Ln, Portland, OR 97220','jason.p@pharmamail.com','503-555-5678',28000.00,'Staff');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meds`
--

DROP TABLE IF EXISTS `meds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meds` (
  `Med_ID` int NOT NULL,
  `Med_Name` varchar(100) DEFAULT NULL,
  `Med_Qty` int DEFAULT NULL,
  `Category` varchar(50) DEFAULT NULL,
  `Med_Price` decimal(10,2) DEFAULT NULL,
  `Location_Rack` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Med_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meds`
--

LOCK TABLES `meds` WRITE;
/*!40000 ALTER TABLE `meds` DISABLE KEYS */;
INSERT INTO `meds` VALUES (201,'Amoxicillin 500mg',150,'Antibiotics',12.99,'A1'),(202,'Lisinopril 10mg',200,'Blood Pressure',9.49,'B2'),(203,'Metformin 500mg',175,'Diabetes',8.99,'B3'),(204,'Atorvastatin 20mg',120,'Cholesterol',15.49,'C1'),(205,'Albuterol Inhaler',50,'Respiratory',29.99,'A3'),(206,'Omeprazole 20mg',160,'Gastrointestinal',10.99,'D2'),(207,'Alprazolam 0.5mg',80,'Anxiety',14.49,'E1'),(208,'Acetaminophen 500mg',250,'Pain Relief',6.99,'A2'),(209,'Ibuprofen 200mg',300,'Pain Relief',5.99,'A2'),(210,'Cetirizine 10mg',140,'Allergy',8.49,'C3'),(211,'Levothyroxine 50mcg',110,'Thyroid',11.99,'D1'),(212,'Sertraline 50mg',90,'Depression',13.49,'E2'),(213,'Fluticasone Nasal Spray',70,'Allergy',19.99,'C3'),(214,'Simvastatin 40mg',130,'Cholesterol',12.49,'C1'),(215,'Metoprolol 25mg',160,'Blood Pressure',9.99,'B2');
/*!40000 ALTER TABLE `meds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `P_ID` int NOT NULL,
  `Med_ID` int DEFAULT NULL,
  `Sup_ID` int DEFAULT NULL,
  `P_Qty` int DEFAULT NULL,
  `P_Cost` decimal(10,2) DEFAULT NULL,
  `Pur_Date` date DEFAULT NULL,
  `Mfg_Date` date DEFAULT NULL,
  `Exp_Date` date DEFAULT NULL,
  PRIMARY KEY (`P_ID`),
  KEY `Med_ID` (`Med_ID`),
  KEY `Sup_ID` (`Sup_ID`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`Med_ID`) REFERENCES `meds` (`Med_ID`) ON DELETE SET NULL,
  CONSTRAINT `purchase_ibfk_2` FOREIGN KEY (`Sup_ID`) REFERENCES `suppliers` (`Sup_ID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (301,201,1,100,800.00,'2024-01-15','2023-10-10','2025-10-10'),(302,205,2,30,600.00,'2024-02-03','2023-11-15','2025-11-15'),(303,208,1,150,450.00,'2024-02-20','2023-12-01','2026-12-01'),(304,212,3,50,400.00,'2024-03-05','2024-01-15','2026-01-15'),(305,215,2,100,550.00,'2024-04-10','2024-02-01','2026-02-01');
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `Sale_ID` int NOT NULL,
  `S_Date` date DEFAULT NULL,
  `S_Time` time DEFAULT NULL,
  `Total_Amt` decimal(10,2) DEFAULT NULL,
  `C_ID` int DEFAULT NULL,
  `E_ID` int DEFAULT NULL,
  PRIMARY KEY (`Sale_ID`),
  KEY `C_ID` (`C_ID`),
  KEY `E_ID` (`E_ID`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`C_ID`) REFERENCES `customer` (`C_ID`) ON DELETE SET NULL,
  CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`E_ID`) REFERENCES `employee` (`E_ID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (401,'2024-04-01','10:15:00',35.97,1001,103),(402,'2024-04-02','14:30:00',29.99,1003,104),(403,'2024-04-05','11:45:00',18.98,1002,103),(404,'2024-04-07','09:20:00',41.47,1005,103),(405,'2024-04-10','16:05:00',12.99,1007,104),(406,'2024-04-12','13:10:00',54.48,1004,103),(407,'2024-04-15','10:40:00',19.99,1006,104),(408,'2024-04-18','15:25:00',26.98,1008,103),(409,'2024-04-20','12:50:00',15.49,1010,104),(410,'2024-04-22','17:15:00',39.96,1009,103);
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_items`
--

DROP TABLE IF EXISTS `sales_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_items` (
  `Med_ID` int DEFAULT NULL,
  `Sale_ID` int DEFAULT NULL,
  `Sale_Qty` int DEFAULT NULL,
  `Tot_Price` decimal(10,2) DEFAULT NULL,
  KEY `Med_ID` (`Med_ID`),
  KEY `Sale_ID` (`Sale_ID`),
  CONSTRAINT `sales_items_ibfk_1` FOREIGN KEY (`Med_ID`) REFERENCES `meds` (`Med_ID`) ON DELETE SET NULL,
  CONSTRAINT `sales_items_ibfk_2` FOREIGN KEY (`Sale_ID`) REFERENCES `sales` (`Sale_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_items`
--

LOCK TABLES `sales_items` WRITE;
/*!40000 ALTER TABLE `sales_items` DISABLE KEYS */;
INSERT INTO `sales_items` VALUES (201,401,1,12.99),(208,401,2,13.98),(209,401,1,5.99),(205,402,1,29.99),(208,403,1,6.99),(209,403,2,11.98),(204,404,1,15.49),(206,404,1,10.99),(207,404,1,14.49),(201,405,1,12.99),(206,406,2,21.98),(210,406,1,8.49),(214,406,1,12.49),(211,406,1,11.99),(213,407,1,19.99),(209,408,2,11.98),(210,408,1,8.49),(212,408,1,6.51),(204,409,1,15.49),(208,410,2,13.98),(210,410,2,16.98),(209,410,1,5.99);
/*!40000 ALTER TABLE `sales_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `Sup_ID` int NOT NULL,
  `Sup_Name` varchar(100) DEFAULT NULL,
  `Sup_Add` varchar(255) DEFAULT NULL,
  `Sup_Phone` varchar(15) DEFAULT NULL,
  `Sup_Mail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Sup_ID`),
  UNIQUE KEY `Sup_Name` (`Sup_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'MedSource Pharmaceuticals','123 Industry Ave, Chicago, IL 60007','312-555-7890','orders@medsource.com'),(2,'Global Health Supplies','456 Commerce Blvd, Atlanta, GA 30303','404-555-1234','sales@globalhealthsupplies.com'),(3,'PharmaWholesale Inc','789 Distribution Dr, Dallas, TX 75001','214-555-6543','contact@pharmawholesale.com');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `top_selling_medicines`
--

DROP TABLE IF EXISTS `top_selling_medicines`;
/*!50001 DROP VIEW IF EXISTS `top_selling_medicines`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `top_selling_medicines` AS SELECT 
 1 AS `Med_ID`,
 1 AS `Med_Name`,
 1 AS `Category`,
 1 AS `Total_Quantity_Sold`,
 1 AS `Total_Revenue`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `top_selling_medicines`
--

/*!50001 DROP VIEW IF EXISTS `top_selling_medicines`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `top_selling_medicines` AS select `m`.`Med_ID` AS `Med_ID`,`m`.`Med_Name` AS `Med_Name`,`m`.`Category` AS `Category`,sum(`s`.`Sale_Qty`) AS `Total_Quantity_Sold`,sum(`s`.`Tot_Price`) AS `Total_Revenue` from (`meds` `m` join `sales_items` `s` on((`m`.`Med_ID` = `s`.`Med_ID`))) group by `m`.`Med_ID`,`m`.`Med_Name`,`m`.`Category` order by `Total_Quantity_Sold` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-05 23:23:50
