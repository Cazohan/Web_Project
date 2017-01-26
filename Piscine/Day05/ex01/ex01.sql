CREATE TABLE `db_lherbelo`.`ft_table` ( `id` INT NOT NULL AUTO_INCREMENT , 
	`login` VARCHAR(8) NOT NULL DEFAULT 'toto' , 
	`groupe` ENUM('staff','student','other') NOT NULL , 
	`date_de_creation` DATE NOT NULL , PRIMARY KEY (`id`)) 
	ENGINE = InnoDB;