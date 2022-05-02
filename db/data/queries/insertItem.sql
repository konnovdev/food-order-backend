USE `quickOrder`;

DESCRIBE `Item`;
INSERT INTO `Item` VALUES('item001','', 1);
INSERT INTO `Item` VALUES('item002','', 1);
INSERT INTO `Item` VALUES('item003','', 1);
INSERT INTO `Item` VALUES('item004','', 1);
INSERT INTO `Item` VALUES('item005','', 1);
INSERT INTO `Item` VALUES('item006','', 1);
INSERT INTO `Item` VALUES('item007','', 1);
INSERT INTO `Item` VALUES('item008','', 1);
INSERT INTO `Item` VALUES('item009','', 1);
INSERT INTO `Item` VALUES('item010','', 1);
select * from `Item`;


DESCRIBE `Item_Trans`;
INSERT INTO `Item_Trans` VALUES('1','zh', "蛋包飯", "蛋奶酥製作的蛋包飯特別鬆軟，入口即化的那一瞬間美味的無法形容", "主食", "item001");
INSERT INTO `Item_Trans` VALUES('2','zh', "義大利麵", "把義大利麵卷在筷子上，就變成一個面卷，一口吃下去，面裡流出少許的汁水。在義大利麵上能變出的戲法，可不比大衛魔術遜色", "主食", 'item002');
INSERT INTO `Item_Trans` VALUES('3','zh', "巧克力蛋糕", "蛋糕口感特别柔软，绵滑，搭配上淡淡的草莓味道，吃在嘴里有一種幸福的味道", "甜點", 'item003');
INSERT INTO `Item_Trans` VALUES('4','zh', "水果茶", "用料多到超出想像，茶水在多重果味的席捲下繽紛多彩，果肉跳躍舌尖，喝起來完全不會無聊", "飲料", 'item004');
INSERT INTO `Item_Trans` VALUES('5','zh', "麻醬麵", "麵體兼具嚼勁和彈性，和碗底的麻醬搭配得絲絲入扣；而醬料則為精華所在，在麻醬和乾拌醬之間十分巧妙地取得平衡，有麻醬的香氣和味道，卻沒有麻醬的厚重感", "主食", 'item005');
INSERT INTO `Item_Trans` VALUES('6','zh', "披薩", "熱氣騰騰剛出爐的那種烘烤到剛剛好的外皮，一層厚厚的起司，可以拉出好多絲", "主食", 'item006');
INSERT INTO `Item_Trans` VALUES('7','zh', "泡芙", "看似一大圈的柔滑奶油和果凍圍繞著泡芙，湯匙輕觸時即會發現，其實是清脆的馬林糖，薄荷果凍帶涼的甜口感滑嫩", "甜點", 'item007');
INSERT INTO `Item_Trans` VALUES('8','zh', "洋蔥圈", "洋蔥圈並不是火辣辣的，而是淡淡的香味，每次吃都感覺一股淡淡的鹹味和洋蔥味，兩種味道夾雜在一起，加上一些些作料和碳水化合物，那味道簡直無法形容", "點心", 'item008');
INSERT INTO `Item_Trans` VALUES('9','zh', "薯條", "外表香脆，內在酥軟，搭配芥末醬真的是絕配", "點心", 'item009');
INSERT INTO `Item_Trans` VALUES('10','zh', "珍珠鮮奶茶", "珍珠飽滿有彈性、嚼勁，唇齒留香，奶茶味道香甜，顏色好看", "飲料", 'item010');
select * from `Item_Trans`;

