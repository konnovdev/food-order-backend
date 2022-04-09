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
    queryOrder(parent, {}, {db}, info){
        let order = getOrderById("order002", orderList)
        return order
    }
}

export default Query;