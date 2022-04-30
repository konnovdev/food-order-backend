import { pubsub } from "../resolvers/context.js"
import { orderList } from "../db/db.js"
import {dbQuery} from "../db/connection.js"
import {dbMutation} from "../db/connection.js"


const postOrder = async (req, res)=>{
    let order = req.body
    // todo is there a way to make these query a transaction?
    try{
        await dbMutation(`INSERT INTO \`Order\` VALUES('${order.id}', '${order.tableNo}', ${order.totalPrice}, '${order.time}' )`)
        order.items.forEach(async (item)=>{
            let Order_Item_InfoId = order.id+"_"+item.id
            await dbMutation(`INSERT INTO \`Order_Item_Info\` VALUES('${Order_Item_InfoId}', '${item.quantity}', '${item.note}')`)
    
            let Order_ItemId = "Order_Item" + Math.floor(Math.random()*1000)
            await dbMutation(`INSERT INTO \`Order_Item\` VALUES('${Order_ItemId}', '${order.id}', '${item.id}', '${order.id}_${item.id}')`)
        })
    }catch(e){
        res.status(200).send("fail", e)
    }
    let itemList = []
    order.items.forEach((item)=>{
        itemList = [...itemList, {
            id: item.id,
            name: item.name,
            description:"",
            price: 0,
            img: "sample http",
            orderItemInfo:{
                quantity: item.quantity,
                note: item.note
            }
        }]
    })
    let orderPub = {
        mutation: "CREATED",
        data:{
            id: order.id,
            tableNo: order.tableNo,
            totalPrice: order.totalPrice,
            time: order.time,
            items: itemList
        }
    }
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