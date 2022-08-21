-- Creo la base de datos lumen
CREATE DATABASE lumen_db;
USE lumen_db;

-- Creo las tablas
CREATE TABLE `Users`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `admin` INT NOT NULL,
    `email` VARCHAR(45) NOT NULL UNIQUE,
    `password` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `img` VARCHAR(45) NOT NULL,
    `created_at` DATE,
    `updated_at` DATE,
    `state` INT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Products`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL UNIQUE,
    `description` VARCHAR(500) NOT NULL,
    `category` VARCHAR(45) NOT NULL,
    `color` VARCHAR(45) NOT NULL,
    `price` INT NOT NULL,
    `discount` INT,
    `created_at` DATE,
    `updated_at` DATE,
    `stock` INT NOT NULL,
    `state` INT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Carts`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `total` INT NOT NULL,
    `cant_product` INT NOT NULL,
    `product_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`),
    FOREIGN KEY(`user_id`) REFERENCES `Users`(`id`)
);

CREATE TABLE `Images`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(45) NOT NULL,
    `product_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`)
);