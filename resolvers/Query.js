import {getOrderById, prepareItem, preapreOrderItem, prepareOrderIdList, prepareOrderList}  from "./utility.js"
import {dbQuery} from "../db/connection.js"
import {queryAllItem, queryAllOrder} from "../db/utility.js"
const Query = {
    queryTest(parent, {}, {}, info){
        console.log("queryTest")
        return "TEST"
    },


    async items(parent, {}, {db}, info){
        let result = await queryAllItem()
        console.log("result", result)
        return result
    },
    async todayOrders(parent, {}, {db}, info){
        console.log("todayOrders")
        let orderList = await queryAllOrder()
        return orderList
    },
}

export default Query;