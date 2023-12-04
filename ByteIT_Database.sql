CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `fullname` varchar(255),
  `email` varchar(255),
  `username` varchar(255),
  `password` varchar(255),
  `picture_url` varchar(255),
  `subscription` enum('no_subscription', 'basic', 'premium'),
  `level` enum('introduction', 'beginner', 'intermediate', 'advanced')
);

CREATE TABLE `courses` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `level` enum('introduction', 'beginner', 'intermediate', 'advanced'),
  `picture_url` varchar(255)
);

CREATE TABLE `test` (
  `id` integer PRIMARY KEY,
  `course_id` integer,
  `problem_id` integer
);

CREATE TABLE `user_test` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `test_id` integer,
  `grade` integer
);

CREATE TABLE `problem` (
  `id` integer PRIMARY KEY
);

CREATE TABLE `leaderboard` (
  `id` integer PRIMARY KEY
);

ALTER TABLE `user_test` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_test` ADD FOREIGN KEY (`test_id`) REFERENCES `test` (`id`);

ALTER TABLE `courses` ADD FOREIGN KEY (`id`) REFERENCES `test` (`course_id`);

ALTER TABLE `problem` ADD FOREIGN KEY (`id`) REFERENCES `test` (`problem_id`);
