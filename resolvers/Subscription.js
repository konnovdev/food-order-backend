import {pubsub} from "./context.js"
// ! passing context from Appolo serer constructor is not working
const Subscription = {
    order:{
        subscribe:(parent, {id}, context, info)=>{
            
            return pubsub.asyncIterator([`restaurant{id}`]);
            
        },

    },
    hello:{
        subscribe:(parent, {id}, context, info)=>{
            console.log("hello")

            // console.log("info", info)
            return pubsub.asyncIterator(['POST_CREATED']);
            
        },

    },
    globalCounter: {
        // subscribe to the randomNumber event
        subscribe: (parent, {id}, { pubsub }, info) => {
            console.log("globalCounter")
            return pubsub.asyncIterator(['randomNumber'])
        }
        
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