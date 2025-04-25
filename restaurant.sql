-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 25, 2025 at 08:52 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `ban`
--

DROP TABLE IF EXISTS `ban`;
CREATE TABLE IF NOT EXISTS `ban` (
  `id_ban` int NOT NULL AUTO_INCREMENT,
  `so_nguoi` int DEFAULT NULL,
  `ten_ban` varchar(255) DEFAULT NULL,
  `trang_thai` varchar(255) DEFAULT NULL,
  `vi_tri` varchar(255) DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_ban`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ban`
--

INSERT INTO `ban` (`id_ban`, `so_nguoi`, `ten_ban`, `trang_thai`, `vi_tri`, `deleted`) VALUES
(1, 4, 'No1', 'Empty', 'Outside', NULL),
(2, 4, 'No2', 'Empty', 'Inside', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
CREATE TABLE IF NOT EXISTS `bill` (
  `id_hd` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `ten_nv` varchar(255) DEFAULT NULL,
  `tong_tien` int DEFAULT NULL,
  `trang_thai` varchar(255) DEFAULT NULL,
  `id_ban` int DEFAULT NULL,
  `id_kh` int DEFAULT NULL,
  `id_voucher` int DEFAULT NULL,
  PRIMARY KEY (`id_hd`),
  KEY `FK8g8ilxsssqtbwisnxntuicyrb` (`id_kh`),
  KEY `FKp1cfhmgukkvd7vs992pdocfvb` (`id_voucher`),
  KEY `FKrmv9itqupypdqp5f7x7cy8qdj` (`id_ban`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`id_hd`, `ho_ten`, `ngay_tao`, `ten_nv`, `tong_tien`, `trang_thai`, `id_ban`, `id_kh`, `id_voucher`) VALUES
(1, 'Khách lẻ', '2025-04-11 07:00:00.000000', 'admin', 0, 'Initialization', 1, NULL, NULL),
(2, 'Truong Nguyen', '2025-04-11 07:00:00.000000', 'admin', 20000, 'Initialization', 1, 2, NULL),
(3, 'Khách lẻ', '2025-04-11 07:00:00.000000', 'admin', 0, 'Initialization', 1, NULL, NULL),
(5, 'Khách lẻ', '2025-04-11 07:00:00.000000', 'admin', 20000, 'Initialization', 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `billdetail`
--

DROP TABLE IF EXISTS `billdetail`;
CREATE TABLE IF NOT EXISTS `billdetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `so_luong` int DEFAULT NULL,
  `thanh_tien` int DEFAULT NULL,
  `id_hd` int DEFAULT NULL,
  `id_mon` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK534v7hqlrj3856a75flwo8mqh` (`id_hd`),
  KEY `FKltm5giooyj9gmbhnn0it0ld6f` (`id_mon`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `billdetail`
--

INSERT INTO `billdetail` (`id`, `so_luong`, `thanh_tien`, `id_hd`, `id_mon`) VALUES
(1, 1, 20000, 2, 1),
(2, 1, 20000, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id_loai` int NOT NULL AUTO_INCREMENT,
  `ten_loai` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_loai`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_loai`, `ten_loai`) VALUES
(1, 'Appetizers'),
(2, 'Seafood'),
(3, 'Beverages'),
(4, 'Desserts'),
(5, 'Main Courses');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  `sodt` int DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id_user`, `ho_ten`, `password`, `role`, `sodt`, `username`) VALUES
(1, NULL, '$2a$10$jbWhTkY1hbY0geByQilsvuiH6XEo0e7D.Y7HojUu5nBCTwtkdnR0.', 'ADMIN', NULL, 'admin'),
(2, 'Nguyen Tie', '$2a$10$jbWhTkY1hbY0geByQilsvuiH6XEo0e7D.Y7HojUu5nBCTwtkdnR0.', 'USER', 523569703, 'truongne');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
CREATE TABLE IF NOT EXISTS `food` (
  `id_mon` int NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `ten_mon` varchar(255) DEFAULT NULL,
  `loai_mon_an` int DEFAULT NULL,
  PRIMARY KEY (`id_mon`),
  KEY `FK7utjswo79pxam76oarmff02dd` (`loai_mon_an`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id_mon`, `deleted`, `gia_tien`, `hinh_anh`, `mo_ta`, `ten_mon`, `loai_mon_an`) VALUES
(1, b'0', 20000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1743091829/twm7ii2qronvmrfxae7c.webp', '', 'Spring Rolls', 1),
(2, b'0', 100000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1743091919/brs64otd3jjr4zwfnebw.jpg', '', 'Grilled Oysters with Cheese', 2),
(3, b'0', 30000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744362974/d3ziulcjsgsff2xe6r8y.jpg', '', 'Fresh Salad', 1),
(4, b'1', 30000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744362976/lqhlcdmnpn8ntltmxb1b.jpg', '', 'Fresh Salad', 1),
(5, b'0', 40000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744363302/q9kselry7ltretctonzj.jpg', '', 'Garlic Bread', 1),
(6, b'0', 35000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744609183/ypxtrf8n5rnbiocg1xwf.jpg', '', 'Mozzarella Sticks', 1),
(7, b'0', 45000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744609525/ddwqybsslta1i1taq0an.jpg', '', 'Fried Calamari', 2),
(8, b'0', 30000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744609955/ls01ichauyv1qehlohjt.jpg', '', 'Chicken Wings', 1),
(9, b'0', 80000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744610489/rgesdxridmmgz2w0ryjv.jpg', '', 'Steamed Clams', 2),
(10, b'0', 95000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744610814/vfw3t6wkdcncvbdq9x9t.jpg', '', 'Steamed Crab', 2),
(11, b'0', 90000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744610943/vvhdxgxhu2wraypb3dmh.jpg', '', 'Lobster Thermidor', 2),
(12, b'0', 15000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744611375/xsjkwtvyj3kfn5xmirlq.webp', '', 'Coca Cola', 3),
(13, b'0', 15000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744611452/bvoqmviwbjncasocscrt.png', '', 'Sting', 3),
(14, b'0', 15000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744611644/kv9vm3uzlpyiyroozo3y.webp', '', '7Up', 3),
(15, b'0', 8000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744611753/m8m8qvr9ru8lgs8fr8qb.jpg', '', 'Aquafina', 3),
(16, b'0', 18000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744612167/s8wvnmfzypk5hz7zyglh.jpg', '', 'Tiger Silver', 3),
(17, b'0', 28000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744612826/hw4kjujtgsrw4myyku4k.webp', '', 'Coconut Jelly', 4),
(18, b'0', 45000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744612962/ngwznsesebworty3ytwm.jpg', '', 'Cheese Cake', 4),
(19, b'0', 20000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744613653/makxvkyxgelclh81ycz1.jpg', '', 'Panna Cotta', 4),
(20, b'0', 27000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744614184/zftqoyybgx9orjfpviyv.webp', '', 'Tiramisu', 4),
(21, b'0', 37000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744614282/q1hcblkbokclss0zg7ys.jpg', '', 'Sweet Sticky Rice with Mango', 4),
(22, b'0', 140000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744614959/apq4ljep60jdagtmku0c.jpg', '', 'Beef Steak', 5),
(23, b'0', 70000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744615270/itaeari2ilc3gudwh2yh.jpg', '', 'Grilled Lemongrass Chicken', 5),
(24, b'0', 250000, 'http://res.cloudinary.com/dis3h8jsk/image/upload/v1744615745/iipquilwiffaj8dty7ks.jpg', '', 'Crab in Tamarind Sauce', 5);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ngay_thanh_toan` datetime(6) DEFAULT NULL,
  `phuong_thuc_tt` varchar(255) DEFAULT NULL,
  `so_tien` int DEFAULT NULL,
  `id_hd` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKposwfqn49rbasstufhhh3s0el` (`id_hd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservationdetail`
--

DROP TABLE IF EXISTS `reservationdetail`;
CREATE TABLE IF NOT EXISTS `reservationdetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `so_luong` int DEFAULT NULL,
  `tong_tien` int DEFAULT NULL,
  `id_dondatban` int DEFAULT NULL,
  `id_mon` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgkmmnq8j9qpmbdix1s6txoaus` (`id_dondatban`),
  KEY `FK7e57dqytnexbqxfw3fe2u96fw` (`id_mon`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reservationdetail`
--

INSERT INTO `reservationdetail` (`id`, `so_luong`, `tong_tien`, `id_dondatban`, `id_mon`) VALUES
(1, 1, 20000, 4, 1),
(2, 1, 20000, 5, 1),
(3, 1, 20000, 6, 1),
(4, 1, 20000, 7, 1),
(5, 1, 40000, 8, 5),
(6, 1, 40000, 9, 5),
(7, 1, 40000, 10, 5),
(8, 1, 40000, 11, 5);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
CREATE TABLE IF NOT EXISTS `staff` (
  `id_nv` int NOT NULL AUTO_INCREMENT,
  `chuc_vi` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id_nv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `table_reservation`
--

DROP TABLE IF EXISTS `table_reservation`;
CREATE TABLE IF NOT EXISTS `table_reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `ngay_dat` date DEFAULT NULL,
  `so_dt` varchar(255) DEFAULT NULL,
  `so_luong` int DEFAULT NULL,
  `thoi_gian` time(6) DEFAULT NULL,
  `trang_thai` varchar(255) DEFAULT NULL,
  `id_ban` int DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb30e1je6suhsgtk56qma1dd32` (`id_user`),
  KEY `FKfi2wwgq78r7i0fs7s0sgiym36` (`id_ban`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `table_reservation`
--

INSERT INTO `table_reservation` (`id`, `ghi_chu`, `ho_ten`, `ngay_dat`, `so_dt`, `so_luong`, `thoi_gian`, `trang_thai`, `id_ban`, `id_user`, `email`) VALUES
(4, 'nooo', 'Truong Nguyen', '2025-11-22', '0506562037', 2, '10:00:00.000000', 'Cancelled', 1, 2, NULL),
(5, 'kkk', 'Truong Nguyen', '2025-02-02', '0506562037', 3, '10:00:00.000000', 'Cancelled', 1, 2, NULL),
(6, 'hjhjhj', 'Truong Nguyen', '2025-02-22', '0506562037', 2, '11:00:00.000000', 'Cancelled', 1, 2, NULL),
(7, 'hyhyhy', 'Truong Nguyen', '2025-02-12', '0506562037', 2, '10:00:00.000000', 'Completed', 1, 2, NULL),
(8, 'đasadsa', 'aaaaadd', '2025-04-29', '0506562037', 3, '12:00:00.000000', 'Cancelled', 2, NULL, NULL),
(9, 'jiji', 'aaaaadd', '2025-04-21', '0506562037', 2, '14:00:00.000000', 'Cancelled', 1, NULL, NULL),
(10, 'ggtggt', '25-4', '2025-04-29', '0506562037', 4, '11:00:00.000000', 'Cancelled', 1, 2, NULL),
(11, 'erweewrewrrwe', 'Trường Nguyễn', '2025-04-28', '0506562037', 3, '11:00:00.000000', 'Cancelled', 2, 2, NULL),
(12, 'abc', 'hvh', '2025-04-24', '0292827464', 4, '12:00:00.000000', 'Cancelled', NULL, NULL, NULL),
(13, 'jajsaj', 'titi', '2025-04-25', '050500580', 3, '13:00:00.000000', 'Cancelled', NULL, NULL, NULL),
(14, 'jajajaja', 'sadasd', '2025-04-25', '123123123123', 1, '12:00:00.000000', 'Cancelled', NULL, NULL, NULL),
(15, 'jasasja', 'utrourttri', '2025-04-25', '09832183210291', 2, '12:00:00.000000', 'Cancelled', NULL, NULL, NULL),
(16, '', '', '2025-04-09', '', 4, '13:00:00.000000', 'Cancelled', NULL, NULL, NULL),
(17, '', '', '2025-04-25', '', 2, '16:00:00.000000', 'Cancelled', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
CREATE TABLE IF NOT EXISTS `voucher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `so_tien` int DEFAULT NULL,
  `ten_ma` varchar(255) DEFAULT NULL,
  `trang_thai` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `FK8g8ilxsssqtbwisnxntuicyrb` FOREIGN KEY (`id_kh`) REFERENCES `customer` (`id_user`),
  ADD CONSTRAINT `FKp1cfhmgukkvd7vs992pdocfvb` FOREIGN KEY (`id_voucher`) REFERENCES `voucher` (`id`),
  ADD CONSTRAINT `FKrl4q25som6km4xleuojbqqm3j` FOREIGN KEY (`id_ban`) REFERENCES `ban` (`id_ban`);

--
-- Constraints for table `billdetail`
--
ALTER TABLE `billdetail`
  ADD CONSTRAINT `FK534v7hqlrj3856a75flwo8mqh` FOREIGN KEY (`id_hd`) REFERENCES `bill` (`id_hd`),
  ADD CONSTRAINT `FKltm5giooyj9gmbhnn0it0ld6f` FOREIGN KEY (`id_mon`) REFERENCES `food` (`id_mon`);

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `FK7utjswo79pxam76oarmff02dd` FOREIGN KEY (`loai_mon_an`) REFERENCES `category` (`id_loai`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `FKposwfqn49rbasstufhhh3s0el` FOREIGN KEY (`id_hd`) REFERENCES `bill` (`id_hd`);

--
-- Constraints for table `reservationdetail`
--
ALTER TABLE `reservationdetail`
  ADD CONSTRAINT `FK7e57dqytnexbqxfw3fe2u96fw` FOREIGN KEY (`id_mon`) REFERENCES `food` (`id_mon`),
  ADD CONSTRAINT `FKgkmmnq8j9qpmbdix1s6txoaus` FOREIGN KEY (`id_dondatban`) REFERENCES `table_reservation` (`id`);

--
-- Constraints for table `table_reservation`
--
ALTER TABLE `table_reservation`
  ADD CONSTRAINT `FKb30e1je6suhsgtk56qma1dd32` FOREIGN KEY (`id_user`) REFERENCES `customer` (`id_user`),
  ADD CONSTRAINT `FKfvawh6rs1tu8acfkrkou2tlmh` FOREIGN KEY (`id_ban`) REFERENCES `ban` (`id_ban`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
