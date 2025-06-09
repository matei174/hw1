-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Giu 09, 2025 alle 22:17
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Traveluma`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `carrello_utente`
--

CREATE TABLE `carrello_utente` (
  `id` int(11) NOT NULL,
  `email_utente` varchar(255) DEFAULT NULL,
  `nome_viaggio` varchar(255) DEFAULT NULL,
  `prezzo` decimal(10,2) DEFAULT NULL,
  `data_aggiunta` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `preferiti`
--

CREATE TABLE `preferiti` (
  `email_utente` varchar(255) NOT NULL,
  `id_viaggio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `preferiti`
--

INSERT INTO `preferiti` (`email_utente`, `id_viaggio`) VALUES
('mateiflusca@gmail.com', 2),
('mateiflusca@gmail.com', 4),
('mateiflusca@gmail.com', 5),
('mateiflusca@gmail.com', 6);

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `data_registrazione` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id`, `nome`, `cognome`, `email`, `password`, `data_registrazione`) VALUES
(1, 'Matei', 'Flusca', 'mateiflusca@gmail.com', '$2y$10$1mqLpxZA.PCqw7uqqe8hMu.VEzpxHPfzOX3BWZR.b2CF9jFtPEiyu', '2025-06-06 10:21:32'),
(2, 'Mario', 'Rossi', 'mario.123@gmail.com', '$2y$10$3hehhP8zI8NJK9lNEjqO6OzdWDrE1cEmrGxkh.UxhaeDklo4a0PjK', '2025-06-06 10:25:50');

-- --------------------------------------------------------

--
-- Struttura della tabella `viaggi`
--

CREATE TABLE `viaggi` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `prezzo` float NOT NULL,
  `descrizione` text DEFAULT NULL,
  `immagine` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `viaggi`
--

INSERT INTO `viaggi` (`id`, `nome`, `prezzo`, `descrizione`, `immagine`) VALUES
(1, 'Bali', 1899, 'Bali è un paradiso tropicale famoso per le sue spiagge, risaie e templi antichi. L’isola offre una perfetta combinazione di relax, cultura e avventura. Non perderti il tramonto a Tanah Lot e una giornata a Ubud!', 'https://image.urlaubspiraten.de/1280/image/upload/v1628092143/mediavault_images/AdobeStock_103587221_or1mfx.jpg'),
(2, 'Vienna', 399, 'Vienna è il cuore culturale dell’Austria, con palazzi imperiali e caffè storici. Visita il Palazzo di Schönbrunn e ascolta un concerto di musica classica. In autunno, la città si colora di magia tra mercatini e festival.', 'https://image.urlaubspiraten.de/1024/image/upload/v1693834412/mediavault_images/shutterstock_2111152469_nodimj.jpg'),
(3, 'Parigi', 599, 'La città dell’amore incanta con la Torre Eiffel, Montmartre e il Louvre. Passeggia lungo la Senna e scopri i bistrot tipici della capitale francese. Settembre è perfetto per un picnic nei giardini del Luxembourg!', 'https://image.urlaubspiraten.de/1024/image/upload/v1693835791/mediavault_images/shutterstock_2192759643_lztadm.jpg'),
(4, 'Mykonos', 450, 'Famosa per le sue case bianche e spiagge dorate, Mykonos è l’isola del divertimento. Goditi il tramonto a Little Venice e le serate nei beach club. Esplora le spiagge di Psarou e Super Paradise per un’esperienza unica!', 'https://image.urlaubspiraten.de/1024/image/upload/v1641468062/Impressions%20and%20Other%20Assets/s3_evbvcd.jpg'),
(5, 'Bucarest', 299, 'La “Parigi dell’Est” è una città di contrasti, tra palazzi neoclassici e architettura sovietica. Visita il Palazzo del Parlamento, uno dei più grandi al mondo. Scopri la vivace vita notturna e i caffè alternativi del centro storico.', 'https://image.urlaubspiraten.de/1280/image/upload/v1616421168/mediavault_images/shutterstock_1174394233_w2r7l8.jpg'),
(6, 'Roma', 239, 'Roma è un museo a cielo aperto, con il Colosseo, il Vaticano e la Fontana di Trevi. Assapora la vera carbonara e un gelato mentre passeggi per Trastevere. Maggio è ideale per esplorare la città senza il caldo estivo!', 'https://image.urlaubspiraten.de/1024/image/upload/v1655808713/mediavault_images/AdobeStock_37045590_wvyn3s.jpg');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `carrello_utente`
--
ALTER TABLE `carrello_utente`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `preferiti`
--
ALTER TABLE `preferiti`
  ADD PRIMARY KEY (`email_utente`,`id_viaggio`),
  ADD KEY `id_viaggio` (`id_viaggio`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`),
  ADD UNIQUE KEY `cognome` (`cognome`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indici per le tabelle `viaggi`
--
ALTER TABLE `viaggi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `carrello_utente`
--
ALTER TABLE `carrello_utente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `viaggi`
--
ALTER TABLE `viaggi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `preferiti`
--
ALTER TABLE `preferiti`
  ADD CONSTRAINT `preferiti_ibfk_1` FOREIGN KEY (`id_viaggio`) REFERENCES `viaggi` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
