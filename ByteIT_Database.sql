CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `fullname` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `picture_url` varchar(255),
  `subscription` enum('no_subscription', 'basic', 'premium'),
  `level` enum('introduction', 'beginner', 'intermediate', 'advanced'),
  `exercises_solved` integer
);

CREATE TABLE `courses` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `description` varchar(255),
  `level` enum('introduction', 'beginner', 'intermediate', 'advanced')
);


CREATE TABLE `exercises` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` varchar(255),
  `solution` varchar(255)
);

