USE `quickOrder`;

DESCRIBE `Comment`;

INSERT INTO `Comment` VALUES('2222', "--anonymous", "好吃", "2022-04-11T14:01:18", 4, "");
INSERT INTO `Comment` VALUES('3333', "fathoward_chiman", "裡面有蟑螂指甲....", "2022-04-11T14:02:18", 1, "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI");
INSERT INTO `Comment` VALUES('4444', "evan123", "好吃，有姊姊的味道", "2022-04-11T14:03:18", 5, "https://i.picsum.photos/id/887/200/300.jpg?hmac=jzro4NZWOPJxqU5bUBoxrD7f4jPtFNB4VmKpn7H5sYI");
INSERT INTO `Comment` VALUES('5555', "--anonymous", "讚", "2022-04-11T14:01:18", 4, "https://i.picsum.photos/id/256/200/300.jpg?hmac=6-SQmUqIECHQ4QadM7mAYY3sHPH5r_8e2pCBs7V67Sc");

INSERT INTO `Comment` VALUES('1234', "--anonymous", "hi, I'm Yi Long Ma", "2022-04-11T14:01:18", 5, "");
INSERT INTO `Comment` VALUES('12345', "fat man", "awesome food", "2022-04-11T14:01:18", 4, "https://i.picsum.photos/id/797/200/300.jpg?hmac=9JRjR3IU9I3ol6cF0HvudMsYauIgNcElExNSrGOlwGM");
INSERT INTO `Comment` VALUES('123', "evil_spirit", "DO NOT order this", "2022-04-11T14:01:18", 1, "https://i.picsum.photos/id/770/200/300.jpg?hmac=HBQpna8VW4X1Rl2MaV0_h4m-2AJ56a0FuiLAhe_JCW8");
INSERT INTO `Comment` VALUES('12', "funny_boy", "order this please", "2022-04-11T14:01:18", 5, "https://i.picsum.photos/id/1078/200/300.jpg?hmac=cIIdxycLQ-pOopDajDdPoOPwl9nnMld2aG58k8IgyX4");



SELECT * FROM `Comment`;