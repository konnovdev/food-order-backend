import { pubsub } from "../resolvers/context.js"
import { orderList } from "../db/db.js"
import {dbQuery} from "../db/connection.js"


const postOrder = (req, res)=>{
    console.log("postOrder got ", req.body)
    orderList = [...orderList, req.body]
    pubsub.publish('order', {order:
        orderList
    })
    res.status(200).send("success")
}
const getAllOrder = async (req, res)=>{
    let queryString = `SELECT * FROM \`Order\``
    let orderResult = await dbQuery(queryString)
    let orderItemResult = await dbQuery('SELECT * FROM `Order_Item`')
    let itemResult = await dbQuery('SELECT * FROM `Item`')
    let itemTransResult = await dbQuery('SELECT * FROM `Item_Trans`')
    orderItemResult.forEach(e => {
        // TODO LOGIC PART
    })
    
    res.status(200).send({orderResult, orderItemResult, itemResult, itemTransResult})

}
const addToOrderList = (element)=>{
    orderList = [...orderList, element]
}

export {postOrder, getAllOrder, orderList, addToOrderList}