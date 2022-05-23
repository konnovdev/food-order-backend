import { pubsub } from "../resolvers/context.js"
import { orderList } from "../db/db.js"
import { createOrder, queryAllOrder, queryOrderByIdDb } from "../db/utility.js"
import { dbQuery } from "../db/connection.js"
const postOrder = async (req, res)=>{
    let order = req.body
    console.log("received order", order)
    try{
        await createOrder(order)
    }catch(e){
        res.status(500).send("fail", e)
    }
    let itemList = []
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
    // why I cannot write res.status(200).send(await queryAllOrder()) to pass auto test
    res.status(200).send(await queryAllOrder())
    // res.status(200).send("refer to graphql part") 
}
const addToOrderList = (element)=>{
    orderList = [...orderList, element]
}
const getOrderById = async (req, res)=>{
    console.log("getOrderById body", req.body)
    let customerId = req.body.customerId
    // let orderById = await dbQuery(`SELECT * FROM \`Order\` WHERE \`customerId\` = '${customerId}'`)
    res.status(200).send(await queryOrderByIdDb(customerId))
}

export {postOrder, getAllOrder, orderList, addToOrderList, getOrderById}