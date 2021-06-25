-- MySQL Script generated by MySQL Workbench
-- lun. 21 juin 2021 13:54:28
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Embarquement
-- -----------------------------------------------------

DROP TABLE user;
DROP TABLE articles;
DROP TABLE comments;
DROP TABLE message;
-- -----------------------------------------------------
-- Schema Embarquement
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Embarquement` ;
USE `Embarquement` ;

-- -----------------------------------------------------
-- Table `Embarquement`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Embarquement`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(100) NOT NULL,
  `isAdmin` TINYINT NOT NULL DEFAULT 0,
  `isVerified` TINYINT NOT NULL DEFAULT 0,
  `isBann` TINYINT NOT NULL DEFAULT 0,
  `avatar` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
  -- UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  -- UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Embarquement`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Embarquement`.`articles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` DATE NOT NULL,
  `author_id` INT NOT NULL,
  `edited_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_articles_user1_idx` (`author_id` ASC) VISIBLE,
  CONSTRAINT `fk_articles_user1`
    FOREIGN KEY (`author_id`)
    REFERENCES `Embarquement`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Embarquement`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Embarquement`.`comments` (
  `content` VARCHAR(255) NOT NULL,
  `creation_date` DATE NOT NULL,
  `author_id` INT NOT NULL,
  `ref_id` INT NOT NULL,
  -- INDEX `fk_comments_articles1_idx` (`ref_id` ASC) VISIBLE,
  INDEX `fk_comments_user1_idx` (`author_id` ASC) VISIBLE,
  -- CONSTRAINT `fk_comments_articles1`
  --   FOREIGN KEY (`ref_id`)
  --   REFERENCES `Embarquement`.`articles` (`id`)
  --   ON DELETE NO ACTION
  --   ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_user1`
    FOREIGN KEY (`author_id`)
    REFERENCES `Embarquement`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Embarquement`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Embarquement`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `author_id` INT NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `isRead` TINYINT NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_message_user1_idx` (`author_id` ASC) VISIBLE,
  CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`author_id`)
    REFERENCES `Embarquement`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
