import {restaurants} from "../controllers/restaurants.js"
import {orderList} from "../controllers/order.js"
import {getOrderById} from "./utility.js"
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
    }
}

export default Query;