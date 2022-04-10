import {pubsub} from "../resolvers/context.js"

let orderList = [
    {
        "id": "order001",
        "tableNo": "15A",
        "totalPrice": 165,
        "time": "2022/04/04-12:20:05",
        "items": [
            {
                "id": "item001",
                "name": "蛋包飯",
                "price": 80,
                "quantity": 1,
                "note": "飯不要太多",
                "status": "RAW"
            },
            {
                "id": "item010",
                "name": "珍珠鮮奶茶",
                "price": 60,
                "quantity": 1,
                "note": null,
                "status": "RAW"
            },
            {
                "id": "item007",
                "name": "泡芙",
                "price": 25,
                "quantity": 1,
                "note": null,
                "status": "RAW"
            }
        ]
    },
    {
        "id": "order002",
        "tableNo": "12D",
        "totalPrice": 765,
        "time": "2022/04/04-13:15:12",
        "items": [
            {
                "id": "item002",
                "name": "義大利麵",
                "price": 100,
                "quantity": 4,
                "note": "兩個青醬兩個紅醬",
                "status": "RAW"
            },
            {
                "id": "item004",
                "name": "水果茶",
                "price": 90,
                "quantity": 2,
                "note": null,
                "status": "RAW"
            },
            {
                "id": "item009",
                "name": "薯條",
                "price": 40,
                "quantity": 2,
                "note": "要番茄醬",
                "status": "RAW"
            },
            {
                "id": "item008",
                "name": "洋蔥圈",
                "price": 45,
                "quantity": 1,
                "note": null,
                "status": "RAW"
            },
            {
                "id": "item010",
                "name": "珍珠鮮奶茶",
                "price": 60,
                "quantity": 1,
                "note": null,
                "status": "RAW"
            }
        ]
    },
    {
        "id": "order003",
        "tableNo": 3,
        "totalPrice": 120,
        "time": "2022/04/04-14:01:18",
        "items": [
            {
                "id": "item006",
                "name": "披薩",
                "price": 120,
                "quantity": 1,
                "note": null,
                "status": "RAW"
            }
        ]
    }
]

const postOrder = (req, res)=>{
    console.log("postOrder got ", req.body)
    orderList = [...orderList, req.body]
    pubsub.publish('order', {order:
        orderList
    })
    res.status(200)
}
const getAllOrder = (req, res)=>{
    res.status(200).send(orderList)
}
const addToOrderList = (element)=>{
    orderList = [...orderList, element]
}

export {postOrder, getAllOrder, orderList, addToOrderList}