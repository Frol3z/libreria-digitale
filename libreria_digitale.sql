-- phpMyAdmin SQL Dump
-- version 4.1.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 24, 2021 at 04:07 PM
-- Server version: 8.0.21
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `my_rwu`
--

-- --------------------------------------------------------

--
-- Table structure for table `autori`
--

CREATE TABLE IF NOT EXISTS `autori` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci AUTO_INCREMENT=60 ;

-- --------------------------------------------------------

--
-- Table structure for table `generi`
--

CREATE TABLE IF NOT EXISTS `generi` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `valore` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci AUTO_INCREMENT=18 ;

-- --------------------------------------------------------

--
-- Table structure for table `librerie`
--

CREATE TABLE IF NOT EXISTS `librerie` (
  `ID_libro` varchar(100) NOT NULL,
  `ID_utente` int NOT NULL,
  `pagine_lette` int DEFAULT NULL,
  `pagine_tot` int DEFAULT NULL,
  `data_inizio` date DEFAULT NULL,
  `data_fine` date DEFAULT NULL,
  `stato` int NOT NULL,
  PRIMARY KEY (`ID_libro`,`ID_utente`),
  KEY `librerie_ibfk_1` (`ID_libro`),
  KEY `librerie_ibfk_2` (`ID_utente`),
  KEY `stato` (`stato`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `libri`
--

CREATE TABLE IF NOT EXISTS `libri` (
  `ID` varchar(100) NOT NULL,
  `industrial_ID` varchar(30) DEFAULT NULL,
  `industrial_ID_type` varchar(30) DEFAULT NULL,
  `titolo` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `descrizione` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lingue` varchar(5) DEFAULT NULL,
  `anno_pubblicazione` varchar(4) DEFAULT NULL,
  `editore` varchar(100) DEFAULT NULL,
  `viewability` varchar(20) DEFAULT NULL,
  `maturity_rating` varchar(20) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `img_link` varchar(200) DEFAULT NULL,
  `download_link_pdf` varchar(200) DEFAULT NULL,
  `download_link_epub` varchar(200) DEFAULT NULL,
  `web_reader_link` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `libri_autori`
--

CREATE TABLE IF NOT EXISTS `libri_autori` (
  `ID_libro` varchar(100) NOT NULL,
  `ID_autore` int NOT NULL,
  PRIMARY KEY (`ID_libro`,`ID_autore`),
  KEY `libri_autori_ibfk_2` (`ID_autore`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `libri_generi`
--

CREATE TABLE IF NOT EXISTS `libri_generi` (
  `ID_libro` varchar(100) NOT NULL,
  `ID_genere` int NOT NULL,
  PRIMARY KEY (`ID_libro`,`ID_genere`),
  KEY `libri_generi_ibfk_2` (`ID_genere`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stati`
--

CREATE TABLE IF NOT EXISTS `stati` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `valore` varchar(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `utenti`
--

CREATE TABLE IF NOT EXISTS `utenti` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `cognome` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci AUTO_INCREMENT=98283 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `librerie`
--
ALTER TABLE `librerie`
  ADD CONSTRAINT `librerie_ibfk_1` FOREIGN KEY (`ID_libro`) REFERENCES `libri` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `librerie_ibfk_2` FOREIGN KEY (`ID_utente`) REFERENCES `utenti` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `librerie_ibfk_3` FOREIGN KEY (`stato`) REFERENCES `stati` (`ID`);

--
-- Constraints for table `libri_autori`
--
ALTER TABLE `libri_autori`
  ADD CONSTRAINT `libri_autori_ibfk_1` FOREIGN KEY (`ID_libro`) REFERENCES `libri` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `libri_autori_ibfk_2` FOREIGN KEY (`ID_autore`) REFERENCES `autori` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `libri_generi`
--
ALTER TABLE `libri_generi`
  ADD CONSTRAINT `libri_generi_ibfk_1` FOREIGN KEY (`ID_libro`) REFERENCES `libri` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `libri_generi_ibfk_2` FOREIGN KEY (`ID_genere`) REFERENCES `generi` (`ID`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
