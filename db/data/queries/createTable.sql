ALTER DATABASE `quickOrder` COLLATE = `utf8_general_ci`;
USE `quickOrder`;
CREATE TABLE `Item` (
    `id` VARCHAR(20) NOT NULL PRIMARY KEY,
    `img` VARCHAR(150),
    `price` int
    
);
CREATE TABLE `Item_Trans`(
	`id` VARCHAR(20) NOT NULL PRIMARY KEY, 
    `lang`  VARCHAR(5) NOT NULL ,
    `name` VARCHAR(40)NOT NULL ,
    `description` VARCHAR(400),
    `type` VARCHAR(20),
    `itemId` VARCHAR(20)
);
CREATE TABLE `Order`(
	`id` VARCHAR(20) NOT NULL PRIMARY KEY,
    `tableNo` VARCHAR(20) NOT NULL ,
    `totalPrice` INT,
    `time` VARCHAR(50)
);
CREATE TABLE `Order_Item`(
	`id` VARCHAR(20) NOT NULL PRIMARY KEY,
    `orderId` VARCHAR(20),
    `itemId` VARCHAR(20),
    `orderItemInfoId` VARCHAR(20)
);

CREATE TABLE `Order_Item_Info`(
	`id` VARCHAR(20) NOT NULL PRIMARY KEY,
    `quantity` INT,
    `Note` VARCHAR(100)
);

CREATE TABLE `Comment`(
	`id` VARCHAR(20) NOT NULL PRIMARY KEY,
    `name` VARCHAR(30),
    `content`  VARCHAR(200),
    `time` VARCHAR(50)
);
CREATE TABLE `Item_Comment`(
	`id` VARCHAR(20) NOT NULL PRIMARY KEY,
	`itemId` VARCHAR(20),
    `commentId` VARCHAR(20)
);


show tables;

ALTER TABLE `Item_Trans`
ADD FOREIGN KEY (`itemId`)
REFERENCES `Item`(`id`)
ON DELETE SET NULL;

ALTER TABLE `Order_Item`
ADD FOREIGN KEY (`orderId`)
REFERENCES `Order`(`id`)
ON DELETE SET NULL;

ALTER TABLE `Order_Item`
ADD FOREIGN KEY (`itemId`)
REFERENCES `Item`(`id`)
ON DELETE SET NULL;

ALTER TABLE `Order_Item`
ADD FOREIGN KEY (`orderItemInfoId`)
REFERENCES `Order_Item_Info`(`id`)
ON DELETE SET NULL;

ALTER TABLE `Item_Comment`
ADD FOREIGN KEY (`itemId`)
REFERENCES `Item`(`id`)
ON DELETE SET NULL;

ALTER TABLE `Item_Comment`
ADD FOREIGN KEY (`commentId`)
REFERENCES `Comment`(`id`)
ON DELETE SET NULL;

show tables;


