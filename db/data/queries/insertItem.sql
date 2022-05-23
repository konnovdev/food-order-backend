USE `quickOrder`;

DESCRIBE `Item`;
INSERT INTO `Item` VALUES('item001','item001.jpeg', 1, "enable");
INSERT INTO `Item` VALUES('item002','item002.jpeg', 1, "enable");
INSERT INTO `Item` VALUES('item003','item003.jpeg', 1, "enable");
INSERT INTO `Item` VALUES('item004','item004.jpeg', 1, "enable");
INSERT INTO `Item` VALUES('item005','item005.jpeg', 1, "enable");
INSERT INTO `Item` VALUES('item006','item006.jpeg', 1, "enable");
INSERT INTO `Item` VALUES('item007','item007.jpeg', 1, "enable");
INSERT INTO `Item` VALUES('item008','item008.jpeg', 1, "enable");
INSERT INTO `Item` VALUES('item009','item009.jpeg', 1, "enable");
INSERT INTO `Item` VALUES('item010','item010.jpeg', 1, "enable");
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

INSERT INTO `Item_Trans` VALUES('11','en', "Omurice", "The omelette rice made with soufflé. Very soft, and indescribably delicious", "Main", "item001");
INSERT INTO `Item_Trans` VALUES('12','en', "Italian noodles", "Good taste with fresh grown tomatoes. Contains pork.", "Main", 'item002');
INSERT INTO `Item_Trans` VALUES('13','en', "Chocolate cake", "Very soft and smooth ca", "Dessert", 'item003');
INSERT INTO `Item_Trans` VALUES('14','en', "Fruit tea", "More ingridients than imagined, colorful multiple frut flavors", "Drink", 'item004');
INSERT INTO `Item_Trans` VALUES('15','en', "Sesame noodles", "The dough is chewy, goes well with the sesame sauce at the bottom of the bowl. No sesame sauce heaviness", "Main", 'item005');
INSERT INTO `Item_Trans` VALUES('16','en', "Pizza", "Freshly baked pizza with a thick layer of cheese", "Main", 'item006');
INSERT INTO `Item_Trans` VALUES('17','en', "Puffs", "Looks like a large circle of smooth cream and jelly surrounding the puff. When you touch it with a spoon, you will find that it is actually crisp Marin sugar, and the mint jelly has a cool and sweet taste.", "Dessert", 'item007');
INSERT INTO `Item_Trans` VALUES('18','en', "Onion rings", "Onion rings are not hot, but have a light fragrance. Every time I eat them, I feel a light salty and onion flavor. The two flavors are mixed together. With some seasonings and carbohydrates, the taste is indescribable.", "Dessert", 'item008');
INSERT INTO `Item_Trans` VALUES('19','en', "Fries", "Crispy on the outside and soft on the inside, it''s a perfect match with mustard sauce", "Dessert", 'item009');
INSERT INTO `Item_Trans` VALUES('20','en', "Pearl Fresh Milk Tea", "Very chewy pearls with sweet taste and beautiful color", "Beverage", 'item010');

select * from `Item_Trans`;

