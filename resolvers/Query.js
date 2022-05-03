import {restaurants} from "../controllers/restaurants.js"
import {orderList} from "../controllers/order.js"
import {getOrderById, prepareItem, preapreOrderItem, prepareOrderIdList, prepareOrderList}  from "./utility.js"
import {dbQuery} from "../db/connection.js"
import {queryAllItem} from "../db/utility.js"
const Query = {
    queryTest(parent, {}, {}, info){
        console.log("queryTest")
        return "TEST"
    },
    queryRestaurants(parent, {}, { db }, info){
        return restaurants
    },
    queryOrder(parent, {orderId}, {db}, info){
        let order = getOrderById(orderId, orderList)
        console.log(order)
        return order
    },
    queryOrders(parent, {}, {db}, info){
        return orderList
    },
    async items(parent, {}, {db}, info){
        let result = await queryAllItem()
        console.log("result", result)
        return result
    },
    async todayOrders(parent, {}, {db}, info){
        let orderResult = await dbQuery('SELECT * FROM `Order`')
        let orderItemResult = await dbQuery('SELECT `orderId`, `itemId`, `orderItemInfoId` FROM `Order_Item`')
        let orderItemInfoResult = await dbQuery('SELECT * FROM `Order_Item_Info`')
        let itemTransResult = await dbQuery('SELECT * FROM `Item_Trans` WHERE `lang`=\'zh\'')
        let itemResult = await dbQuery('SELECT * FROM `Item`')
        // to create a list of all orderId
        let orderIdList = prepareOrderIdList(orderItemResult)
        // prepare orderItemObj: itemId as a key
        let itemObj = prepareItem(itemTransResult, itemResult)
        // prepare orderItemObj: order.id as a key, content of order as a value
        let orderItemObj = preapreOrderItem(orderIdList, orderItemInfoResult, itemObj)
        // prepare orderList by combine orderItemObj and orderResult
        let orderList = prepareOrderList(orderIdList, orderResult, orderItemObj)
       
        return orderList
    },
}

export default Query;