import {pubsub} from "./context.js"
// ! passing context from Appolo serer constructor is not working
const Subscription = {
    order:{
        subscribe:(parent, {restaurantId}, context, info)=>{
            return pubsub.asyncIterator([`order`]);
        },
    },

}

export default Subscription

// for frontend test gql string
// subscription order{
//     order(id:"order001"){
//       id
//       tableNo
//       items {
//         name
//         quantity
//       }
//     }
//   }