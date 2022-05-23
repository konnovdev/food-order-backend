USE `quickOrder`;
DESCRIBE `Order`;

INSERT INTO `Order` VALUES('order001','15A', 165, "2022-04-11T12:20:05", "customerId", "customerName", "false", "2022-04-11T12:20:05", 2);
INSERT INTO `Order` VALUES('order002','12D', 765, "2022-04-11T13:15:12", "customerId", "customerName", "false", "2022-04-11T12:20:05", 3);
INSERT INTO `Order` VALUES('order003','3', 120, "2022-04-11T14:01:18", "customerId", "customerName", "false", "2022-04-11T12:20:05", 1);


SELECT * FROM `Order`; 