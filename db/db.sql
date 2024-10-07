CREATE DATABASE IF NOT EXISTS db_semi1_proyecto;
USE db_semi1_proyecto;
CREATE TABLE `schedules`(
    `id_schedul` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `datetime_start` DATETIME NOT NULL,
    `datetime_end` DATETIME NOT NULL,
    `id_user` INT NOT NULL,
    `id_course` INT NOT NULL
);
CREATE TABLE `tasks`(
    `id_task` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    `hour` DATETIME NOT NULL,
    `id_course` INT NOT NULL
);
CREATE TABLE `users`(
    `id_user` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL
);
CREATE TABLE `upload_task`(
    `id_upload` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `file` VARCHAR(255) NOT NULL,
    `state` INT NOT NULL,
    `date` DATETIME NOT NULL,
    `id_user` INT NOT NULL,
    `id_task` INT NOT NULL
);
CREATE TABLE `reminders`(
    `id_reminder` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    `hour` DATETIME NOT NULL,
    `id_user` INT NOT NULL
);
CREATE TABLE `courses`(
    `id_course` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `credits` INT NOT NULL,
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME NOT NULL
);
CREATE TABLE `notifications`(
    `id_notification` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `message` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `datetime_notification` DATETIME NOT NULL,
    `id_user` INT NOT NULL
);
ALTER TABLE
    `notifications` ADD CONSTRAINT `notifications_id_user_foreign` FOREIGN KEY(`id_user`) REFERENCES `users`(`id_user`);
ALTER TABLE
    `tasks` ADD CONSTRAINT `tasks_id_course_foreign` FOREIGN KEY(`id_course`) REFERENCES `courses`(`id_course`);
ALTER TABLE
    `schedules` ADD CONSTRAINT `schedules_id_course_foreign` FOREIGN KEY(`id_course`) REFERENCES `courses`(`id_course`);
ALTER TABLE
    `upload_task` ADD CONSTRAINT `upload_task_id_user_foreign` FOREIGN KEY(`id_user`) REFERENCES `users`(`id_user`);
ALTER TABLE
    `reminders` ADD CONSTRAINT `reminders_id_user_foreign` FOREIGN KEY(`id_user`) REFERENCES `users`(`id_user`);
ALTER TABLE
    `upload_task` ADD CONSTRAINT `upload_task_id_task_foreign` FOREIGN KEY(`id_task`) REFERENCES `tasks`(`id_task`);
ALTER TABLE
    `schedules` ADD CONSTRAINT `schedules_id_user_foreign` FOREIGN KEY(`id_user`) REFERENCES `users`(`id_user`);