import { pubsub } from "../resolvers/context.js"
import { orderList } from "../db/db.js"
import {dbQuery} from "../db/connection.js"
import {dbMutation} from "../db/connection.js"
import { createOrder, queryAllOrder } from "../db/utility.js"

const postOrder = async (req, res)=>{
    let order = req.body
    console.log("received order", order)
    try{
        await createOrder(order)
    }catch(e){
        res.status(500).send("fail", e)
    }
    let itemList = []
    // order.items.forEach((item)=>{
    //     itemList = [...itemList, {
    //         id: item.id,
    //         name: item.name,
    //         description:"",
    //         price: 0,
    //         img: "sample http",
    //         orderItemInfo:{
    //             quantity: item.quantity,
    //             note: item.note
    //         }
    //     }]
    // })
    let orderPub = await queryAllOrder()
    console.log("orderPub", orderPub)
    // await dbMutation(`INSERT INTO \`Order_Item_Info\` VALUES('${order.id}', '${order.tableNo}', ${order.totalPrice}, '${order.time}' )`)
    pubsub.publish('order', {
        order: orderPub
        
    })
    res.status(200).send("success")
}
const getAllOrder = async (req, res)=>{   
    // refer to graphql part
    res.status(200).send("refer to graphql part")
}
const addToOrderList = (element)=>{
    orderList = [...orderList, element]
}

export {postOrder, getAllOrder, orderList, addToOrderList}