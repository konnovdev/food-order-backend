import {pubsub} from "./context.js"
import { orderList, addToOrderList } from "../controllers/order.js"
// ! passing context from Appolo server constructor is not working
const Mutation = {
    createOrder(parent, {order}, {}, info){
        let tmp = JSON.parse(JSON.stringify(order))
        addToOrderList(tmp) // fix [Object: null prototype] bug
        console.log("received new order", order)
        pubsub.publish('order', {order:
            orderList
        })
        return "success"
    },
    broadcastRandomNumber: (parent, {order}, {db, pubSub}, info) => {
        // publish a random number
        pubsub.publish('randomNumber', 1.4)
        return 1.2
      },
}

export default Mutation

// for frontend test gql string
// mutation createOrder{
//     createOrder(order:{id:"orderId", tableNo:"tableNo", items:[{name:"itemName", quantity:4}]})
//   }