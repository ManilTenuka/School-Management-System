-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2024 at 12:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `course_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `course_description`) VALUES
(1, 'Mathematics', 'Basic principles of algebra and geometry'),
(2, 'Physics', 'Introduction to classical mechanics and thermodynamics'),
(3, 'Chemistry', 'Study of basic chemical reactions and properties'),
(4, 'Biology', 'Overview of cell biology, genetics, and ecosystems'),
(5, 'History', 'Study of world events and civilizations'),
(6, 'English Literature', 'Analysis of classic and modern texts'),
(7, 'Computer Science', 'Basics of programming and algorithms'),
(8, 'Art', 'Introduction to various art styles and techniques'),
(9, 'Physical Education', 'Basics of fitness and sports techniques'),
(16, 'Western Music', 'Learn to Sing , Play and Enjoy');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `profile_photo` longblob NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `address` text DEFAULT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `birth_certificate_document` varchar(255) DEFAULT NULL,
  `enrollment_date` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `profile_photo`, `first_name`, `last_name`, `birthday`, `address`, `gender`, `birth_certificate_document`, `enrollment_date`) VALUES
(33, '', 'Emily', 'Johnson', '2010-03-11', '200 Maple St, Hill Valley', 'female', NULL, '2024-09-15'),
(34, '', 'Liam', 'Miller', '2011-07-06', '789 Oak Ave, Metropolis', 'male', NULL, '2024-09-10'),
(35, '', 'Sophia', 'Brown', '2012-05-24', '450 Pine Dr, Emerald City', 'female', '/docs/birth_certificates/Sophia_Brown.pdf', '2024-09-01'),
(36, '', 'Noah', 'Wilson', '2013-11-16', '900 Cherry Ln, Star City', 'male', NULL, '2024-08-25'),
(37, '', 'Mia', 'Anderson', '2012-06-14', '303 Birch Rd, Gotham', 'female', NULL, '2024-08-20'),
(38, '', 'Jacob', 'Harris', '2014-02-18', '600 Spruce St, Central City', 'male', '/docs/birth_certificates/Jacob_Harris.pdf', '2024-08-10'),
(39, '', 'Olivia', 'Thompson', '2011-09-10', '750 Cedar Ct, Smallville', 'female', '/docs/birth_certificates/Olivia_Thompson.pdf', '2024-08-15'),
(40, '', 'Mason', 'Taylor', '2013-01-05', '500 Poplar Ave, Hill Valley', 'male', '/docs/birth_certificates/Mason_Taylor.pdf', '2024-08-05'),
(41, '', 'Isabella', 'Martinez', '2010-10-28', '100 Fir Dr, Riverdale', 'female', '/docs/birth_certificates/Isabella_Martinez.pdf', '2024-07-20'),
(42, '', 'Ethan', 'Robinson', '2012-04-30', '950 Sycamore St, Blüdhaven', 'male', '/docs/birth_certificates/Ethan_Robinson.pdf', '2024-07-15'),
(43, '', 'Ava', 'Clark', '2010-12-05', '120 Willow St, Gotham', 'female', '/docs/birth_certificates/Ava_Clark.pdf', '2024-05-12'),
(44, '', 'James', 'Lewis', '2011-03-22', '555 Maple Dr, Hill Valley', 'male', '/docs/birth_certificates/James_Lewis.pdf', '2024-04-25'),
(45, '', 'Ella', 'Walker', '2012-11-11', '215 Cedar Rd, Star City', 'female', '/docs/birth_certificates/Ella_Walker.pdf', '2024-03-15'),
(46, '', 'Alexander', 'Hall', '2013-08-19', '890 Birch Blvd, Central City', 'male', '/docs/birth_certificates/Alexander_Hall.pdf', '2024-02-20'),
(47, '', 'Grace', 'Allen', '2014-01-14', '450 Cherry Ct, Smallville', 'female', '/docs/birth_certificates/Grace_Allen.pdf', '2024-01-10'),
(48, '', 'Lucas', 'Young', '2011-06-30', '670 Fir St, Riverdale', 'male', '/docs/birth_certificates/Lucas_Young.pdf', '2023-12-05'),
(50, '', 'Danial', 'Wright', '2013-02-12', '101 Poplar Blvd, Metropolis', 'male', NULL, '2023-10-20'),
(53, '', 'Jos', 'Buttler', '2011-04-03', '75/2 , Los Angelis', 'male', NULL, '2024-11-03'),
(54, '', 'Serena', 'Williams', '2013-11-05', 'Washington Dc, America', 'female', NULL, '2024-11-03');

-- --------------------------------------------------------

--
-- Table structure for table `student_courses`
--

CREATE TABLE `student_courses` (
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_courses`
--

INSERT INTO `student_courses` (`student_id`, `course_id`) VALUES
(54, 3),
(54, 7),
(54, 9);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `birthday` date DEFAULT NULL,
  `enrollment_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `first_name`, `last_name`, `address`, `gender`, `birthday`, `enrollment_date`) VALUES
(26, 'Sarah', 'Evans', '102 Pine Lane, Riverwood', 'female', '1985-04-20', '2023-08-15'),
(27, 'Michael', 'Smith', '305 Willow St, Greenville', 'male', '1978-11-28', '2024-09-05'),
(28, 'Linda', 'Roberts', '209 Birch Ave, Maple Town', 'female', '1983-02-14', '2024-01-10'),
(29, 'James', 'Williams', '12 Elm St, Oakridge', 'male', '1981-07-16', '2024-04-22'),
(30, 'Emma', 'Thompson', '404 Cedar Blvd, Brookfield', 'female', '1990-09-06', '2023-12-03'),
(31, 'Ben ', 'Stokes', 'California , America', 'male', '2015-09-30', '2024-11-03');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_courses`
--

CREATE TABLE `teacher_courses` (
  `teacher_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2b$10$nI91TSiV.j6M8.CmI3WtTOYLBR66Qb2fNIlnLiqH5NvrkLFZ6EG1K');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_courses`
--
ALTER TABLE `student_courses`
  ADD PRIMARY KEY (`student_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`);

--
-- Indexes for table `teacher_courses`
--
ALTER TABLE `teacher_courses`
  ADD PRIMARY KEY (`teacher_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `student_courses`
--
ALTER TABLE `student_courses`
  ADD CONSTRAINT `student_courses_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_courses_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE;

--
-- Constraints for table `teacher_courses`
--
ALTER TABLE `teacher_courses`
  ADD CONSTRAINT `teacher_courses_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `teacher_courses_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
