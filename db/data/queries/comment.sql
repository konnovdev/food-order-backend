USE `quickOrder`;

DESCRIBE `Comment`;

INSERT INTO `Comment` VALUES('1234', "", "good to eat", "2022-04-11T14:01:18");
INSERT INTO `Comment` VALUES('12345', "fat man", "awesome food", "2022-04-11T14:01:18");
INSERT INTO `Comment` VALUES('123', "evil spirit", "DO NOT order this", "2022-04-11T14:01:18");
INSERT INTO `Comment` VALUES('12', "", "order this please", "2022-04-11T14:01:18");

SELECT * FROM `Comment`;