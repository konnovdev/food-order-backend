import {restaurants} from "../controllers/restaurants.js"
const Query = {
    queryTest(parent, {}, {}, info){
        console.log("queryTest")
        return "TEST"
    },
    queryRestaurants(parent, {}, { db }, info){
        return restaurants
    }
}

export default Query;