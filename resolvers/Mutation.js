import {pubsub} from "./context.js"
import { orderList, addToOrderList } from "../controllers/order.js"
import {dbMutation, dbQuery} from "../db/connection.js"
import {queryAllItem, queryItemById} from "../db/utility.js"

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
    async createItem(parent, {data}, {}, info){
        console.log("recevied data:", data)
        let itemId = "item"+Math.floor(Math.random()*1000)
        let result = await dbMutation(`INSERT INTO \`Item\` VALUES('${itemId}', '${data.img}', ${data.price} )`)
        //! schema input type is not well defined, so we cannot insert full info into db
        result = await dbMutation(`INSERT INTO \`Item_Trans\` VALUES('${Math.floor(Math.random()*1000)}','zh', '${data.name}' , 'description', 'type', '${itemId}')`)

        return data
    },
    async updateItem(parent, {id, data}, {}, info){
        // console.log("id:", id)
        // console.log("recevied data:", data)
        let currentItem = await queryItemById(id)
        // console.log(currentItem)
        // return currentItem
        try{
            let sql = `UPDATE \`Item\`
            SET \`price\` = '${data.price}', \`img\` = '${data.img}'
            WHERE \`id\`= '${id}'`
            await dbMutation(sql)
        }catch(e){
            console.log("fail update price and img", e)
        }
        try{
            let sql = `UPDATE \`Item_Trans\`
            SET \`name\` = '${data.name}'
            WHERE \`id\`= '${currentItem.id}'`
            await dbMutation(sql)
        }catch(e){
            console.log("fail update name", e)
        }
        return await queryItemById(id)

    },
    async deleteItem(parent, {id}, {}, info){
        let allItem = await queryAllItem()
        let [result] = allItem.filter(e=>e.itemId===id)
        console.log("allItem", allItem)
        await dbMutation(`DELETE FROM \`Item\` WHERE \`id\`='${id}'`)
        return result
    }
}

export default Mutation

// for frontend test gql string
// mutation createOrder{
//     createOrder(order:{id:"orderId", tableNo:"tableNo", items:[{name:"itemName", quantity:4}]})
//   }