USE `quickOrder`;

DESCRIBE `Item_Comment`;

INSERT INTO `Item_Comment` VALUES('1111', "item001", "2222");
INSERT INTO `Item_Comment` VALUES('2222', "item001", "3333");
INSERT INTO `Item_Comment` VALUES('3333', "item001", "4444");
INSERT INTO `Item_Comment` VALUES('4444', "item002", "5555");

INSERT INTO `Item_Comment` VALUES('9876', "item003", "1234");
INSERT INTO `Item_Comment` VALUES('5678', "item005", "12345");
INSERT INTO `Item_Comment` VALUES('3476', "item006", "123");
INSERT INTO `Item_Comment` VALUES('2226', "item006", "12");

SELECT * FROM `Item_Comment`;