// frontend staffs give us only one menu example, I assign it to menuResTwo. 

let menuResOne = [
    {
        "id": "item001",
        "name": "beef steak",
        "price": 80,
        "img": "https://c8.alamy.com/comp/CY92WM/beef-steak-on-a-wooden-table-CY92WM.jpg",
        "description": "medium cooked fresh meat",
        "type": "主食",
        "tags": [
            "肉"
        ],
        "rates_ave": 4.3
    },
    {
        "id": "item002",
        "name": "salad",
        "price": 100,
        "img": "https://www.acouplecooks.com/wp-content/uploads/2019/05/Chopped-Salad-001_1.jpg",
        "description": "salad with fresh veggies and fruits",
        "type": "飲料",
        "tags": [
            "蔬菜"
        ],
        "rates_ave": 4.2
    },
    {
        "id": "item003",
        "name": "milk",
        "price": 50,
        "img": "https://reurl.cc/mGE48Y",
        "description": "one litre of milk in a bottle",
        "type": "甜點",
        "tags": [
            "無糖",
        ],
        "rates_ave": 5.0
    }
]

let menuResTwo = [
    {
        "id": "item001",
        "name": "蛋包飯",
        "price": 80,
        "img": "https://reurl.cc/g0KpA4",
        "description": "蛋奶酥製作的蛋包飯特別鬆軟，入口即化的那一瞬間美味的無法形容",
        "type": "主食",
        "tags": [
            "蛋素"
        ],
        "rates_ave": 4.5
    },
    {
        "id": "item002",
        "name": "義大利麵",
        "price": 100,
        "img": "https://reurl.cc/44Zv9V",
        "description": "把義大利麵卷在筷子上，就變成一個面卷，一口吃下去，面裡流出少許的汁水。在義大利麵上能變出的戲法，可不比大衛魔術遜色。",
        "type": "主食",
        "tags": [
            "含有甲殼類"
        ],
        "rates_ave": 4.1
    },
    {
        "id": "item003",
        "name": "巧克力蛋糕",
        "price": 50,
        "img": "https://reurl.cc/mGE48Y",
        "description": "蛋糕口感特别柔软，绵滑，搭配上淡淡的草莓味道，吃在嘴里有一種幸福的味道。",
        "type": "甜點",
        "tags": [
            "含酒",
            "蛋奶素"
        ],
        "rates_ave": 4.9
    },
    {
        "id": "item004",
        "name": "水果茶",
        "price": 90,
        "img": "https://reurl.cc/3jvpvX",
        "description": "用料多到超出想像，茶水在多重果味的席捲下繽紛多彩，果肉跳躍舌尖，喝起來完全不會無聊。",
        "type": "飲料",
        "tags": null,
        "rates_ave": 3.9
    },
    {
        "id": "item005",
        "name": "麻醬麵",
        "price": 40,
        "img": "https://reurl.cc/8WdL14",
        "description": "麵體兼具嚼勁和彈性，和碗底的麻醬搭配得絲絲入扣；而醬料則為精華所在，在麻醬和乾拌醬之間十分巧妙地取得平衡，有麻醬的香氣和味道，卻沒有麻醬的厚重感，讓人吃的時候順口吃完時候舒暢，大口啖食是好吃而簡單明快，細細品嚐則是極致的均衡和協調",
        "type": "主食",
        "tags": [
            "含花生"
        ],
        "rates_ave": 4.2
    },
    {
        "id": "item006",
        "name": "披薩",
        "price": 120,
        "img": "https://reurl.cc/yQzG1D",
        "description": "熱氣騰騰剛出爐的那種烘烤到剛剛好的外皮，一層厚厚的起司，可以拉出好多絲\n",
        "type": "主食",
        "tags": null,
        "rates_ave": 4.3
    },
    {
        "id": "item007",
        "name": "泡芙",
        "price": 25,
        "img": "https://reurl.cc/QjzxdZ",
        "description": "看似一大圈的柔滑奶油和果凍圍繞著泡芙，湯匙輕觸時即會發現，其實是清脆的馬林糖，薄荷果凍帶涼的甜口感滑嫩",
        "type": "甜點",
        "tags": null,
        "rates_ave": 4.5
    },
    {
        "id": "item008",
        "name": "洋蔥圈",
        "price": 45,
        "img": "https://reurl.cc/EpEe2R",
        "description": "洋蔥圈並不是火辣辣的，而是淡淡的香味，每次吃都感覺一股淡淡的鹹味和洋蔥味，兩種味道夾雜在一起，加上一些些作料和碳水化合物，那味道簡直無法形容",
        "type": "點心",
        "tags": [
            "五辛素"
        ],
        "rates_ave": 4.8
    },
    {
        "id": "item009",
        "name": "薯條",
        "price": 40,
        "img": "https://reurl.cc/mGEAG9",
        "description": "外表香脆，內在酥軟，搭配芥末醬真的是絕配",
        "type": "點心",
        "tags": null,
        "rates_ave": 4.6
    },
    {
        "id": "item010",
        "name": "珍珠鮮奶茶",
        "price": 60,
        "img": "https://reurl.cc/EpEeRK",
        "description": "珍珠飽滿有彈性、嚼勁，唇齒留香，奶茶味道香甜，顏色好看",
        "type": "飲料",
        "tags": null,
        "rates_ave": 4.6
    }
]


function getById(id) {
    if (id === '1') {
        return menuResOne
    }
    else if (id === '2') {
        return menuResTwo
    }
    else {
        return null
    }
}

const get = (req, res) => {
    res.status(200).json(getById(req.params.id))
}

export {get}