-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 08 dec 2022 om 16:06
-- Serverversie: 10.4.27-MariaDB
-- PHP-versie: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `harmonisator`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `co_group`
--

CREATE TABLE `co_group` (
  `g_uid` int(11) NOT NULL COMMENT 'versie 0.1.15',
  `g_name` varchar(255) DEFAULT NULL,
  `g_description` varchar(500) DEFAULT NULL,
  `g_addres` varchar(255) DEFAULT NULL,
  `g_city` varchar(255) DEFAULT NULL,
  `g_website` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `co_group`
--

INSERT INTO `co_group` (`g_uid`, `g_name`, `g_description`, `g_addres`, `g_city`, `g_website`) VALUES
(1, 'Gemeente Vught', NULL, 'Secr. van Rooijstraat 1 5261 EP Vught ', 'Vught', NULL),
(2, 'Leergeld Vught', NULL, NULL, 'Vught', NULL),
(3, 'WegwijsPlus', NULL, NULL, 'Vught', NULL),
(4, 'JFS&C Jeugdfonds Sport en Cultuur', NULL, NULL, 'Vught', NULL),
(5, 'Vincentius', NULL, NULL, 'Vught', NULL),
(6, 'Welzijn Vught', NULL, NULL, 'Vught', NULL);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `co_person`
--

CREATE TABLE `co_person` (
  `p_uid` int(11) NOT NULL COMMENT 'versie 0.1.15',
  `p_name` varchar(255) DEFAULT NULL,
  `p_last_name` varchar(255) DEFAULT NULL,
  `p_first_name` varchar(100) DEFAULT NULL,
  `p_prefix_name` varchar(50) DEFAULT NULL,
  `p_birth_date` date DEFAULT NULL,
  `p_phone_nr` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `co_person`
--

INSERT INTO `co_person` (`p_uid`, `p_name`, `p_last_name`, `p_first_name`, `p_prefix_name`, `p_birth_date`, `p_phone_nr`) VALUES
(1, 'Elisabeth Bloemers', NULL, NULL, NULL, NULL, NULL),
(2, 'Beate Janssen', NULL, NULL, NULL, NULL, NULL),
(3, 'Hermien Stal', NULL, NULL, NULL, NULL, NULL),
(4, 'Toine de Wolf', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `co_theme`
--

CREATE TABLE `co_theme` (
  `the_uid` int(11) NOT NULL,
  `the_uuid` varchar(36) DEFAULT NULL,
  `the_type_code` varchar(2) DEFAULT NULL,
  `the_name` varchar(255) NOT NULL,
  `the_description` text DEFAULT NULL,
  `the_code` varchar(50) DEFAULT NULL,
  `the_icon` varchar(255) DEFAULT NULL,
  `the_image` varchar(255) DEFAULT NULL,
  `the_nr` char(2) DEFAULT NULL,
  `the_subnr` char(2) DEFAULT NULL,
  `the_level_nr` tinyint(3) UNSIGNED DEFAULT NULL,
  `the_tree_nr` varchar(30) DEFAULT NULL,
  `the_lang_code` char(5) DEFAULT 'nl-NL',
  `the_input_code` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='CC Versie 0.5.2';

--
-- Gegevens worden geëxporteerd voor tabel `co_theme`
--

INSERT INTO `co_theme` (`the_uid`, `the_uuid`, `the_type_code`, `the_name`, `the_description`, `the_code`, `the_icon`, `the_image`, `the_nr`, `the_subnr`, `the_level_nr`, `the_tree_nr`, `the_lang_code`, `the_input_code`) VALUES
(1, NULL, 'TH', 'Belastingen, uitkeringen en toeslagen', NULL, NULL, NULL, NULL, '1', NULL, 1, '0100', 'nl-NL', '20221128-1030-excel-0001'),
(2, NULL, 'TH', 'Bouwen en wonen', NULL, NULL, NULL, NULL, '2', NULL, 1, '0200', 'nl-NL', '20221128-1030-excel-0002'),
(3, NULL, 'TH', 'Economie', NULL, NULL, NULL, NULL, '3', NULL, 1, '0300', 'nl-NL', '20221128-1030-excel-0003'),
(4, NULL, 'TH', 'Familie, zorg en gezondheid', 'Zorg en welzijn', NULL, NULL, NULL, '4', NULL, 1, '0400', 'nl-NL', '20221128-1030-excel-0004'),
(5, NULL, 'TH', 'Internationale samenwerking', NULL, NULL, NULL, NULL, '5', NULL, 1, '0500', 'nl-NL', '20221128-1030-excel-0005'),
(6, NULL, 'TH', 'Klimaat, milieu en natuur', NULL, NULL, NULL, NULL, '6', NULL, 1, '0600', 'nl-NL', '20221128-1030-excel-0006'),
(7, NULL, 'TH', 'Migratie en reizen', NULL, NULL, NULL, NULL, '7', NULL, 1, '0700', 'nl-NL', '20221128-1030-excel-0007'),
(8, NULL, 'TH', 'Onderwijs', NULL, NULL, NULL, NULL, '8', NULL, 1, '0800', 'nl-NL', '20221128-1030-excel-0008'),
(9, NULL, 'TH', 'Overheid en democratie', NULL, NULL, NULL, NULL, '9', NULL, 1, '0900', 'nl-NL', '20221128-1030-excel-0009'),
(10, NULL, 'TH', 'Recht, veiligheid en defensie', NULL, NULL, NULL, NULL, '10', NULL, 1, '1000', 'nl-NL', '20221128-1030-excel-0010'),
(11, NULL, 'TH', 'Verkeer en vervoer', NULL, NULL, NULL, NULL, '11', NULL, 1, '1100', 'nl-NL', '20221128-1030-excel-0011'),
(12, NULL, 'TH', 'Werk', NULL, NULL, NULL, NULL, '12', NULL, 1, '1200', 'nl-NL', '20221128-1030-excel-0012'),
(13, NULL, 'TH', 'Vrije tijd - Sport', NULL, NULL, NULL, NULL, '4', '1', 2, '0401', 'nl-NL', '20221128-1030-excel-0013'),
(14, NULL, 'TH', 'Vrije tijd - Cultuur', NULL, NULL, NULL, NULL, '9', '1', 2, '0901', 'nl-NL', '20221128-1030-excel-0014');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `facility`
--

CREATE TABLE `facility` (
  `fac_uid` int(11) NOT NULL COMMENT 'versie 0.3',
  `fac_label` varchar(255) DEFAULT NULL,
  `fac_definition` varchar(255) DEFAULT NULL,
  `fac_description` varchar(500) DEFAULT NULL,
  `fac_comment` text DEFAULT NULL,
  `fac_details` text DEFAULT NULL,
  `fac_target_group_code` varchar(255) DEFAULT NULL,
  `fac_the_uid` int(11) DEFAULT NULL,
  `fac_cluster_uid` int(11) DEFAULT NULL,
  `fac_g_provider_uid` int(11) DEFAULT NULL,
  `fac_g_intermediair_uid` int(11) DEFAULT NULL,
  `fac_p_contact_uid` int(11) DEFAULT NULL,
  `fac_input_code` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `facility`
--

INSERT INTO `facility` (`fac_uid`, `fac_label`, `fac_definition`, `fac_description`, `fac_comment`, `fac_details`, `fac_target_group_code`, `fac_the_uid`, `fac_cluster_uid`, `fac_g_provider_uid`, `fac_g_intermediair_uid`, `fac_p_contact_uid`, `fac_input_code`) VALUES
(1, 'Verplichte schoolreisjes/kampen', NULL, 'Eerst via school. Voortgezet Onderwijs: alleen bijz. bijstand als sociaal isolement dreigt. Basis Ond: via Leergeld', 'Schoolreisjes', NULL, 'Kind', 8, 1, NULL, 3, NULL, '20221201-1210-excel-0001'),
(4, 'Bijles, huiswerkbegeleiding', NULL, 'aanvraag: www.samenvoorallekinderen.nl; intermediair; als < 110% bijstandsnorm; 110 - 150%: in overleg', 'Schoolkosten', NULL, 'Kind', 8, 2, NULL, 2, 1, '20221201-1210-excel-0002'),
(8, 'PC, laptop, tablet', '', 'Gezinslaptop: voor gezinnen met kinderen op de basisschool. \n', 'Voor kinderen op het Voortgezet Onderwijs kun je bij Baanbrekers een vergoeding voor de laptop aanvragen.', 'Eerst vragen ouders aan school. Daarna aanvragen via https://wegwijsplus.vught.nl/kindpakket. 10 - 17 jarigen.', 'Kind', 8, 3, 0, 3, 0, '20221201-1210-excel-0003'),
(10, 'Fiets', NULL, 'Via www.wegwijsplus.vught.nl/kindpakket. Vanaf 4 jaar. Bakkersrek is apart leverbaar.', 'Vervoer', NULL, 'Kind', 8, 4, NULL, 3, NULL, '20221201-1210-excel-0004'),
(15, 'Peuterzwemmen', NULL, 'aanvraag indienen via school, Wegwijs+, Leergeld, of Bureau Jeugdzorg; max. € 225 (totaalbudget)', 'Zwemlessen', NULL, 'Kind', 13, 5, NULL, 4, 2, '20221201-1210-excel-0005'),
(18, 'Muziek, dans, toneel, tekenles ', NULL, 'aanvraag indienen via school, Wegwijs+, Leergeld, of Bureau Jeugdzorg; max. € 425 (totaalbudget)', 'Cultuur', NULL, 'Kind', 14, 6, NULL, 4, 2, '20221201-1210-excel-0006'),
(23, 'Jarige Job (4 t/m 12 jaar)', NULL, 'aanvraag: www.samenvoorallekinderen.nl; intermediair; als < 110% bijstandsnorm; 110 - 150%: in overleg', 'Verjaardag', NULL, 'Kind', 4, 7, NULL, 2, 1, '20221201-1210-excel-0007'),
(26, 'Vakantieweek / weekend', NULL, 'aanvraag via verwijzers (Gemeente, Voedselbank, Vincentius, Leergeld, etc), niet als particulier', 'Kampen', NULL, 'Kind', 4, 8, NULL, 5, 3, '20221201-1210-excel-0008'),
(36, 'Inloopspreekuur', NULL, 'M.n. voor eenmalige geld-vragen. Is op woensdagmorgen, 10-12 u, Vincentiushuis, Ketting 20, Vught', 'Schulphulpverlening', NULL, 'Ouders', 4, 9, NULL, 5, NULL, '20221201-1210-excel-0009'),
(40, 'Aanmelden', NULL, 'Aanmelden via Wegwijs+. Piet van Doelen indiceert. Aparte leefgeldnorm.', 'Voedselbank', NULL, 'Ouders', 4, 10, NULL, 3, NULL, '20221201-1210-excel-0010'),
(44, 'Vluchtelingenwerk', NULL, 'Bij voorkeur < 1-2 weken van tevoren: naam gezin, evt. contactpersoon, hoe bereikbaar', 'Vluchtelingenwerk', NULL, 'Ouders', 4, 11, NULL, 6, NULL, '20221201-1210-excel-0011');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `co_group`
--
ALTER TABLE `co_group`
  ADD PRIMARY KEY (`g_uid`);

--
-- Indexen voor tabel `co_person`
--
ALTER TABLE `co_person`
  ADD PRIMARY KEY (`p_uid`);

--
-- Indexen voor tabel `co_theme`
--
ALTER TABLE `co_theme`
  ADD PRIMARY KEY (`the_uid`);

--
-- Indexen voor tabel `facility`
--
ALTER TABLE `facility`
  ADD PRIMARY KEY (`fac_uid`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `co_group`
--
ALTER TABLE `co_group`
  MODIFY `g_uid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'versie 0.1.15', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT voor een tabel `co_person`
--
ALTER TABLE `co_person`
  MODIFY `p_uid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'versie 0.1.15', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `co_theme`
--
ALTER TABLE `co_theme`
  MODIFY `the_uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT voor een tabel `facility`
--
ALTER TABLE `facility`
  MODIFY `fac_uid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'versie 0.3', AUTO_INCREMENT=45;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
