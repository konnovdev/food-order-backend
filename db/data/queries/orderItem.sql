USE `quickOrder`;

DESCRIBE `Order_Item`;

INSERT INTO `Order_Item` VALUES('Order_Item1', 'order001','item001', 'order001_item001');
INSERT INTO `Order_Item` VALUES('Order_Item2', 'order001','item010', 'order001_item010');
INSERT INTO `Order_Item` VALUES('Order_Item3', 'order001','item007', 'order001_item007');
INSERT INTO `Order_Item` VALUES('Order_Item4', 'order002','item002', 'order002_item002');
INSERT INTO `Order_Item` VALUES('Order_Item5', 'order002','item004', 'order002_item004');
INSERT INTO `Order_Item` VALUES('Order_Item6', 'order002','item009', 'order002_item009');
INSERT INTO `Order_Item` VALUES('Order_Item7', 'order002','item008', 'order002_item008');
INSERT INTO `Order_Item` VALUES('Order_Item8', 'order002','item010', 'order002_item010');
INSERT INTO `Order_Item` VALUES('Order_Item9', 'order003','item006', 'order003_item006');

SELECT * FROM `Order_Item`;
