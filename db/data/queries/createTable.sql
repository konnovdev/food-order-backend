
ALTER DATABASE `quickOrder` COLLATE = `utf8mb4_unicode_ci`;
USE `quickOrder`;
CREATE TABLE `Item` (
    `id` VARCHAR(50) NOT NULL PRIMARY KEY,
    `img` VARCHAR(150),
    `price` int,
    `status` VARCHAR(50)
    
);
CREATE TABLE `Item_Trans`(
	`id` VARCHAR(50) NOT NULL PRIMARY KEY,
    
    `lang`  VARCHAR(5) NOT NULL ,
    `name` VARCHAR(50)NOT NULL ,
    `description` VARCHAR(400),
    `type` VARCHAR(20),
    `itemId` VARCHAR(50)
);
CREATE TABLE `Order`(
	`id` VARCHAR(50) NOT NULL PRIMARY KEY,
    `tableNo` VARCHAR(20) NOT NULL ,
    `totalPrice` INT,
    `time` VARCHAR(50),
    `customerId` VARCHAR(50),
    `customerName` VARCHAR(50),
    `isTakeOut` VARCHAR(10),
    `arrivedTime` VARCHAR(50),
    `herePeople` INT
    
    
);
CREATE TABLE `Order_Item`(
	`id` VARCHAR(50) NOT NULL PRIMARY KEY,
    `orderId` VARCHAR(50),
    `itemId` VARCHAR(50),
    `orderItemInfoId` VARCHAR(50)
);

CREATE TABLE `Order_Item_Info`(
	`id` VARCHAR(50) NOT NULL PRIMARY KEY,
    `orderId` VARCHAR(50),
    `itemId` VARCHAR(50),
    `quantity` INT,
    `note` VARCHAR(120),
    `state` VARCHAR(10)
);

CREATE TABLE `Comment`(
	`id` VARCHAR(50) NOT NULL PRIMARY KEY,
    `name` VARCHAR(50),
    `content`  VARCHAR(300),
    `time` VARCHAR(50),
    `rate` Int,
    `imgUrl` VARCHAR(100)
);
CREATE TABLE `Item_Comment`(
	`id` VARCHAR(50) NOT NULL PRIMARY KEY,
	`itemId` VARCHAR(50),
    `commentId` VARCHAR(50)
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

ALTER TABLE `Order_Item_Info`
ADD FOREIGN KEY (`orderId`)
REFERENCES `Order`(`id`)
ON DELETE SET NULL;

ALTER TABLE `Order_Item_Info`
ADD FOREIGN KEY (`itemId`)
REFERENCES `Item`(`id`)
ON DELETE SET NULL;

show tables;
