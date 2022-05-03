USE `quickOrder`;

DESCRIBE `Comment`;

INSERT INTO `Comment` VALUES('2222', "--anonymous", "好吃", "2022-04-11T14:01:18", 4);
INSERT INTO `Comment` VALUES('3333', "fathoward_chiman", "裡面有蟑螂指甲....", "2022-04-11T14:02:18", 1);
INSERT INTO `Comment` VALUES('4444', "evan123", "好吃，有姊姊的味道", "2022-04-11T14:03:18", 5);
INSERT INTO `Comment` VALUES('5555', "--anonymous", "讚", "2022-04-11T14:01:18", 4);

INSERT INTO `Comment` VALUES('1234', "--anonymous", "hi, I'm Yi Long Ma", "2022-04-11T14:01:18", 5);
INSERT INTO `Comment` VALUES('12345', "fat man", "awesome food", "2022-04-11T14:01:18", 4);
INSERT INTO `Comment` VALUES('123', "evil_spirit", "DO NOT order this", "2022-04-11T14:01:18", 1);
INSERT INTO `Comment` VALUES('12', "funny_boy", "order this please", "2022-04-11T14:01:18", 5);



SELECT * FROM `Comment`;