USE `quickOrder`;
DESCRIBE Order_Item_Info;

INSERT INTO `Order_Item_Info` VALUES('order001_item001', 'order001', 'item001' , 1, "飯不要太多", 'unready');
INSERT INTO `Order_Item_Info` VALUES('order001_item010', 'order001', 'item010',  1, "", 'unready');
INSERT INTO `Order_Item_Info` VALUES('order001_item007', 'order001', 'item007',  1, "", 'unready');
INSERT INTO `Order_Item_Info` VALUES('order002_item002', 'order002' ,'item002',  4, "兩個青醬兩個紅醬", 'unready');
INSERT INTO `Order_Item_Info` VALUES('order002_item004', 'order002' ,'item004',  2, "", 'ready');
INSERT INTO `Order_Item_Info` VALUES('order002_item009', 'order002', 'item009', 2, "要番茄醬", 'preparing') ;
INSERT INTO `Order_Item_Info` VALUES('order002_item008', 'order002', 'item008', 1, "", 'preparing');
INSERT INTO `Order_Item_Info` VALUES('order002_item010', 'order002', 'item010', 1, "", 'ready');
INSERT INTO `Order_Item_Info` VALUES('order003_item006', 'order003', 'item006', 1, "", 'ready');

SELECT * FROM `Order_Item_Info`;

