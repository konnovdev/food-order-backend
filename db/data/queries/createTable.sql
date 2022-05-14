ALTER DATABASE `quickOrder` COLLATE = `utf8mb4_unicode_ci`;
USE `quickOrder`;
CREATE TABLE `Item` (
    `id` VARCHAR(20) NOT NULL PRIMARY KEY,
    `img` VARCHAR(100),
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
    `Note` VARCHAR(50)
);

CREATE TABLE `Comment`(
	`id` VARCHAR(20) NOT NULL PRIMARY KEY,
    `name` VARCHAR(20),
    `content`  VARCHAR(100),
    `time` VARCHAR(50),
    `rate` Int
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


